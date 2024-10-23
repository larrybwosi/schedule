'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useTheme } from 'next-themes'
import { format, addMinutes } from "date-fns"
import { Clock, X, Edit, Save, ChevronUp, Plus, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { dailyRoutine, initialSchedule } from '@/lib/schedule'
import { cn } from '@/lib/utils'


type Activity = {
  id: string
  day: string
  time: string
  duration: number
  name: string
  isFixed: boolean
  description?: string
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


export default function Page (){
  const [schedule, setSchedule] = useState<Activity[]>(initialSchedule)
  const [editingActivity, setEditingActivity] = useState<string | null>(null)
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({ day: 'Monday', time: '', duration: 30, name: '' })
  const controls = useAnimation()
  const { theme, setTheme:setIsDarkMode } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const removeActivity = (id: string) => {
    setSchedule(schedule.filter(activity => activity.id !== id))
  }

  const startEditActivity = (id: string) => {
    setEditingActivity(id)
  }

  const saveEditActivity = (id: string, updatedActivity: Partial<Activity>) => {
    setSchedule(schedule.map(activity => 
      activity.id === id ? { ...activity, ...updatedActivity } : activity
    ))
    setEditingActivity(null)
  }

  const postponeActivity = (id: string) => {
    setSchedule(schedule.map(activity => {
      if (activity.id === id) {
        const [hours, minutes] = activity.time.split(':').map(Number)
        const newTime = addMinutes(new Date(0, 0, 0, hours, minutes), 30)
        return { ...activity, time: format(newTime, 'HH:mm') }
      }
      return activity
    }))
  }

  const addActivity = () => {
    if (newActivity.name && newActivity.time && newActivity.day) {
      const newId = (Math.max(...schedule.map(a => parseInt(a.id))) + 1).toString()
      setSchedule([...schedule, { ...newActivity as Activity, id: newId, isFixed: false }])
      setNewActivity({ day: 'Monday', time: '', duration: 30, name: '' }) 
    }
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Your Schedule Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your time effectively with our intuitive interface
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle dark mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Alert className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pro tip: Use the weekly view to plan ahead and the daily routine to stay on track
          </AlertDescription>
        </Alert>

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
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={cn(
              "md:col-span-2 shadow-lg",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  "text-2xl",
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                )}>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {days.map((day) => (
                    <AccordionItem value={day} key={day}>
                      <AccordionTrigger className={cn(
                        "text-lg font-semibold",
                        isDarkMode ? "text-purple-300" : "text-purple-600"
                      )}>
                        {day}
                      </AccordionTrigger>
                      <AccordionContent>
                        <AnimatePresence>
                          {schedule
                            .filter(activity => activity.day === day)
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((activity) => (
                              <motion.div 
                                key={activity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                  "flex items-center justify-between mb-2 p-2 rounded-md shadow-sm",
                                  isDarkMode ? "bg-gray-700" : "bg-white"
                                )}
                              >
                                <div className="flex items-center space-x-2">
                                  <Clock className={cn(
                                    "w-4 h-4",
                                    isDarkMode ? "text-purple-300" : "text-purple-500"
                                  )} />
                                  <span>{activity.time}</span>
                                  <span className="font-medium">{activity.name}</span>
                                  <span className={cn(
                                    "text-sm",
                                    isDarkMode ? "text-gray-400" : "text-gray-500"
                                  )}>({activity.duration} min)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {!activity.isFixed && (
                                    <>
                                      {editingActivity === activity.id ? (
                                        <Button onClick={() => saveEditActivity(activity.id, { name: activity.name, time: activity.time, duration: activity.duration })} size="sm" variant="outline">
                                          <Save className="w-4 h-4 mr-1" /> Save
                                        </Button>
                                      ) : (
                                        <Button onClick={() => startEditActivity(activity.id)} size="sm" variant="outline">
                                          <Edit className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                      )}
                                      <Button 
                                        onClick={() => removeActivity(activity.id)}
                                        size="sm"
                                        variant="outline"
                                        className={isDarkMode ? "hover:bg-red-900 hover:text-red-100" : "hover:bg-red-100 hover:text-red-600"}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    onClick={() => postponeActivity(activity.id)}
                                    size="sm"
                                    variant="outline"
                                    className={isDarkMode ? "hover:bg-purple-900 hover:text-purple-100" : "hover:bg-purple-100 hover:text-purple-600"}
                                  >
                                    <ChevronUp className="w-4 h-4 mr-1" /> Postpone
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className={cn(
              "shadow-lg",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  "text-2xl",
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                )}>Add New Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); addActivity(); }} className="space-y-4">
                  <div>
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input 
                      id="activity-name"
                      value={newActivity.name} 
                      onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                      placeholder="Enter activity name"
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-day">Day</Label>
                    <Select 
                      id="activity-day"
                      value={newActivity.day} 
                      onValueChange={(value) => setNewActivity({...newActivity, day: value})}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    >
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity-time">Time</Label>
                    <Input 
                      id="activity-time"
                      type="time"
                      value={newActivity.time} 
                      onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-duration">Duration (minutes)</Label>
                    <Input 
                      id="activity-duration"
                      type="number"
                      value={newActivity.duration} 
                      onChange={(e) => setNewActivity({...newActivity, duration: parseInt(e.target.value)})}
                      min="1"
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Activity
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="daily">
          <Card className={cn(
            "shadow-lg",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-2xl",
                isDarkMode ? "text-purple-300" : "text-purple-600"
              )}>Daily Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dailyRoutine.map((item) => (
                  <motion.div 
                    key={item.time} 
                    className={cn(
                      "flex items-center space-x-2 rounded-lg p-3 shadow-md",
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    )}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <item.icon className={cn(
                      "w-5 h-5",
                      isDarkMode ? "text-purple-300" : "text-purple-500"
                    )} />
                    <div>
                      <span className={cn(
                        "font-semibold",
                        isDarkMode ? "text-purple-300" : "text-purple-600"
                      )}>{item.time}</span>
                      <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{item.activity}</p>
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