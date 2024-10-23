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
import { cn } from "@/lib/utils"
import Link from 'next/link'

const gradientColors = {
  purple: "from-purple-600 to-blue-600",
  blue: "from-blue-600 to-cyan-600",
  green: "from-green-600 to-emerald-600",
}

const features = [
  {
    title: "AI-Powered Smart Calendar",
    description: "Experience the future of scheduling with our AI that learns your preferences and optimizes your time automatically.",
    icon: CalendarIcon,
    gradient: gradientColors.purple,
    benefits: [
      "Intelligent time blocking",
      "Automatic schedule optimization",
      "Smart meeting suggestions"
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
    title: "Seamless Task Management",
    description: "Stay in control with our intuitive task management system that adapts to your work style.",
    icon: CheckCircle2,
    gradient: gradientColors.green,
    benefits: [
      "Priority automation",
      "Smart task grouping",
      "Productivity insights"
    ]
  },
]

const testimonials = [
  {
    name: "Sarah M.",
    role: "Product Manager",
    comment: "Increased my productivity by 40% in just two weeks!",
    rating: 5
  },
  {
    name: "James K.",
    role: "Entrepreneur",
    comment: "Finally, a tool that actually understands how I work.",
    rating: 5
  }
]

const FeatureCard = ({ title, description, icon: Icon, gradient, benefits }: typeof features[0]) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full bg-white/10 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm text-gray-300">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-white hover:bg-white/10 group">
          Explore Features 
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const TestimonialCard = ({ name, role, comment, rating }: typeof testimonials[0]) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 p-4 rounded-lg backdrop-blur-lg"
  >
    <div className="flex items-center space-x-1 mb-2">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-300 italic mb-2">&quot;{comment}&quot;</p>
    <p className="text-sm text-gray-400">{name} - {role}</p>
  </motion.div>
)

export default function HeroComponent() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-3xl" />
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
                <Badge variant="secondary" className="px-4 py-2 bg-white/10">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  New: AI-Powered Features Released
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Master Your Time,<br />Amplify Your Success
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Join over 10,000+ professionals who&apos;ve transformed their productivity with our AI-powered time management solution
              </motion.p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-white/10">
                <Users className="w-4 h-4 mr-2" />
                10,000+ Active Users
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-white/10">
                <TrendingUp className="w-4 h-4 mr-2" />
                98% Satisfaction Rate
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-white/10">
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
                href={'/activities'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <p className="text-sm text-gray-400">No credit card required · 14-day free trial · Cancel anytime</p>
            </motion.div>

            {/* Urgency Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Alert className="bg-white/5 border-purple-500/50 mt-8">
                <AlertDescription className="text-gray-300">
                  <span className="font-semibold text-purple-400">Limited Time Offer:</span> Get 3 months free when you sign up for an annual plan. Offer ends soon!
                </AlertDescription>
              </Alert>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}