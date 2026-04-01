import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb } from "lucide-react"

export interface Skill {
  name: string
  count?: number
}

interface SkillsSectionProps {
  detectedSkills: Skill[]
  additionalSkills: Skill[]
  isLoading?: boolean
}

export function SkillsSection({ detectedSkills, additionalSkills, isLoading }: SkillsSectionProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Detected Skills */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            Skills Detected
          </CardTitle>
          <CardDescription>
            Skills extracted from your resume that match our job database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : detectedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {detectedSkills.map((skill, index) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                >
                  {skill.name}
                  {skill.count && (
                    <span className="ml-1.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold">
                      {skill.count}
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex h-32 flex-col items-center justify-center text-center">
              <Brain className="mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No skills detected yet.</p>
              <p className="text-xs text-muted-foreground">
                Upload a resume to begin analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Skills */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-warning" />
            Additional Skills Detected
          </CardTitle>
          <CardDescription>
            Other skills found in your resume not yet used in job matching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-warning border-t-transparent" />
            </div>
          ) : additionalSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {additionalSkills.map((skill, index) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="bg-secondary/20 text-muted-foreground border border-border/40 hover:bg-secondary/40 transition-all duration-300 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                >
                  {skill.name}
                  {skill.count && (
                    <span className="ml-1.5 rounded-full bg-foreground/5 px-1.5 py-0.5 text-[10px] font-bold">
                      {skill.count}
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex h-32 flex-col items-center justify-center text-center">
              <Lightbulb className="mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No additional skills found.</p>
              <p className="text-xs text-muted-foreground">
                Upload a resume to discover more skills.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
