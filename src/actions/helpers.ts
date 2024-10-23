import { 
  Prisma,
  Status,
  Priority,
  Category,
  GoalStatus,
  ExerciseType,
  FoodType
} from '@prisma/client'
import { 
  userCrud, 
  teamCrud, 
  taskCrud, 
  goalCrud, 
  workoutCrud,
  mealPlanCrud,
  activityCrud,
  eventCrud,
  tagCrud,
  fitnessDataCrud,
} from './crud'
import prisma from '@/lib/db'

// User Helpers
export const UserHelpers = {
  registerUser: async (email: string, name: string) => {
    const existingUser = await userCrud.findByEmail(email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    const user = await userCrud.create({
      email,
      name,
      settings: {
        create: {
          isDarkMode: false,
          language: 'en',
          timezone: 'UTC'
        }
      }
    })

    // Initialize fitness data
    await fitnessDataCrud.create({
      user: { connect: { id: user.id } }
    })

    return user
  },

  updateUserProfile: async (
    userId: string,
    data: {
      name?: string
      email?: string
      settings?: {
        isDarkMode?: boolean
        language?: string
        timezone?: string
      }
    }
  ) => {
    const updates: Prisma.UserUpdateInput = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.settings && {
        settings: {
          update: data.settings
        }
      })
    }

    return await userCrud.update(userId, updates)
  },

  getUserDashboard: async (userId: string) => {
    const user = await userCrud.findById(userId)
    if (!user) throw new Error('User not found')

    const tasks = await taskCrud.listByUser(userId)
    const goals = await goalCrud.listByUser(userId)
    const workouts = await workoutCrud.listByUser(userId)
    const mealPlans = await mealPlanCrud.listByUser(userId)
    const activities = await activityCrud.listByUser(userId)
    const events = await eventCrud.listByUser(userId)

    return {
      user,
      stats: {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        activeGoals: goals.filter(g => g.status === 'inProgress').length,
        totalWorkouts: workouts.length,
        upcomingEvents: events.filter(e => e.date > new Date()).length
      },
      recentActivities: activities.slice(0, 5),
      upcomingEvents: events.filter(e => e.date > new Date()).slice(0, 5)
    }
  }
}

// Team Helpers
export const TeamHelpers = {
  createTeamWithMembers: async (
    name: string,
    description: string | undefined,
    members: Array<{ userId: string; role: string }>
  ) => {
    return await teamCrud.create({
      name,
      description,
      members: {
        create: members.map(member => ({
          role: member.role,
          user: { connect: { id: member.userId } }
        }))
      }
    })
  },

  addTeamMember: async (teamId: string, userId: string, role: string) => {
    return await teamCrud.update(teamId, {
      members: {
        create: {
          role,
          user: { connect: { id: userId } }
        }
      }
    })
  },

  removeTeamMember: async (teamId: string, userId: string) => {
    return await teamCrud.update(teamId, {
      members: {
        delete: {
          userId_teamId: {
            userId,
            teamId
          }
        }
      }
    })
  },

  updateTeamMemberRole: async (teamId: string, userId: string, newRole: string) => {
    return await teamCrud.update(teamId, {
      members: {
        update: {
          where: {
            userId_teamId: {
              userId,
              teamId
            }
          },
          data: { role: newRole }
        }
      }
    })
  },

  getTeamDashboard: async (teamId: string) => {
    const team = await teamCrud.findById(teamId)
    if (!team) throw new Error('Team not found')

    const tasks = await taskCrud.listByTeam(teamId)

    return {
      team,
      stats: {
        memberCount: team.members.length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        inProgressTasks: tasks.filter(t => t.status === 'inProgress').length
      },
      recentTasks: tasks.slice(0, 5)
    }
  }
}

// Task Helpers
export const TaskHelpers = {
  createTaskWithSubtasks: async (
    data: {
      title: string
      description?: string
      status: Status
      priority: Priority
      dueDate?: Date
      userId: string
      teamId?: string
      tags?: string[]
      subtasks?: string[]
    }
  ) => {
    const taskData: Prisma.TaskCreateInput = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      user: { connect: { id: data.userId } },
      ...(data.teamId && { team: { connect: { id: data.teamId } } }),
      ...(data.tags && {
        tags: {
          connectOrCreate: data.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }),
      ...(data.subtasks && {
        subtasks: {
          create: data.subtasks.map(title => ({
            title,
            completed: false
          }))
        }
      })
    }

    return await taskCrud.create(taskData)
  },

  updateTaskStatus: async (
    taskId: string,
    status: Status,
    completedAt?: Date
  ) => {
    return await taskCrud.update(taskId, {
      status,
      ...(status === 'completed' && { completedAt })
    })
  },

  addSubtasks: async (taskId: string, subtaskTitles: string[]) => {
    return await taskCrud.update(taskId, {
      subtasks: {
        create: subtaskTitles.map(title => ({
          title,
          completed: false
        }))
      }
    })
  },

  updateSubtaskStatus: async (taskId: string, subtaskId: string, completed: boolean) => {
    return await taskCrud.update(taskId, {
      subtasks: {
        update: {
          where: { id: subtaskId },
          data: { completed }
        }
      }
    })
  },

  getTasksByFilter: async (filters: {
    userId?: string
    teamId?: string
    status?: Status
    priority?: Priority
    dueBefore?: Date
    dueAfter?: Date
    tags?: string[]
  }) => {
    const where: Prisma.TaskWhereInput = {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.teamId && { teamId: filters.teamId }),
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
      ...(filters.dueBefore && { dueDate: { lte: filters.dueBefore } }),
      ...(filters.dueAfter && { dueDate: { gte: filters.dueAfter } }),
      ...(filters.tags && {
        tags: {
          some: {
            name: { in: filters.tags }
          }
        }
      })
    }

    return await prisma.task.findMany({
      where,
      include: {
        subtasks: true,
        tags: true
      }
    })
  }
}

// Goal Helpers
export const GoalHelpers = {
  createGoalWithMilestones: async (
    data: {
      title: string
      description?: string
      category: Category
      deadline?: Date
      userId: string
      milestones?: Array<{
        title: string
        description?: string
        dueDate?: Date
      }>
    }
  ) => {
    const goalData: Prisma.GoalCreateInput = {
      title: data.title,
      description: data.description,
      category: data.category,
      deadline: data.deadline,
      status: 'notStarted',
      progress: 0,
      user: { connect: { id: data.userId } },
      ...(data.milestones && {
        milestones: {
          create: data.milestones
        }
      })
    }

    return await goalCrud.create(goalData)
  },

  updateGoalProgress: async (
    goalId: string,
    progress: number,
    status?: GoalStatus
  ) => {
    const updates: Prisma.GoalUpdateInput = {
      progress,
      ...(status && { status })
    }

    return await goalCrud.update(goalId, updates)
  },

  addGoalMeasurement: async (
    goalId: string,
    measurement: {
      value: number
      unit: string
      notes?: string
    }
  ) => {
    return await goalCrud.update(goalId, {
      measurements: {
        create: {
          ...measurement,
          date: new Date()
        }
      }
    })
  },

  completeMilestone: async (goalId: string, milestoneId: string) => {
    const goal = await goalCrud.findById(goalId)
    if (!goal) throw new Error('Goal not found')

    // Update milestone
    await prisma.milestone.update({
      where: { id: milestoneId },
      data: { completed: true }
    })

    // Calculate new progress based on completed milestones
    const totalMilestones = goal.milestones.length
    const completedMilestones = goal.milestones.filter(m => m.completed).length + 1
    const newProgress = (completedMilestones / totalMilestones) * 100

    // Update goal progress
    return await goalCrud.update(goalId, {
      progress: newProgress,
      ...(newProgress === 100 && { status: 'achieved' })
    })
  }
}

// Fitness Helpers
export const FitnessHelpers = {
  createWorkoutWithExercises: async (
    data: {
      userId: string
      type: ExerciseType
      duration: number
      caloriesBurned?: number
      notes?: string
      exercises: Array<{
        name: string
        sets?: number
        reps?: number
        weight?: number
        duration?: number
        distance?: number
        notes?: string
      }>
    }
  ) => {
    return await workoutCrud.create({
      date: new Date(),
      type: data.type,
      duration: data.duration,
      caloriesBurned: data.caloriesBurned,
      notes: data.notes,
      user: { connect: { id: data.userId } },
      exercises: {
        create: data.exercises
      }
    })
  },

  updateBodyMeasurements: async (
    userId: string,
    measurements: {
      weight?: number
      bodyFat?: number
      muscleMass?: number
      waterWeight?: number
      chest?: number
      waist?: number
      hips?: number
      notes?: string
    }
  ) => {
    const fitnessData = await fitnessDataCrud.findByUserId(userId)
    if (!fitnessData) throw new Error('Fitness data not found')

    return await prisma.bodyMeasurement.create({
      data: {
        ...measurements,
        date: new Date(),
        fitnessData: { connect: { id: fitnessData.id } }
      }
    })
  },

  getFitnessProgress: async (userId: string, startDate: Date, endDate: Date) => {
    const fitnessData = await fitnessDataCrud.findByUserId(userId)
    if (!fitnessData) throw new Error('Fitness data not found')

    const measurements = await prisma.bodyMeasurement.findMany({
      where: {
        fitnessDataId: fitnessData.id,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' }
    })

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        exercises: true
      },
      orderBy: { date: 'asc' }
    })

    return {
      measurements,
      workouts,
      stats: {
        totalWorkouts: workouts.length,
        totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
        totalCaloriesBurned: workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
        weightChange: measurements.length >= 2 
          ? (measurements[measurements.length - 1].weight || 0) - (measurements[0].weight || 0)
          : 0
      }
    }
  }
}

// Meal Planning Helpers
export const MealPlanHelpers = {
  createMealPlan: async (
    data: {
      userId: string
      type: FoodType
      calories?: number
      protein?: number
      carbs?: number
      fats?: number
      notes?: string
      foods: Array<{
        name: string
        portion: number
        calories: number
        protein?: number
        carbs?: number
        fats?: number
      }>
    }
  ) => {
    return await mealPlanCrud.create({
      date: new Date(),
      type: data.type,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fats: data.fats,
      notes: data.notes,
      user: { connect: { id: data.userId } },
      foods: {
        create: data.foods
      }
    })
  },

  getMealPlansByDateRange: async (
    userId: string,
    startDate: Date,
    endDate: Date
  ) => {
    return await prisma.mealPlan.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        foods: true
      },
      orderBy: { date: 'asc' }
    })
  },

  // Continuing MealPlanHelpers...
  getNutritionSummary: async (userId: string, date: Date) => {
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999))
        }
      },
      include: {
        foods: true
      }
    })

    const summary = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      mealBreakdown: [] as Array<{
        type: FoodType,
        calories: number,
        protein: number,
        carbs: number,
        fats: number
      }>
    }

    mealPlans.forEach(meal => {
      const mealStats = {
        type: meal.type,
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      }

      meal.foods.forEach(food => {
        summary.totalCalories += food.calories
        summary.totalProtein += food.protein || 0
        summary.totalCarbs += food.carbs || 0
        summary.totalFats += food.fats || 0

        mealStats.calories += food.calories
        mealStats.protein += food.protein || 0
        mealStats.carbs += food.carbs || 0
        mealStats.fats += food.fats || 0
      })

      summary.mealBreakdown.push(mealStats)
    })

    return summary
  }
}

// Activity Helpers
export const ActivityHelpers = {
  createActivityWithTags: async (
    data: {
      name: string
      day: string
      time: string
      duration: number
      description?: string
      isRecurring: boolean
      notes?: string
      status?: string
      userId: string
      tags?: string[]
    }
  ) => {
    return await activityCrud.create({
      ...data,
      user: { connect: { id: data.userId } },
      ...(data.tags && {
        tags: {
          connectOrCreate: data.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    })
  },

  getActivitiesByDateRange: async (
    userId: string,
    startDate: string,
    endDate: string
  ) => {
    return await prisma.activity.findMany({
      where: {
        userId,
        day: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        tags: true
      },
      orderBy: [
        { day: 'asc' },
        { time: 'asc' }
      ]
    })
  },

  getRecurringActivities: async (userId: string) => {
    return await prisma.activity.findMany({
      where: {
        userId,
        isRecurring: true
      },
      include: {
        tags: true
      }
    })
  }
}

// Event Helpers
export const EventHelpers = {
  createEvent: async (
    data: {
      title: string
      description?: string
      date: Date
      userId: string
    }
  ) => {
    return await eventCrud.create({
      ...data,
      user: { connect: { id: data.userId } }
    })
  },

  getUpcomingEvents: async (userId: string, daysAhead: number = 7) => {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + daysAhead)

    return await prisma.event.findMany({
      where: {
        userId,
        date: {
          gte: new Date(),
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })
  },

  getEventsByDateRange: async (
    userId: string,
    startDate: Date,
    endDate: Date
  ) => {
    return await prisma.event.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })
  }
}

// Tag Helpers
export const TagHelpers = {
  createOrConnectTags: async (tagNames: string[]) => {
    const tags = await Promise.all(
      tagNames.map(name =>
        prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {}
        })
      )
    )
    return tags
  },

  getTagsWithUsage: async () => {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            activities: true,
            calendarItems: true,
            tasks: true
          }
        }
      }
    })

    return tags.map(tag => ({
      ...tag,
      totalUsage: 
        tag._count.activities + 
        tag._count.calendarItems + 
        tag._count.tasks
    }))
  },

  mergeTags: async (sourceTagId: string, targetTagId: string) => {
    const sourceTag = await tagCrud.findById(sourceTagId)
    const targetTag = await tagCrud.findById(targetTagId)
    
    if (!sourceTag || !targetTag) {
      throw new Error('One or both tags not found')
    }

    // Update all references to point to the target tag
    await prisma.$transaction([
      prisma.activity.updateMany({
        where: {
          tags: {
            some: {
              id: sourceTagId
            }
          }
        },
        data: {
          tags: {
            disconnect: { id: sourceTagId },
            connect: { id: targetTagId }
          }
        }
      }),
      prisma.calendarItem.updateMany({
        where: {
          tags: {
            some: {
              id: sourceTagId
            }
          }
        },
        data: {
          tags: {
            disconnect: { id: sourceTagId },
            connect: { id: targetTagId }
          }
        }
      }),
      prisma.task.updateMany({
        where: {
          tags: {
            some: {
              id: sourceTagId
            }
          }
        },
        data: {
          tags: {
            disconnect: { id: sourceTagId },
            connect: { id: targetTagId }
          }
        }
      }),
      // Finally, delete the source tag
      prisma.tag.delete({
        where: {
          id: sourceTagId
        }
      })
    ])

    return targetTag
  }
}

// Calendar Helpers
export const CalendarHelpers = {
  createCalendarItem: async (
    data: {
      name: string
      date: Date
      time: string
      duration: number
      notes?: string
      userId: string
      tags?: string[]
    }
  ) => {
    return await prisma.calendarItem.create({
      data: {
        ...data,
        user: { connect: { id: data.userId } },
        ...(data.tags && {
          tags: {
            connectOrCreate: data.tags.map(tag => ({
              where: { name: tag },
              create: { name: tag }
            }))
          }
        })
      }
    })
  },

  getCalendarOverview: async (userId: string, startDate: Date, endDate: Date) => {
    const [activities, events, calendarItems] = await Promise.all([
      prisma.activity.findMany({
        where: {
          userId,
          day: {
            gte: startDate.toISOString().split('T')[0],
            lte: endDate.toISOString().split('T')[0]
          }
        },
        include: { tags: true }
      }),
      prisma.event.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.calendarItem.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate
          }
        },
        include: { tags: true }
      })
    ])

    return {
      activities,
      events,
      calendarItems,
      summary: {
        totalItems: activities.length + events.length + calendarItems.length,
        totalDuration: activities.reduce((sum, a) => sum + a.duration, 0) +
                      calendarItems.reduce((sum, c) => sum + c.duration, 0)
      }
    }
  },

  getTimeAvailability: async (userId: string, date: Date) => {
    const dayStart = new Date(date)
    dayStart.setHours(0, 0, 0, 0)
    
    const dayEnd = new Date(date)
    dayEnd.setHours(23, 59, 59, 999)

    const busySlots = await Promise.all([
      prisma.activity.findMany({
        where: {
          userId,
          day: date.toISOString().split('T')[0]
        },
        select: {
          time: true,
          duration: true
        }
      }),
      prisma.calendarItem.findMany({
        where: {
          userId,
          date: {
            gte: dayStart,
            lte: dayEnd
          }
        },
        select: {
          time: true,
          duration: true
        }
      })
    ])

    const flatBusySlots = [...busySlots[0], ...busySlots[1]]
      .map(slot => ({
        start: new Date(`${date.toISOString().split('T')[0]}T${slot.time}`),
        end: new Date(`${date.toISOString().split('T')[0]}T${slot.time}`).getTime() + 
             slot.duration * 60000
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime())

    // Calculate available slots
    const availableSlots = []
    let currentTime = dayStart.getTime()

    flatBusySlots.forEach(slot => {
      if (currentTime < slot.start.getTime()) {
        availableSlots.push({
          start: new Date(currentTime),
          end: new Date(slot.start.getTime())
        })
      }
      currentTime = slot.end
    })

    if (currentTime < dayEnd.getTime()) {
      availableSlots.push({
        start: new Date(currentTime),
        end: dayEnd
      })
    }

    return {
      busySlots: flatBusySlots,
      availableSlots
    }
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

// Utility function to handle common validation scenarios
export const validateInput = {
  required: (value: any, fieldName: string) => {
    if (value === undefined || value === null || value === '') {
      throw new ValidationError(`${fieldName} is required`)
    }
  },

  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format')
    }
  },

  dateRange: (startDate: Date, endDate: Date) => {
    if (startDate > endDate) {
      throw new ValidationError('Start date must be before end date')
    }
  },

  percentage: (value: number) => {
    if (value < 0 || value > 100) {
      throw new ValidationError('Percentage must be between 0 and 100')
    }
  },

  positiveNumber: (value: number, fieldName: string) => {
    if (value < 0) {
      throw new ValidationError(`${fieldName} must be a positive number`)
    }
  }
}