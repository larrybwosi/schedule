"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  LineChart,
  Zap,
  Users,
  Star,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    title: "AI-Powered Task Prioritization",
    description: "Our advanced AI algorithms analyze your tasks and schedule to suggest the most optimal order of completion, ensuring you're always working on what matters most.",
    icon: Brain,
    color: "text-purple-500"
  },
  {
    title: "Smart Calendar Integration",
    description: "Seamlessly sync with your existing calendars and optimize your schedule based on your productivity patterns and preferences.",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    title: "Goal Achievement System",
    description: "Set both short-term and long-term goals, and let our app break them down into actionable steps, tracking your progress every step of the way.",
    icon: CheckCircle,
    color: "text-green-500"
  },
  {
    title: "Time Tracking & Analytics",
    description: "Gain insights into how you spend your time with detailed analytics and reports, helping you identify areas for improvement and celebrate your productivity wins.",
    icon: Clock,
    color: "text-yellow-500"
  },
  {
    title: "Productivity Insights",
    description: "Receive personalized productivity insights and tips based on your work patterns, helping you continuously improve and achieve more.",
    icon: LineChart,
    color: "text-red-500"
  },
  {
    title: "Collaborative Workspaces",
    description: "Create shared workspaces for teams, delegate tasks, and track progress collectively, enhancing team productivity and communication.",
    icon: Users,
    color: "text-indigo-500"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content: "This app has completely transformed how I manage my projects. I'm now able to take on more clients while maintaining a healthy work-life balance. It's a game-changer!",
    avatar: "https://images.pexels.com/photos/984949/pexels-photo-984949.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    content: "As a founder, I wear many hats. This app helps me stay on top of everything, from product development to investor relations. It's like having a personal assistant that never sleeps!",
    avatar: "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content: "The collaborative features have revolutionized how our marketing team works. We're more aligned, efficient, and our campaigns are performing better than ever. I can't imagine work without it now.",
    avatar: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
]

const FeatureCard = ({ feature }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg",
      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
    )}>
      <CardHeader>
        <feature.icon className={cn("w-10 h-10 mb-3", feature.color)} />
        <CardTitle className={cn(
          "text-xl font-bold",
          isDark ? "text-white" : "text-gray-900"
        )}>
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={cn(
          "text-base",
          isDark ? "text-gray-300" : "text-gray-600"
        )}>
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

const TestimonialCard = ({ testimonial }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg",
      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className={cn(
              "font-semibold",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {testimonial.name}
            </h3>
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              {testimonial.role}
            </p>
          </div>
        </div>
        <p className={cn(
          "italic",
          isDark ? "text-gray-300" : "text-gray-600"
        )}>
          &quot;{testimonial.content}&quot;
        </p>
      </CardContent>
    </Card>
  )
}

export default function FeaturesPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cn(
      "min-h-screen py-12 px-4 sm:px-6 lg:px-8",
      isDark ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className={cn(
            "text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Revolutionize Your Productivity
          </h1>
          <p className={cn(
            "text-xl max-w-3xl mx-auto",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Discover how our cutting-edge features can transform your work-life balance, boost your efficiency, and help you achieve your goals faster than ever before.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            "text-3xl font-bold mb-8",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Why Our Users Love Us
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            "text-3xl font-bold mb-8",
            isDark ? "text-white" : "text-gray-900"
          )}>
            How It Changes Lives
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: "Save 10+ Hours Weekly", description: "Users report saving over 10 hours per week by optimizing their schedules and eliminating time-wasters." },
              { icon: Brain, title: "Reduce Stress by 40%", description: "Our AI-powered prioritization helps users feel more in control, reducing stress levels by up to 40%." },
              { icon: Star, title: "Achieve Goals 2x Faster", description: "With our goal-setting and tracking features, users are achieving their objectives twice as fast." },
              { icon: Users, title: "Improve Team Productivity", description: "Teams using our collaborative features see a 30% boost in overall productivity and project completion rates." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className={cn(
                  "p-6 rounded-lg",
                  isDark ? "bg-gray-800" : "bg-white"
                )}
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className={cn(
                  "text-xl font-semibold mb-2",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className={cn(
            "text-center p-8 rounded-lg mb-16",
            isDark ? "bg-gray-800" : "bg-white"
          )}
        >
          <h2 className={cn(
            "text-3xl font-bold mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Ready to Transform Your Productivity?
          </h2>
          <p className={cn(
            "text-xl mb-8 max-w-2xl mx-auto",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Join thousands of satisfied users who have revolutionized their work and life balance. Start your free trial today and experience the difference yourself!
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Free 14-Day Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className={cn(
            "mt-4 text-sm",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center"
        >
          <h2 className={cn(
            "text-3xl font-bold mb-8",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Trusted by Industry Leaders
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Company A', 'Company B', 'Company C', 'Company D'].map((company) => (
              <div
                key={company}
                className={cn(
                  "flex items-center justify-center w-40 h-20 rounded-lg",
                  isDark ? "bg-gray-800" : "bg-white"
                )}
              >
                <span className={cn(
                  "font-semibold",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  {company}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}