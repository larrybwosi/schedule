"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isSameDay, parseISO, startOfToday } from 'date-fns'
import { CalendarIcon, Plus, X, Trash2 } from 'lucide-react'
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Event = {
  id: string
  date: string
  title: string
  description?: string
}

const mockEvents: Event[] = [
  { id: '1', date: '2023-06-15', title: 'Team Meeting' },
  { id: '2', date: '2023-06-20', title: 'Project Deadline' },
  { id: '3', date: '2023-06-25', title: 'Client Presentation' },
]

export default function EnhancedCalendarView() {
  const [date, setDate] = useState<Date>(startOfToday())
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ date: format(date, 'yyyy-MM-dd') })
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const today = useMemo(() => startOfToday(), [])

  useEffect(() => {
    setNewEvent(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }))
  }, [date])

  const addEvent = useCallback(() => {
    if (newEvent.title && newEvent.date) {
      setEvents(prevEvents => [...prevEvents, {
        id: Date.now().toString(),
        date: newEvent.date ?? '',
        title: newEvent.title ?? '',
        description: newEvent.description ?? '',
      }])
      setNewEvent({ date: format(date, 'yyyy-MM-dd') })
      setIsAddingEvent(false)
    }
  }, [newEvent, date])

  const removeEvent = useCallback((id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id))
  }, [])

  const clearTodayEvents = useCallback(() => {
    setEvents(prevEvents => 
      prevEvents.filter(event => !isSameDay(parseISO(event.date), today))
    )
  }, [today])

  const eventsForSelectedDate = useMemo(() => 
    events.filter(event => isSameDay(parseISO(event.date), date)),
    [events, date]
  )

  return (
    <Card className={cn(
      "w-full max-w-4xl mx-auto shadow-xl transition-colors duration-300",
      isDarkMode ? "bg-gray-900 text-white" : "bg-white/50 backdrop-blur-sm text-gray-900"
    )}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center justify-between flex-wrap gap-4">
          <span className={isDarkMode ? "text-indigo-300" : "text-indigo-600"}>Calendar View</span>
          <div className="flex items-center gap-4">
            <span className={cn(
              "text-lg font-normal",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Today: {format(today, 'MMMM d, yyyy')}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearTodayEvents}
                    className={cn(
                      "transition-colors",
                      isDarkMode ? "hover:bg-red-900 text-red-300" : "hover:bg-red-100 text-red-500"
                    )}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear today&apos;s events</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle dark mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
        <CardDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          Select a date to view or add events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className={cn(
                "rounded-md border shadow",
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
              )}
            />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span>Events for {format(date, 'MMMM d, yyyy')}</span>
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {eventsForSelectedDate.length} events
              </span>
            </h3>
            <ScrollArea className={cn(
              "h-[250px] rounded-md border p-4",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}>
              <AnimatePresence mode="popLayout">
                {eventsForSelectedDate.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "text-center py-8",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    No events scheduled for this date
                  </motion.div>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md border-b last:border-b-0",
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{event.title}</span>
                        {event.description && (
                          <span className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>{event.description}</span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEvent(event.id)}
                        className={cn(
                          "transition-colors",
                          isDarkMode ? "hover:bg-red-900 hover:text-red-300" : "hover:bg-red-100 hover:text-red-500"
                        )}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </ScrollArea>
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button className={cn(
                  "w-full",
                  isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"
                )}>
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className={cn(
                "sm:max-w-md",
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
              )}>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for {format(date, 'MMMM d, yyyy')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input
                      id="event-title"
                      value={newEvent.title || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                      className={cn(
                        "mt-1",
                        isDarkMode ? "bg-gray-700 text-white" : "bg-white"
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-description">Description (optional)</Label>
                    <Input
                      id="event-description"
                      value={newEvent.description || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Enter event description"
                      className={cn(
                        "mt-1",
                        isDarkMode ? "bg-gray-700 text-white" : "bg-white"
                      )}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingEvent(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addEvent}
                    disabled={!newEvent.title}
                    className={isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"}
                  >
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() => setDate(today)}
          className={isDarkMode ? "text-white" : ""}
        >
          Today
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={isDarkMode ? "text-white" : ""}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, 'MMMM yyyy')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(
            "w-auto p-0",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )} align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              className={isDarkMode ? "bg-gray-800" : ""}
            />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  )
}