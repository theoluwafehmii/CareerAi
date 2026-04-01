import Link from "next/link"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-16 items-center border-b border-border/50 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/careerai-icon.jpeg" width={32} height={32} alt="CareerAI Logo" className="rounded-lg object-cover" />
          <span className="text-lg font-semibold text-foreground">CareerAI</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </main>

      {/* Background elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  )
}
