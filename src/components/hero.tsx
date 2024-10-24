"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  CheckCircle2, 
  CalendarIcon, 
  ArrowRight, 
  Users, 
  Star,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Link from 'next/link'

const gradientColors = {
  purple: "from-purple-600 to-blue-600",
  blue: "from-blue-600 to-cyan-600",
  green: "from-green-600 to-emerald-600",
}

const features = [
  {
    title: "Smart Calendar Integration",
    description: "Seamlessly sync with your existing calendars and optimize your schedule based on your preferences and productivity patterns.",
    icon: CalendarIcon,
    gradient: gradientColors.purple,
    benefits: [
      "Intelligent time blocking",
      "Cross-platform synchronization",
      "Productivity trend analysis"
    ]
  },
  {
    title: "Goal Achievement System",
    description: "Transform your aspirations into reality with our scientifically-backed goal-setting framework.",
    icon: Target,
    gradient: gradientColors.blue,
    benefits: [
      "Progress visualization",
      "Milestone tracking",
      "Achievement rewards"
    ]
  },
  {
    title: "Collaborative Task Management",
    description: "Stay in control with our intuitive task management system that adapts to your work style and team dynamics.",
    icon: CheckCircle2,
    gradient: gradientColors.green,
    benefits: [
      "Team task delegation",
      "Smart task grouping",
      "Real-time collaboration"
    ]
  },
]

const testimonials = [
  {
    name: "Sarah M.",
    role: "Product Manager",
    comment: "This app has revolutionized how our team collaborates. We're more productive than ever!",
    rating: 5
  },
  {
    name: "James K.",
    role: "Entrepreneur",
    comment: "Finally, a tool that adapts to my chaotic schedule. It's like having a personal assistant.",
    rating: 5
  }
]

const FeatureCard = ({ title, description, icon: Icon, gradient, benefits }: typeof features[0]) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={cn(
        "h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300",
        isDark ? "bg-gray-800/50 backdrop-blur-lg" : "bg-white"
      )}>
        <CardHeader>
          <motion.div
            className={cn(
              "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4",
              gradient
            )}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <CardTitle className={cn(
            "text-xl font-semibold",
            isDark ? "text-white" : "text-gray-800"
          )}>{title}</CardTitle>
          <CardDescription className={isDark ? "text-gray-300" : "text-gray-600"}>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span className={isDark ? "text-gray-300" : "text-gray-600"}>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className={cn(
            "w-full group",
            isDark ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-gray-100"
          )}>
            Explore Features 
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const TestimonialCard = ({ name, role, comment, rating }: typeof testimonials[0]) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 rounded-lg",
        isDark ? "bg-gray-800/50 backdrop-blur-lg" : "bg-white shadow-md"
      )}
    >
      <div className="flex items-center space-x-1 mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className={cn(
        "italic mb-2",
        isDark ? "text-gray-300" : "text-gray-600"
      )}>&quot;{comment}&quot;</p>
      <p className={cn(
        "text-sm",
        isDark ? "text-gray-400" : "text-gray-500"
      )}>{name} - {role}</p>
    </motion.div>
  )
}

export default function HeroComponent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cn(
      "min-h-screen",
      isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    )}>
      <div className="relative overflow-hidden pt-20">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br backdrop-blur-3xl",
          isDark ? "from-purple-600/20 to-blue-600/20" : "from-purple-100 to-blue-100"
        )} />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Hero Section */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <Badge variant="secondary" className={cn(
                  "px-4 py-2",
                  isDark ? "bg-white/10" : "bg-gray-200"
                )}>
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  New: Team Collaboration Features
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Master Your Time,<br />Amplify Your Team&apos;s Success
              </motion.h1>
              
              <motion.p
                className={cn(
                  "text-xl md:text-2xl max-w-3xl mx-auto",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Join over 10,000+ professionals who&apos;ve transformed their productivity and team collaboration with our intelligent time management solution
              </motion.p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Badge variant="secondary" className={cn(
                "px-4 py-2 text-lg",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}>
                <Users className="w-4 h-4 mr-2" />
                10,000+ Active Users
              </Badge>
              <Badge variant="secondary" className={cn(
                "px-4 py-2 text-lg",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}>
                <TrendingUp className="w-4 h-4 mr-2" />
                98% Satisfaction Rate
              </Badge>
              <Badge variant="secondary" className={cn(
                "px-4 py-2 text-lg",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}>
                <Shield className="w-4 h-4 mr-2" />
                Enterprise-Grade Security
              </Badge>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>

            {/* Testimonials */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-12 space-y-6"
            >
              <Link
                href={'/signup'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all  duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <p className={cn(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>No credit card required · 14-day free trial · Cancel anytime</p>
            </motion.div>

            {/* Urgency Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Alert className={cn(
                "border-purple-500/50 mt-8",
                isDark ? "bg-white/5" : "bg-purple-50"
              )}>
                <AlertDescription className={isDark ? "text-gray-300" : "text-gray-700"}>
                  <span className="font-semibold text-purple-600">Limited Time Offer:</span> Get 3 months free when you sign up for an annual plan. Offer ends soon!
                </AlertDescription>
              </Alert>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}