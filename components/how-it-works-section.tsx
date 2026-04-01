import { Upload, Search, Target, CheckCircle } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume in PDF format to get started with the analysis process.",
  },
  {
    step: "02",
    icon: Search,
    title: "Analyze & Extract",
    description: "Our AI extracts and analyzes skills, experience, and qualifications from your resume.",
  },
  {
    step: "03",
    icon: Target,
    title: "Match Jobs",
    description: "Get matched with job roles based on your skills and see compatibility scores.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "View Recommendations",
    description: "See detailed recommendations, missing skills, and career growth opportunities.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-secondary/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Get started in minutes with our simple four-step process.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-border lg:left-1/2 lg:block lg:-translate-x-1/2" />

            <div className="grid gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative flex flex-col gap-6 lg:flex-row lg:gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 lg:text-right">
                    <div className={`${index % 2 === 1 ? "lg:text-left" : ""}`}>
                      <span className="text-sm font-medium text-primary">Step {step.step}</span>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative flex items-start justify-center lg:flex-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
