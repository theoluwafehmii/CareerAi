"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { ResumeUpload, type UploadStatus } from "@/components/dashboard/resume-upload"
import { SkillsSection, type Skill } from "@/components/dashboard/skills-section"
import { JobRecommendations, type JobMatch } from "@/components/dashboard/job-recommendations"
import { extractTextFromPDF } from "@/lib/pdf-parser"
import { extractSkills } from "@/lib/skill-extractor"
import { matchJobs } from "@/lib/job-matcher"
import { getHybridJobs } from "@/lib/job-source"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { loadUserProfile, saveAnalysis, UserProfile } from "@/lib/analysis-service"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [detectedSkills, setDetectedSkills] = useState<Skill[]>([])
  const [additionalSkills, setAdditionalSkills] = useState<Skill[]>([])
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  // 1. Auth & Initial Load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        // Load saved analysis from Firestore
        try {
          const userData = await loadUserProfile(currentUser.uid)
          if (userData) {
            setProfile(userData)
            setDetectedSkills(userData.matchedSkills || [])
            setAdditionalSkills(userData.additionalSkills || [])
            setJobMatches(userData.jobMatches || [])
            if (userData.lastResumeFileName) {
              setFileName(userData.lastResumeFileName)
              setUploadStatus("success")
            }
          }
        } catch (error) {
          console.error("Error loading user profile:", error)
        }
      } else {
        // Not logged in, redirect to login page
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setFileName(file.name)
    setUploadStatus("selected")
    setErrorMessage(undefined)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFileName(null)
    setUploadStatus("idle")
    setDetectedSkills([])
    setAdditionalSkills([])
    setJobMatches([])
    setStatusMessage(undefined)
    setErrorMessage(undefined)
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !user) return

    // Reset previous results and set loading states
    setDetectedSkills([])
    setAdditionalSkills([])
    setJobMatches([])
    setUploadStatus("analyzing")
    setIsAnalyzing(true)
    setErrorMessage(undefined)
    setStatusMessage("Initializing parser...")

    try {
      // 1. Parse PDF with progress tracking
      const text = await extractTextFromPDF(selectedFile, (current, total) => {
        setStatusMessage(`Parsing PDF: Page ${current} of ${total}`)
      })

      setStatusMessage("Extracting skills...")

      // 2. Extract skills from text
      const extracted = extractSkills(text)

      setStatusMessage("Matching jobs...")

      // 3. Load hybrid jobs (Local + API)
      const allJobs = await getHybridJobs()

      // 4. Match jobs based on detected skills
      const matches = matchJobs(extracted.matchedSkills, allJobs)

      // 5. Persistence - Save to Firestore
      const analysisData = {
        matchedSkills: extracted.matchedSkills,
        additionalSkills: extracted.additionalSkills,
        jobMatches: matches,
        lastResumeFileName: selectedFile.name
      }

      await saveAnalysis(user.uid, analysisData)

      // 5. Update local state
      setDetectedSkills(extracted.matchedSkills)
      setAdditionalSkills(extracted.additionalSkills)
      setJobMatches(matches)

      setUploadStatus("success")
      if (matches.length > 0) {
        setStatusMessage("Analysis complete. Found relevant job recommendations.")
      } else {
        setStatusMessage("Analysis complete. No high-score job matches found.")
      }
    } catch (error) {
      console.error("Analysis failed:", error)
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Analysis failed")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Show loading state while checking auth
  if (!user && !errorMessage) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  const userName = profile?.fullName || user?.displayName || "User"
  const userEmail = profile?.email || user?.email || ""
  const userCreatedAt = profile?.createdAt
    ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently"

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[150px]" />
      
      <DashboardHeader userName={userName} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Upload your resume to analyze skills and get job recommendations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <ProfileCard
              fullName={userName}
              email={userEmail}
              createdAt={userCreatedAt}
            />

            <ResumeUpload
              fileName={fileName}
              status={uploadStatus}
              onFileSelect={handleFileSelect}
              onRemoveFile={handleRemoveFile}
              onAnalyze={handleAnalyze}
              statusMessage={statusMessage}
              errorMessage={errorMessage}
            />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <SkillsSection
              detectedSkills={detectedSkills}
              additionalSkills={additionalSkills}
              isLoading={isAnalyzing}
            />

            <JobRecommendations jobs={jobMatches} isLoading={isAnalyzing} />
          </div>
        </div>
      </main>
    </div>
  )
}