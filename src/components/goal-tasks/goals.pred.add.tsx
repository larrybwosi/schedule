"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { predefinedGoals } from '@/data/goals'
import {
  Plus,
  Trophy,
  Info
} from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

type Goal = {
  title: string
  description: string
  category: 'Health' | 'Education' | 'Finance' | 'Personal'
  icon: React.ElementType
  timeframe: string
}

const categoryColors: Record<Goal['category'], string> = {
  Health: 'bg-red-500 dark:bg-red-600',
  Education: 'bg-green-500 dark:bg-green-600',
  Finance: 'bg-yellow-500 dark:bg-yellow-600',
  Personal: 'bg-purple-500 dark:bg-purple-600'
}

interface GoalPredSelectorProps {
  setIsAddingGoal: (value: boolean) => void
  selectedPredefinedGoals: string[]
  handlePredefinedGoalToggle: (title: string) => void
  addSelectedPredefinedGoals: () => void
}

export default function GoalPredSelector({ 
  setIsAddingGoal, 
  selectedPredefinedGoals, 
  handlePredefinedGoalToggle, 
  addSelectedPredefinedGoals 
}: GoalPredSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const categories = Array.from(new Set(predefinedGoals.map(goal => goal.category)))

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-6 space-y-6"
    >
      
      <motion.div variants={itemVariants}>
        <Button 
          onClick={() => setIsAddingGoal(true)} 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Custom Goal
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/50 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            The following are curated goal suggestions that have proven beneficial for many users. While optional, these goals are designed to enhance your performance and personal growth. Feel free to select those that align with your aspirations or create custom goals tailored to your unique objectives.
          </AlertDescription>
        </Alert>
      </motion.div>


      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <Trophy className="w-5 h-5 mr-2 text-blue-500" />
            Quick Add Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {categories.map(category => (
              <motion.div 
                key={category}
                variants={itemVariants}
                className="mb-6 last:mb-0"
              >
                <h4 className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  <div className={`w-2 h-2 rounded-full ${categoryColors[category]} mr-2`} />
                  {category} Goals
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {predefinedGoals
                    .filter(goal => goal.category === category)
                    .map((goal) => (
                      <motion.div
                        key={goal.title}
                        variants={itemVariants}
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 shadow-sm hover:shadow-md">
                          <Checkbox
                            id={`goal-${goal.title}`}
                            checked={selectedPredefinedGoals.includes(goal.title)}
                            onCheckedChange={() => handlePredefinedGoalToggle(goal.title)}
                            className="mt-1 border-2"
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={`goal-${goal.title}`} 
                              className="flex items-center cursor-pointer"
                            >
                              {React.createElement(goal.icon, { className: `w-4 h-4 mr-2 text-${categoryColors[goal.category].split('-')[1]}-500` })}
                              <span className="font-medium">{goal.title}</span>
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {goal.description} • {goal.timeframe}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </ScrollArea>
          
          <motion.div 
            variants={itemVariants} 
            className="mt-6 sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 z-10"
          >
            <Button 
              onClick={addSelectedPredefinedGoals} 
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:animate-none"
            >
              Add Selected Goals
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}