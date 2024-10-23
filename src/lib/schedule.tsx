import { Activity, Book, Briefcase, Clock, Coffee, Droplet, Heart, Moon, Music, Sun, Target, Utensils } from "lucide-react"

export type Activity = {
  id: string
  day: string
  time: string
  duration: number
  name: string
  isFixed: boolean
  description?: string
}

export  const initialSchedule: Activity[] = [
  { id: '1', day: 'Monday', time: '07:00', duration: 45, name: 'Laundry', isFixed: true },
  { id: '2', day: 'Monday', time: '08:00', duration: 70, name: 'Meeting Preparation', isFixed: true },
  { id: '3', day: 'Tuesday', time: '07:00', duration: 55, name: 'Personal Bible Study', isFixed: true },
  { id: '4', day: 'Wednesday', time: '08:00', duration: 70, name: 'Meeting Preparation', isFixed: true },
  { id: '5', day: 'Thursday', time: '19:00', duration: 40, name: 'Book Reading', isFixed: true },
  { id: '6', day: 'Friday', time: '07:00', duration: 45, name: 'Laundry', isFixed: true },
  { id: '7', day: 'Saturday', time: '08:30', duration: 390, name: 'Field Service', isFixed: true },
  { id: '8', day: 'Sunday', time: '10:00', duration: 120, name: 'Rest and Reflection', isFixed: true },
]

export const dailyRoutine = [
  { time: '06:00', activity: 'Wake up', icon: Sun },
  { time: '06:15', activity: 'Morning Exercise (15min)', icon: Heart },
  { time: '06:30', activity: 'Shower (15min)', icon: Droplet },
  { time: '07:00', activity: 'Bible Reading (35min)', icon: Book },
  { time: '07:40', activity: 'Breakfast & Daily Goal Setting (20min)', icon: Target },
  { time: '08:00', activity: 'Start Work/Daily Activities', icon: Briefcase },
  { time: '10:30', activity: 'Quick Break (10min)', icon: Coffee },
  { time: '12:00', activity: 'Lunch & Mindfulness Practice (30min)', icon: Utensils },
  { time: '15:00', activity: 'Afternoon Break (15min)', icon: Music },
  { time: '17:00', activity: 'End Work/Daily Activities', icon: Clock },
  { time: '19:00', activity: 'Evening Exercise (30min)', icon: Heart },
  { time: '21:00', activity: 'Wind Down & Reflection (30min)', icon: Moon },
  { time: '22:00', activity: 'Bedtime', icon: Moon },
]