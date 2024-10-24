"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea" 
import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { observer, useObservable } from '@legendapp/state/react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const initialState = {
  newActivity: {
    name: '',
    day: 'Monday',
    time: '',
    duration: 30,
    description: '',
    isRecurring: false,
    tags: [] as string[],
  },
  selectedWeek: new Date(),
}

function EnhancedAddNewActivity() {
  const state = useObservable(initialState)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New activity:', state.newActivity.get())
    toast({
      title: "Activity Added",
      description: `${state.newActivity.name.get()} has been added to your schedule for ${format(state.selectedWeek.get(), 'MMMM d, yyyy')}.`,
    })
    state.newActivity.set({
      name: '',
      day: 'Monday',
      time: '',
      duration: 30,
      description: '',
      isRecurring: false,
      tags: [],
    })
  }

  const changeWeek = (direction: 'prev' | 'next') => {
    state.selectedWeek.set(prevWeek => addWeeks(prevWeek, direction === 'next' ? 1 : -1))
  }

  const formatDuration = (minutes: number) => {
    const days = Math.floor(minutes / 1440)
    const hours = Math.floor((minutes % 1440) / 60)
    const remainingMinutes = minutes % 60

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} ${remainingMinutes} min`
    } else if (hours > 0) {
      return `${hours} hr${hours !== 1 ? 's' : ''} ${remainingMinutes} min`
    } else {
      return `${remainingMinutes} min`
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-indigo-700">Activity Planner</CardTitle>
        <CardDescription className="text-lg text-indigo-500">
          Schedule your activities with ease and style
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => changeWeek('prev')}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous Week
            </Button>
            <div className="text-lg font-semibold text-indigo-700">
              {format(startOfWeek(state.selectedWeek.get()), 'MMM d')} - {format(endOfWeek(state.selectedWeek.get()), 'MMM d, yyyy')}
            </div>
            <Button variant="outline" onClick={() => changeWeek('next')}>
              Next Week <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="activity-name" className="text-sm font-medium text-indigo-700">
                Activity Name
              </Label>
              <Input 
                id="activity-name"
                value={state.newActivity.name.get()} 
                onChange={(e) => state.newActivity.name.set(e.target.value)}
                placeholder="Enter activity name"
                className="w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="activity-day" className="text-sm font-medium text-indigo-700">
                  Day
                </Label>
                <Select 
                  value={state.newActivity.day.get()} 
                  onValueChange={(value) => state.newActivity.day.set(value)}
                >
                  <SelectTrigger id="activity-day">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-time" className="text-sm font-medium text-indigo-700">
                  Time
                </Label>
                <div className="relative">
                  <Input 
                    id="activity-time"
                    type="time"
                    value={state.newActivity.time.get()} 
                    onChange={(e) => state.newActivity.time.set(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-indigo-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={16} />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="activity-duration" className="text-sm font-medium text-indigo-700">
                Duration: {formatDuration(state.newActivity.duration.get())}
              </Label>
              <Slider
                id="activity-duration"
                min={5}
                max={10080}
                step={5}
                value={[state.newActivity.duration.get()]}
                onValueChange={(value) => state.newActivity.duration.set(value[0])}
                className="w-full"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="activity-description" className="text-sm font-medium text-indigo-700">
                Description (optional)
              </Label>
              <Textarea 
                id="activity-description"
                value={state.newActivity.description.get()} 
                onChange={(e) => state.newActivity.description.set(e.target.value)}
                placeholder="Add any additional details..."
                className="w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Switch
                id="activity-recurring"
                checked={state.newActivity.isRecurring.get()}
                onCheckedChange={(checked) => state.newActivity.isRecurring.set(checked)}
              />
              <Label htmlFor="activity-recurring" className="text-sm font-medium text-indigo-700">
                Recurring Activity
              </Label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Tag className="mr-2 h-4 w-4" />
                    {state.newActivity.tags.get().length > 0 ? `${state.newActivity.tags.get().length} tags selected` : "Add tags"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none text-indigo-700">Tags</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {['Work', 'Personal', 'Urgent', 'Important', 'Exercise', 'Study'].map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          className={state.newActivity.tags.get().includes(tag) ? 'bg-indigo-100 text-indigo-700' : ''}
                          onClick={() => {
                            const newTags = state.newActivity.tags.get().includes(tag)
                              ? state.newActivity.tags.get().filter(t => t !== tag)
                              : [...state.newActivity.tags.get(), tag]
                            state.newActivity.tags.set(newTags)
                          }}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          </form>
        </motion.div>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" /> Add Activity
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

export default observer(EnhancedAddNewActivity)