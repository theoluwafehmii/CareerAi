import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Briefcase, CheckCircle, XCircle, BookOpen, Video, FileText } from "lucide-react"

export interface JobMatch {
  id: string
  title: string
  description: string
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
  source?: "local" | "api"
  learningRecommendations?: { title: string; link: string; type: "course" | "video" | "documentation" }[]
}

interface JobRecommendationsProps {
  jobs: JobMatch[]
  isLoading?: boolean
}

export function JobRecommendations({ jobs, isLoading }: JobRecommendationsProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Briefcase className="h-5 w-5 text-primary" />
          Top Recommended Roles
        </CardTitle>
        <CardDescription>
          Best career paths based on your current skill profile and market requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-secondary"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={175.9}
                          strokeDashoffset={175.9 - (175.9 * job.matchScore) / 100}
                          strokeLinecap="round"
                          className="text-primary transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-sm font-bold text-foreground">{job.matchScore}%</span>
                        <span className="text-[8px] uppercase tracking-tighter text-muted-foreground font-medium">Match</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 sm:flex rounded-full px-5">
                      View Opportunity
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {/* Matched Skills */}
                  <div>
                    <div className="mb-2 flex items-center gap-1 text-xs font-medium text-success">
                      <CheckCircle className="h-3 w-3" />
                      Matched Skills
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-success/10 text-xs text-success hover:bg-success/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <div className="mb-2 flex items-center gap-1 text-xs font-medium text-destructive">
                      <XCircle className="h-3 w-3" />
                      Missing Skills
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.length > 0 ? (
                        job.missingSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-destructive/10 text-xs text-destructive hover:bg-destructive/20"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">None - Perfect match!</span>
                      )}
                    </div>

                    {/* Learning Recommendations */}
                    {job.learningRecommendations && job.learningRecommendations.length > 0 && (
                      <div className="mt-4">
                        <div className="mb-2 flex items-center gap-1 text-xs font-medium text-primary">
                          <BookOpen className="h-3 w-3" />
                          Recommended Learning
                        </div>
                        <div className="flex flex-col gap-2 relative z-10">
                          {job.learningRecommendations.map((rec, i) => (
                            <a
                              key={i}
                              href={rec.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs flex items-center gap-2 rounded-md border border-primary/20 bg-background/50 p-2 hover:bg-primary/10 hover:border-primary/40 transition-colors group"
                            >
                              {rec.type === 'video' ? <Video className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" /> :
                               rec.type === 'course' ? <BookOpen className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" /> :
                               <FileText className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />}
                              <span className="font-medium group-hover:text-foreground text-muted-foreground flex-1 truncate">{rec.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <Briefcase className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground font-medium">No job recommendations available yet.</p>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              Upload and analyze a resume to see top recommended career paths.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
