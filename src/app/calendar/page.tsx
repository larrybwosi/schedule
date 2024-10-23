'use client'

import { motion, } from 'framer-motion'
import { useTheme } from 'next-themes' 
import { Clock, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from '@/components/ui/switch'
import EnhancedAddNewActivity from '@/components/activity.add'
import { dailyRoutine, } from '@/lib/schedule'
import WeeklySchedule from '@/components/weekly'

export default function Component() { 
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark" 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Smart Schedule Manager
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Optimize your time, boost your productivity
        </p>
      </motion.div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <Alert className="flex-grow bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pro tip: Use the weekly view to plan ahead and the daily routine to stay on track
          </AlertDescription>
        </Alert>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Switch
                checked={isDarkMode}
                onCheckedChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
                className="data-[state=checked]:bg-purple-600"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {isDarkMode ? 'light' : 'dark'} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-8">
          <TabsTrigger value="weekly" className="text-lg">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Weekly Schedule
          </TabsTrigger>
          <TabsTrigger value="daily" className="text-lg">
            <Clock className="w-4 h-4 mr-2" />
            Daily Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <div className="grid md:grid-cols-2 gap-8">
            <WeeklySchedule/>
            <EnhancedAddNewActivity/>
          </div>
        </TabsContent>
        <TabsContent value="daily">
          <Card className="shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 dark:text-purple-300">Daily Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dailyRoutine.map((item) => (
                  <motion.div 
                    key={item.time} 
                    className="flex items-center space-x-2 rounded-lg p-3 shadow-md bg-white dark:bg-gray-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                    <div>
                      <span className="font-semibold text-purple-600 dark:text-purple-300">{item.time}</span>
                      <p className="text-gray-700 dark:text-gray-300">{item.activity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}