"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, differenceInMinutes, parseISO } from 'date-fns'
import { Clock, ChevronUp, Edit, Save, X } from 'lucide-react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Badge } from "./ui/badge"

// Types
type Activity = {
  id: string
  time: string
  name: string
  duration: number
  notes?: string
  tags?: string[]
}

type State = {
  activities: Activity[]
  currentTime: Date
  dayDescription: string
  editingActivityId: string | null
  editedActivity: Partial<Activity>
}

type Action =
  | { type: 'SET_ACTIVITIES'; payload: Activity[] }
  | { type: 'UPDATE_TIME'; payload: Date }
  | { type: 'SET_DAY_DESCRIPTION'; payload: string }
  | { type: 'START_EDITING'; payload: { id: string; activity: Activity } }
  | { type: 'SAVE_EDITING' }
  | { type: 'UPDATE_EDITED_ACTIVITY'; payload: Partial<Activity> }
  | { type: 'ADD_TAG'; payload: { id: string; tag: string } }
  | { type: 'REMOVE_TAG'; payload: { id: string; tag: string } }
  | { type: 'ADD_NOTE'; payload: { id: string; note: string } }
  | { type: 'POSTPONE_ACTIVITY'; payload: { id: string; reason: string } }

// Initial state
const mockActivities: Activity[] = [
  { id: '1', time: '09:00', name: 'Morning Meeting', duration: 60 },
  { id: '2', time: '11:00', name: 'Project Work', duration: 120 },
  { id: '3', time: '14:00', name: 'Lunch Break', duration: 60 },
  { id: '4', time: '15:00', name: 'Client Call', duration: 45 },
  { id: '5', time: '17:00', name: 'Wrap-up', duration: 30 },
]

const initialState: State = {
  activities: mockActivities,
  currentTime: new Date(),
  dayDescription: '',
  editingActivityId: null,
  editedActivity: {}
}

// Context
const ActivityContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

// Reducer
function activityReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload }
    case 'UPDATE_TIME':
      return { ...state, currentTime: action.payload }
    case 'SET_DAY_DESCRIPTION':
      return { ...state, dayDescription: action.payload }
    case 'START_EDITING':
      return {
        ...state,
        editingActivityId: action.payload.id,
        editedActivity: action.payload.activity
      }
    case 'SAVE_EDITING':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === state.editingActivityId
            ? { ...activity, ...state.editedActivity }
            : activity
        ),
        editingActivityId: null,
        editedActivity: {}
      }
    case 'UPDATE_EDITED_ACTIVITY':
      return { ...state, editedActivity: { ...state.editedActivity, ...action.payload } }
    case 'ADD_TAG':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.id
            ? { ...activity, tags: [...(activity.tags || []), action.payload.tag] }
            : activity
        )
      }
    case 'REMOVE_TAG':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.id
            ? { ...activity, tags: activity.tags?.filter(tag => tag !== action.payload.tag) }
            : activity
        )
      }
    case 'ADD_NOTE':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.id
            ? { ...activity, notes: action.payload.note }
            : activity
        )
      }
    case 'POSTPONE_ACTIVITY':
      // Implementation for postpone functionality
      return state
    default:
      return state
  }
}

// Provider Component
function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    const timer = setInterval(() => 
      dispatch({ type: 'UPDATE_TIME', payload: new Date() }), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  )
}

// Custom hooks
function useActivityState() {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error('useActivityState must be used within an ActivityProvider')
  }
  return context
}

// Utility functions
function getNextActivity(activities: Activity[], currentTime: Date) {
  const now = format(currentTime, 'HH:mm')
  return activities.find(activity => activity.time > now)
}

function getCountdown(activity: Activity, currentTime: Date) {
  const activityTime = parseISO(`${format(currentTime, 'yyyy-MM-dd')}T${activity.time}:00`)
  const diffMinutes = differenceInMinutes(activityTime, currentTime)
  if (diffMinutes < 0) return 'In progress'
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60
  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`
}

// Main Component
export default function EnhancedTodaysActivities() {
  return (
    <ActivityProvider>
      <ActivityContent />
    </ActivityProvider>
  )
}

function ActivityContent() {
  const { state, dispatch } = useActivityState()
  const { activities, currentTime, dayDescription, editingActivityId, editedActivity } = state

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-600">Activities for Today</CardTitle>
        <CardDescription>
          {format(currentTime, 'EEEE, MMMM do, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Add a description for your day..."
          value={dayDescription}
          onChange={(e) => dispatch({ 
            type: 'SET_DAY_DESCRIPTION', 
            payload: e.target.value 
          })}
          className="w-full p-2 border rounded-md"
        />
        <div className="space-y-4">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-lg">{activity.time}</span>
                    {editingActivityId === activity.id ? (
                      <Input
                        value={editedActivity.name || ''}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EDITED_ACTIVITY',
                          payload: { name: e.target.value }
                        })}
                        className="ml-2"
                      />
                    ) : (
                      <span className="font-medium text-gray-800">{activity.name}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">({activity.duration} min)</span>
                    <Badge variant="secondary">{getCountdown(activity, currentTime)}</Badge>
                    {editingActivityId === activity.id ? (
                      <Button 
                        onClick={() => dispatch({ type: 'SAVE_EDITING' })} 
                        size="sm" 
                        variant="outline"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => dispatch({
                          type: 'START_EDITING',
                          payload: { id: activity.id, activity }
                        })} 
                        size="sm" 
                        variant="outline"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activity.tags?.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={() => dispatch({
                          type: 'REMOVE_TAG',
                          payload: { id: activity.id, tag }
                        })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        dispatch({
                          type: 'ADD_TAG',
                          payload: { id: activity.id, tag: e.currentTarget.value }
                        })
                        e.currentTarget.value = ''
                      }
                    }}
                    className="flex-grow"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ChevronUp className="w-4 h-4 mr-1" /> Postpone
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Postpone Activity</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for postponing this activity.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea placeholder="Reason for postponing..." />
                      <DialogFooter>
                        <Button onClick={() => dispatch({
                          type: 'POSTPONE_ACTIVITY',
                          payload: { id: activity.id, reason: '' }
                        })}>
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  placeholder="Add notes..."
                  value={activity.notes || ''}
                  onChange={(e) => dispatch({
                    type: 'ADD_NOTE',
                    payload: { id: activity.id, note: e.target.value }
                  })}
                  className="w-full mt-2 p-2 border rounded-md"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <span className="text-sm text-gray-500">Next activity: </span>
          {(() => {
            const next = getNextActivity(activities, currentTime)
            return next && (
              <span className="font-semibold">
                {next.name} at {next.time}
              </span>
            )
          })()}
        </div>
      </CardFooter>
    </Card>
  )
}