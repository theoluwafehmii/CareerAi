"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUp, FileText, X, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export type UploadStatus = "idle" | "selected" | "loading" | "analyzing" | "success" | "error"

interface ResumeUploadProps {
  fileName: string | null
  status: UploadStatus
  onFileSelect: (file: File) => void
  onRemoveFile: () => void
  onAnalyze: () => void
  errorMessage?: string
  statusMessage?: string
}

export function ResumeUpload({
  fileName,
  status,
  onFileSelect,
  onRemoveFile,
  onAnalyze,
  errorMessage,
  statusMessage,
}: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type === "application/pdf") {
      onFileSelect(file)
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "idle":
        return "No file selected"
      case "selected":
        return "Resume loaded successfully"
      case "loading":
        return "Loading file..."
      case "analyzing":
        return statusMessage || "Analyzing resume..."
      case "success":
        return "Analysis complete"
      case "error":
        return errorMessage || "Error reading file"
      default:
        return ""
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
      case "analyzing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileUp className="h-5 w-5 text-primary" />
          Resume Upload
        </CardTitle>
        <CardDescription>
          Upload your resume in PDF format to extract skills and get job recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drag and Drop Area */}
        <div
          className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 bg-secondary/30 p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <FileUp className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop your PDF here, or{" "}
            <span className="font-medium text-primary">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">PDF files only, max 10MB</p>
        </div>

        {/* Selected File */}
        {fileName && (
          <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{fileName}</p>
                <p className="text-xs text-muted-foreground">PDF Document</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onRemoveFile()
              }}
              disabled={status === "loading" || status === "analyzing"}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Status Message */}
        <div className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          <span
            className={
              status === "error"
                ? "text-destructive"
                : status === "success"
                  ? "text-success"
                  : "text-muted-foreground"
            }
          >
            {getStatusMessage()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onAnalyze}
            disabled={!fileName || status === "loading" || status === "analyzing"}
            className="flex-1"
          >
            {status === "analyzing" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
