"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function EnhancedAddNewActivity() {
  const [newActivity, setNewActivity] = useState({
    name: '',
    day: 'Monday',
    time: '',
    duration: 30,
    description: '',
    isRecurring: false,
    tags: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically add the new activity to your state or send it to an API
    console.log('New activity:', newActivity)
    toast({
      title: "Activity Added",
      description: `${newActivity.name} has been added to your schedule.`,
    })
    // Reset form
    setNewActivity({
      name: '',
      day: 'Monday',
      time: '',
      duration: 30,
      description: '',
      isRecurring: false,
      tags: [],
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-purple-700">Add New Activity</CardTitle>
        <CardDescription>
          Fill in the details below to add a new activity to your schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="activity-name" className="text-sm font-medium text-gray-700">
              Activity Name
            </Label>
            <Input 
              id="activity-name"
              value={newActivity.name} 
              onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
              placeholder="Enter activity name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity-day" className="text-sm font-medium text-gray-700">
                Day
              </Label>
              <Select 
                id="activity-day"
                value={newActivity.day} 
                onValueChange={(value) => setNewActivity({...newActivity, day: value})}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity-time" className="text-sm font-medium text-gray-700">
                Time
              </Label>
              <div className="relative">
                <Input 
                  id="activity-time"
                  type="time"
                  value={newActivity.time} 
                  onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-duration" className="text-sm font-medium text-gray-700">
              Duration: {newActivity.duration} minutes
            </Label>
            <Slider
              id="activity-duration"
              min={5}
              max={240}
              step={5}
              value={[newActivity.duration]}
              onValueChange={(value) => setNewActivity({...newActivity, duration: value[0]})}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-description" className="text-sm font-medium text-gray-700">
              Description (optional)
            </Label>
            <Textarea 
              id="activity-description"
              value={newActivity.description} 
              onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
              placeholder="Add any additional details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="activity-recurring"
              checked={newActivity.isRecurring}
              onCheckedChange={(checked) => setNewActivity({...newActivity, isRecurring: checked})}
            />
            <Label htmlFor="activity-recurring" className="text-sm font-medium text-gray-700">
              Recurring Activity
            </Label>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                {newActivity.tags.length > 0 ? `${newActivity.tags.length} tags selected` : "Add tags"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">Tags</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Work', 'Personal', 'Urgent', 'Important', 'Exercise', 'Study'].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className={newActivity.tags.includes(tag) ? 'bg-purple-100' : ''}
                      onClick={() => {
                        const newTags = newActivity.tags.includes(tag)
                          ? newActivity.tags.filter(t => t !== tag)
                          : [...newActivity.tags, tag]
                        setNewActivity({...newActivity, tags: newTags})
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </form>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" /> Add Activity
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}