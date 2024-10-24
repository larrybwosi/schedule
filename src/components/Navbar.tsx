'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Menu, Sun, Moon } from 'lucide-react'
import { Button } from "./ui/button"

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isDark ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
    )}>
      {children}
    </Link>
  )
}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll handler to hide/show navbar on scroll down/up
  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        setIsNavbarVisible(false)
      } else {
        // Scrolling up
        setIsNavbarVisible(true)
      }
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [lastScrollY])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 px-6 flex justify-between items-center transition-transform duration-300",
      isNavbarVisible ? "translate-y-0" : "-translate-y-full",
      isDark ? "bg-gray-900/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md"
    )}>
      <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        TimeWise
      </Link>
      <div className="hidden md:flex space-x-4">
        <NavLink href="/features">Features</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/goal-tasks">Dashboard</NavLink>
      </div>
      <div className="hidden md:flex space-x-2">
        <Button variant="ghost" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost">Sign In</Button>
        <Button>Sign Up</Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className={isDark ? "bg-gray-900" : "bg-white"}>
          <div className="flex flex-col space-y-4 mt-8">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
             <NavLink href="/goal-tasks">Dashboard</NavLink>
            <Button variant="ghost" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              {isDark ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
export default Navbar
