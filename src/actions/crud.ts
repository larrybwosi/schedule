import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

// User CRUD
export const userCrud = {
  create: async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data })
  },
  
  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        activities: true,
        events: true,
        calendarItems: true,
        settings: true,
        teams: true,
        tasks: true,
        goals: true,
        fitnessData: true,
        workouts: true,
        mealPlans: true
      }
    })
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email }
    })
  },

  update: async (id: string, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.user.delete({
      where: { id }
    })
  },

  list: async () => {
    return await prisma.user.findMany()
  }
}

// Team CRUD
export const teamCrud = {
  create: async (data: Prisma.TeamCreateInput) => {
    return await prisma.team.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.team.findUnique({
      where: { id },
      include: {
        members: true,
        tasks: true,
        goals: true
      }
    })
  },

  update: async (id: string, data: Prisma.TeamUpdateInput) => {
    return await prisma.team.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.team.delete({
      where: { id }
    })
  },

  list: async () => {
    return await prisma.team.findMany({
      include: {
        members: true
      }
    })
  }
}

// Task CRUD
export const taskCrud = {
  create: async (data: Prisma.TaskCreateInput) => {
    return await prisma.task.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        subtasks: true,
        tags: true
      }
    })
  },

  update: async (id: string, data: Prisma.TaskUpdateInput) => {
    return await prisma.task.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.task.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.task.findMany({
      where: { userId },
      include: {
        subtasks: true,
        tags: true
      }
    })
  },

  listByTeam: async (teamId: string) => {
    return await prisma.task.findMany({
      where: { teamId },
      include: {
        subtasks: true,
        tags: true
      }
    })
  }
}

// Goal CRUD
export const goalCrud = {
  create: async (data: Prisma.GoalCreateInput) => {
    return await prisma.goal.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.goal.findUnique({
      where: { id },
      include: {
        milestones: true,
        measurements: true
      }
    })
  },

  update: async (id: string, data: Prisma.GoalUpdateInput) => {
    return await prisma.goal.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.goal.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.goal.findMany({
      where: { userId },
      include: {
        milestones: true,
        measurements: true
      }
    })
  }
}

// Workout CRUD
export const workoutCrud = {
  create: async (data: Prisma.WorkoutCreateInput) => {
    return await prisma.workout.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: true
      }
    })
  },

  update: async (id: string, data: Prisma.WorkoutUpdateInput) => {
    return await prisma.workout.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.workout.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: true
      }
    })
  }
}

// MealPlan CRUD
export const mealPlanCrud = {
  create: async (data: Prisma.MealPlanCreateInput) => {
    return await prisma.mealPlan.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.mealPlan.findUnique({
      where: { id },
      include: {
        foods: true
      }
    })
  },

  update: async (id: string, data: Prisma.MealPlanUpdateInput) => {
    return await prisma.mealPlan.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.mealPlan.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.mealPlan.findMany({
      where: { userId },
      include: {
        foods: true
      }
    })
  }
}

// Activity CRUD
export const activityCrud = {
  create: async (data: Prisma.ActivityCreateInput) => {
    return await prisma.activity.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.activity.findUnique({
      where: { id },
      include: {
        tags: true
      }
    })
  },

  update: async (id: string, data: Prisma.ActivityUpdateInput) => {
    return await prisma.activity.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.activity.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.activity.findMany({
      where: { userId },
      include: {
        tags: true
      }
    })
  }
}

// Event CRUD
export const eventCrud = {
  create: async (data: Prisma.EventCreateInput) => {
    return await prisma.event.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.event.findUnique({
      where: { id }
    })
  },

  update: async (id: string, data: Prisma.EventUpdateInput) => {
    return await prisma.event.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.event.delete({
      where: { id }
    })
  },

  listByUser: async (userId: string) => {
    return await prisma.event.findMany({
      where: { userId }
    })
  }
}

// Tag CRUD
export const tagCrud = {
  create: async (data: Prisma.TagCreateInput) => {
    return await prisma.tag.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.tag.findUnique({
      where: { id }
    })
  },

  findByName: async (name: string) => {
    return await prisma.tag.findUnique({
      where: { name }
    })
  },

  update: async (id: string, data: Prisma.TagUpdateInput) => {
    return await prisma.tag.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.tag.delete({
      where: { id }
    })
  },

  list: async () => {
    return await prisma.tag.findMany({
      include: {
        activities: true,
        calendarItems: true,
        tasks: true
      }
    })
  }
}

// FitnessData CRUD
export const fitnessDataCrud = {
  create: async (data: Prisma.FitnessDataCreateInput) => {
    return await prisma.fitnessData.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.fitnessData.findUnique({
      where: { id },
      include: {
        measurements: true
      }
    })
  },

  findByUserId: async (userId: string) => {
    return await prisma.fitnessData.findUnique({
      where: { userId },
      include: {
        measurements: true
      }
    })
  },

  update: async (id: string, data: Prisma.FitnessDataUpdateInput) => {
    return await prisma.fitnessData.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.fitnessData.delete({
      where: { id }
    })
  }
}

// UserSettings CRUD
export const userSettingsCrud = {
  create: async (data: Prisma.UserSettingsCreateInput) => {
    return await prisma.userSettings.create({ data })
  },

  findById: async (id: string) => {
    return await prisma.userSettings.findUnique({
      where: { id }
    })
  },

  findByUserId: async (userId: string) => {
    return await prisma.userSettings.findUnique({
      where: { userId }
    })
  },

  update: async (id: string, data: Prisma.UserSettingsUpdateInput) => {
    return await prisma.userSettings.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.userSettings.delete({
      where: { id }
    })
  }
}

// Error handling wrapper
export const withErrorHandler = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case 'P2002':
          throw new Error('Unique constraint violation')
        case 'P2025':
          throw new Error('Record not found')
        default:
          throw new Error(`Database error: ${error.message}`)
      }
    }
    throw error
  }
}