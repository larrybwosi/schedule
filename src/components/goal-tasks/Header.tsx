"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, Moon, Sun, Zap } from 'lucide-react'

export default function HeroSection() {
  const { theme, setTheme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.header
      className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-16 sm:py-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left" variants={itemVariants}>
            <motion.h1 variants={itemVariants}>
              <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-base lg:text-sm xl:text-base">
                Introducing
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900 dark:text-white">Task & Goal</span>
                <span className="block text-purple-600 dark:text-purple-400">Tracker</span>
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Boost your productivity and achieve your dreams with our intuitive Task & Goal Tracker. Set targets, break them down into manageable tasks, and watch your progress soar.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <Zap className="ml-2 -mr-1 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6" variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden shadow-xl">
              <div className="px-4 py-8 sm:px-10">
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900 dark:text-white">Set SMART goals</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900 dark:text-white">Track daily tasks</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900 dark:text-white">Monitor your progress</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900 dark:text-white">Achieve your dreams</span>
                  </motion.div>
                </div>
              </div>
              <motion.div variants={itemVariants} className="px-4 py-6 bg-gray-50 dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 sm:px-10">
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">Start your journey to success today.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="absolute top-4 right-4 sm:top-8 sm:right-8"
        variants={itemVariants}
      >
        <Select
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-2" />
                Light
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center">
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </div>
            </SelectItem>
            <SelectItem value="system">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                System
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </motion.header>
  )
}