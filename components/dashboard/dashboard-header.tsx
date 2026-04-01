"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Image from "next/image"

import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface DashboardHeaderProps {
  userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 group transition-all hover:scale-105">
          <Image 
            src="/careerai-icon.jpeg" 
            width={36} 
            height={36} 
            alt="CareerAI Logo" 
            className="rounded-xl object-cover shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40 group-hover:rotate-12" 
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 tracking-tight">
            Career<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-3 sm:flex px-3 py-1.5 rounded-full border border-border/40 bg-secondary/20 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-semibold text-foreground">{userName}</span>
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-full px-4"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
