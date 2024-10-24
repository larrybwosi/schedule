'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Info
} from 'lucide-react'
import { predefinedTasks } from '@/data/tasks'

type TaskSelectorProps = {
  setIsAddingTask: (value: boolean) => void
  selectedPredefinedTasks: string[]
  handlePredefinedTaskToggle: (title: string) => void
  addSelectedPredefinedTasks: () => void
}

const TaskSelector: React.FC<TaskSelectorProps> = ({
  setIsAddingTask,
  selectedPredefinedTasks,
  handlePredefinedTaskToggle,
  addSelectedPredefinedTasks
}) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

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

  const categories = Array.from(new Set(predefinedTasks.map(task => task.category)))

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-6 space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Button 
          onClick={() => setIsAddingTask(true)} 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="mr-2 h-5 w-5" /> Create Custom Task
        </Button>
      </motion.div>
      
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Quick Add Tasks
          </CardTitle>
        </CardHeader>

        <motion.div variants={itemVariants}>
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/50 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Below are optional, pre-defined tasks that many users have found to significantly boost productivity and streamline their daily routines. These tasks are designed to help you stay on track with common goals like maintaining good health, staying organized, and prioritizing personal growth. Select any that resonate with your goals, whether it&apos;s staying hydrated, staying active, or managing your workload more efficiently. You can also create your own custom tasks to further personalize your experience and make your productivity routine even more effective.
            </AlertDescription>
          </Alert>
        </motion.div>

        <CardContent>
          {categories.map(category => (
            <motion.div 
              key={category}
              variants={itemVariants}
              className="mb-6 last:mb-0"
            >
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 capitalize mb-3">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {predefinedTasks
                  .filter(task => task.category === category)
                  .map((task) => (
                    <motion.div
                      key={task.title}
                      variants={itemVariants}
                      className="relative group"
                      onMouseEnter={() => setHoveredTask(task.title)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 shadow-sm hover:shadow-md relative z-10">
                        <Checkbox
                          id={`task-${task.title}`}
                          checked={selectedPredefinedTasks.includes(task.title)}
                          onCheckedChange={() => handlePredefinedTaskToggle(task.title)}
                          className="border-2"
                        />
                        <Label 
                          htmlFor={`task-${task.title}`} 
                          className="flex items-center cursor-pointer flex-1"
                        >
                          <task.icon className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm font-medium">{task.title}</span>
                        </Label>
                      </div>
                      {hoveredTask === task.title && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 rounded-lg"
                        />
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
          
          <motion.div variants={itemVariants} className="mt-6">
            <Button 
              onClick={addSelectedPredefinedTasks} 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Selected Tasks
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TaskSelector
