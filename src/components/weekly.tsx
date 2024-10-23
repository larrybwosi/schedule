'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, X, Edit, Save, ChevronUp, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Activity = {
  id: string
  day: string
  time: string
  duration: number
  name: string
  isFixed: boolean
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const initialSchedule: Activity[] = [
  { id: '1', day: 'Monday', time: '09:00', duration: 60, name: 'Team Meeting', isFixed: true },
  { id: '2', day: 'Wednesday', time: '14:00', duration: 90, name: 'Project Work', isFixed: false },
  { id: '3', day: 'Friday', time: '11:00', duration: 45, name: 'Client Call', isFixed: true },
]

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState<Activity[]>(initialSchedule)
  const [editingActivity, setEditingActivity] = useState<string | null>(null)
  const [postponeDialogOpen, setPostponeDialogOpen] = useState(false)
  const [activityToPostpone, setActivityToPostpone] = useState<Activity | null>(null)
  const [newPostponeTime, setNewPostponeTime] = useState('')

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

  const openPostponeDialog = (activity: Activity) => {
    setActivityToPostpone(activity)
    setNewPostponeTime(activity.time)
    setPostponeDialogOpen(true)
  }

  const handlePostpone = () => {
    if (activityToPostpone && newPostponeTime) {
      const updatedSchedule = schedule.map(activity => 
        activity.id === activityToPostpone.id ? { ...activity, time: newPostponeTime } : activity
      )
      setSchedule(updatedSchedule)
      setPostponeDialogOpen(false)
      setActivityToPostpone(null)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
        <CardTitle className="text-3xl font-bold">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Alert className="mb-6 bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-300" />
          <AlertDescription className="text-blue-700 dark:text-blue-200">
            Pro tip: Click on a day to expand and view your activities. Use the buttons to manage your schedule efficiently.
          </AlertDescription>
        </Alert>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {days.map((day) => (
            <AccordionItem value={day} key={day} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="text-lg font-semibold bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 px-4 py-2 hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">
                {day}
              </AccordionTrigger>
              <AccordionContent className="bg-white dark:bg-gray-800 p-4">
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
                        className="flex items-center justify-between mb-4 p-3 rounded-md shadow-md bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-blue-900"
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                          <span className="font-medium text-purple-700 dark:text-purple-200">{activity.time}</span>
                          <span className="font-bold text-gray-800 dark:text-gray-200">{activity.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">({activity.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!activity.isFixed && (
                            <>
                              {editingActivity === activity.id ? (
                                <Button onClick={() => saveEditActivity(activity.id, { name: activity.name, time: activity.time, duration: activity.duration })} size="sm" variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700">
                                  <Save className="w-4 h-4 mr-1" /> Save
                                </Button>
                              ) : (
                                <Button onClick={() => startEditActivity(activity.id)} size="sm" variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700">
                                  <Edit className="w-4 h-4 mr-1" /> Edit
                                </Button>
                              )}
                              <Button 
                                onClick={() => removeActivity(activity.id)}
                                size="sm"
                                variant="outline"
                                className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button 
                            onClick={() => openPostponeDialog(activity)}
                            size="sm"
                            variant="outline"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200 dark:hover:bg-purple-700"
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

      <Dialog open={postponeDialogOpen} onOpenChange={setPostponeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-600 dark:text-purple-300">Postpone Activity</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Activity
              </Label>
              <Input id="name" value={activityToPostpone?.name} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTime" className="text-right">
                New Time
              </Label>
              <Input
                id="newTime"
                type="time"
                value={newPostponeTime}
                onChange={(e) => setNewPostponeTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setPostponeDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handlePostpone} className="bg-purple-600 text-white hover:bg-purple-700">Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}