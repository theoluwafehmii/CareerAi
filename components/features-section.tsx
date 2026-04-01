import { FileUp, Brain, Briefcase, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileUp,
    title: "Resume Upload",
    description:
      "Upload your resume in PDF format. Our system securely processes your document to extract relevant information.",
  },
  {
    icon: Brain,
    title: "Skill Detection",
    description:
      "Advanced AI analyzes your resume to identify technical skills, soft skills, and expertise levels automatically.",
  },
  {
    icon: Briefcase,
    title: "Job Recommendations",
    description:
      "Get personalized job role suggestions based on your detected skills and experience profile.",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description:
      "Discover missing skills for your target roles and get actionable insights to advance your career.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need for Career Growth
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Our AI-powered platform provides comprehensive tools to analyze your skills and match you with the perfect career opportunities.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
