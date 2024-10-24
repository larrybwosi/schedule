"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { X, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast'
import TaskSelector from '@/components/goal-tasks/task.selector'
import GoalSelector from '@/components/goal-tasks/goal.selector'
import GoalPredSelector from '@/components/goal-tasks/goals.pred.add'
import HeroSection from '@/components/goal-tasks/Header'
import { observer, useObservable } from '@legendapp/state/react'
// import { Goal as GoalDB } from '@prisma/client'

type Task = {
  id: string
  title: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'To Do' | 'In Progress' | 'Completed'
  timeframe: 'Daily' | 'Weekly'
  dueDate: Date
  estimatedTime: number
  tags: string[]
}

type Goal = {
  id: string
  title: string
  category: 'Health' | 'Work' | 'Personal' | 'Education' | 'Finance' | 'Social'
  status: 'Not Started' | 'In Progress' | 'Achieved'
  description: string
}

const priorityColors = {
  Low: 'bg-emerald-500',
  Medium: 'bg-amber-500',
  High: 'bg-rose-500'
}

const categoryColors = {
  Health: 'bg-green-500',
  Work: 'bg-blue-500',
  Personal: 'bg-purple-500',
  Education: 'bg-yellow-500',
  Finance: 'bg-cyan-500',
  Social: 'bg-pink-500'
}


const initialState = {
  tasks: [] as Task[],
  goals: [] as Goal[],
  newTask: {
    title: '',
    priority: 'Medium' as Task['priority'],
    status: 'To Do' as Task['status'],
    timeframe: 'Daily' as Task['timeframe'],
    dueDate: new Date(),
    estimatedTime: 30,
    tags: [] as string[]
  },
  newGoal: {
    title: '',
    description: '',
    category: 'Personal' as Goal['category'],
    status: 'Not Started' as Goal['status']
  },
  isAddingTask: false,
  isAddingGoal: false,
  selectedPredefinedTasks: [] as string[],
  selectedPredefinedGoals: [] as string[],
  loading: false,
  error: null as string | null
}

function EnhancedTaskGoalManager() {
  const { toast } = useToast()
  const state = useObservable(initialState)

  const handleAddTask = () => {
    if (state.newTask.title.get()) {
      const task: Task = {
        id: Date.now().toString(),
        title: state.newTask.title.get(),
        priority: state.newTask.priority.get(),
        status: state.newTask.status.get(),
        timeframe: state.newTask.timeframe.get(),
        dueDate: state.newTask.dueDate.get(),
        estimatedTime: state.newTask.estimatedTime.get(),
        tags: state.newTask.tags.get()
      }
      state.tasks.push(task)
      state.newTask.set({
        title: '',
        priority: 'Medium',
        status: 'To Do',
        timeframe: 'Daily',
        dueDate: new Date(),
        estimatedTime: 30,
        tags: []
      })
      state.isAddingTask.set(false)
      toast({
        title: "Task Added",
        description: `${task.title} has been added to your tasks.`,
      })
    }
  }

  const handleAddGoal = () => {
    if (state.newGoal.title.get()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: state.newGoal.title.get(),
        category: state.newGoal.category.get(),
        status: state.newGoal.status.get(),
        description: state.newGoal.description.get()
      }
      state.goals.push(goal)
      state.newGoal.set({
        title: '',
        description: '',
        category: 'Personal',
        status: 'Not Started'
      })
      state.isAddingGoal.set(false)
      toast({
        title: "Goal Added",
        description: `${goal.title} has been added to your goals.`,
      })
    }
  }

  const handleRemoveTask = (id: string) => {
    state.tasks.set(state.tasks.get().filter(task => task.id !== id))
  }

  const handleRemoveGoal = async (id: string) => {
    try {
      // await goalService.deleteGoal(id)
      state.goals.set(state.goals.get().filter(goal => goal.id !== id))
      toast({
        title: "Goal Removed",
        description: "Goal has been successfully removed.",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to remove goal. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handlePredefinedTaskToggle = (title: string) => {
    state.selectedPredefinedTasks.set(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    )
  }

  const handlePredefinedGoalToggle = (title: string) => {
    state.selectedPredefinedGoals.set(prev => 
      prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]
    )
    addSelectedPredefinedTasks()
  }

  const addSelectedPredefinedTasks = () => {
    const newTasks = state.selectedPredefinedTasks.get().map(title => ({
      id: Date.now().toString() + Math.random(),
      title,
      priority: 'Medium' as const,
      status: 'To Do' as const,
      timeframe: 'Daily' as const,
      dueDate: new Date(),
      estimatedTime: 30,
      tags: []
    }))
    state.tasks.set([...state.tasks.get(), ...newTasks])
    state.selectedPredefinedTasks.set([])
  }

  const addSelectedPredefinedGoals = async () => {
    const predefinedGoalsToAdd = state.selectedPredefinedGoals.get().map(title => ({
      id:Date.now().toString() + Math.random(),
      title,
      description: '',
      category: 'Personal' as Goal['category'],
      status: 'Not Started' as Goal['status']
    }))

    state.loading.set(true)
    try {
      state.goals.set([...state.goals.get(), ...predefinedGoalsToAdd])
      state.selectedPredefinedGoals.set([])
      
      toast({
        title: "Goals Added",
        description: `${predefinedGoalsToAdd.length} goals have been added.`,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to add predefined goals. Please try again.",
        variant: "destructive"
      })
    } finally {
      state.loading.set(false)
    }
  }

  return (
    <div className="min-h-screen p-2 sm:p-2 md:p-8 transition-colors duration-300 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <HeroSection/>

        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks" className="text-lg">Tasks</TabsTrigger>
            <TabsTrigger value="goals" className="text-lg">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Tasks</CardTitle>
                <CardDescription>Manage your daily and weekly tasks here. Add new tasks, set priorities, and track your progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] rounded-md border p-2">
                    {state.tasks.get().length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full space-y-4 text-center text-gray-600 dark:text-gray-300"
                      >
                        <h3 className="text-lg font-semibold">
                          You have no tasks yet.
                        </h3>
                        <p className="text-sm">
                          Get started by creating a custom task or selecting one from the Quick Add options below.
                        </p>
                        <Button 
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        >
                          Create Custom Task
                        </Button>
                      </motion.div>
                    ) : (
                      <AnimatePresence>
                        {state.tasks.get().map((task) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between p-2 mb-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`} />
                              <span className="font-medium">{task.title}</span>
                              <Badge variant={task.status === 'To Do' ? 'secondary' : 'default'}>{task.status}</Badge>
                              <Badge variant="outline">{task.timeframe}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">{format(task.dueDate, 'MMM d, yyyy')}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveTask(task.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </ScrollArea>

                {state.isAddingTask.get() ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <Input
                      placeholder="Task title"
                      value={state.newTask.title.get()}
                      onChange={(e) => state.newTask.title.set(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={state.newTask.priority.get()}
                          onValueChange={(value) => state.newTask.priority.set(value as Task['priority'])}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={state.newTask.status.get()}
                          onValueChange={(value) => state.newTask.status.set(value as Task['status'])}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeframe">Timeframe</Label>
                        <Select
                          value={state.newTask.timeframe.get()}
                          onValueChange={(value) => state.newTask.timeframe.set(value as Task['timeframe'])}
                        >
                          <SelectTrigger id="timeframe">
                            <SelectValue placeholder="Select  timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${
                                !state.newTask.dueDate.get() && "text-muted-foreground"
                              }`}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {state.newTask.dueDate.get() ? format(state.newTask.dueDate.get(), "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={state.newTask.dueDate.get()}
                              onSelect={(date) => state.newTask.dueDate.set(date || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                      <Input
                        id="estimatedTime"
                        type="number"
                        value={state.newTask.estimatedTime.get()}
                        onChange={(e) => state.newTask.estimatedTime.set(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={state.newTask.tags.get().join(', ')}
                        onChange={(e) => state.newTask.tags.set(e.target.value.split(',').map(tag => tag.trim()))}
                        placeholder="Enter tags"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => state.isAddingTask.set(false)}>Cancel</Button>
                      <Button onClick={handleAddTask}>Add Task</Button>
                    </div>
                  </motion.div>
                ) : (
                  <TaskSelector
                   addSelectedPredefinedTasks={addSelectedPredefinedTasks}
                   handlePredefinedTaskToggle={handlePredefinedTaskToggle}
                   setIsAddingTask={(value: boolean) => state.isAddingTask.set(value)}
                   selectedPredefinedTasks={state.selectedPredefinedTasks.get()}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Goals</CardTitle>
                <CardDescription>Set and track your personal, work, and other goals here.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] rounded-md border p-2">
                    {state.goals.get().length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full space-y-4 text-center text-gray-600 dark:text-gray-300"
                      >
                        <h3 className="text-lg font-semibold">
                          No goals set yet.
                        </h3>
                        <p className="text-sm">
                          Get started by creating a custom goal or selecting a predefined one below to track your progress.
                        </p>
                        <Button
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        >
                          Create Custom Goal
                        </Button>
                      </motion.div>
                    ) : (
                      <AnimatePresence>
                        {state.goals.get().map((goal) => (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 mb-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${categoryColors[goal.category]}`} />
                                <span className="font-medium">{goal.title}</span>
                                <Badge variant="outline">{goal.category}</Badge>
                                <Badge variant={goal.status === 'Not Started' ? 'secondary' : 'default'}>{goal.status}</Badge>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveGoal(goal.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {goal.description && (
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </ScrollArea>

                {state.isAddingGoal.get() ? (
                  <GoalSelector
                    newGoal={state.newGoal.get()}
                    setNewGoal={(value: Partial<Goal>) => state.newGoal.set({...state.newGoal.get(), ...value})}
                    setIsAddingGoal={(value: boolean) => state.isAddingGoal.set(value)}
                    handleAddGoal={handleAddGoal}
                  />
                ) : (
                  <GoalPredSelector
                    setIsAddingGoal={(value: boolean) => state.isAddingGoal.set(value)}
                    addSelectedPredefinedGoals={addSelectedPredefinedGoals}
                    handlePredefinedGoalToggle={handlePredefinedGoalToggle}
                    selectedPredefinedGoals={state.selectedPredefinedGoals.get()}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default observer(EnhancedTaskGoalManager)