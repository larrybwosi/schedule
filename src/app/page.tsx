"use client"

import { useTheme } from 'next-themes'
import HeroComponent from '@/components/hero'

export default function EnhancedProfessionalTimetable() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <HeroComponent />

    </div>
  )
}