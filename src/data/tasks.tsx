
import {
  Book,
  Brain,
  Dumbbell,
  Leaf,
  MessageCircle,
  Moon,
  Music,
  Sparkles,
  Sun,
  Utensils,
  GlassWater,
  Zap
} from 'lucide-react'

type Task = {
  title: string
  icon: React.ElementType
  category: string
}
export const predefinedTasks: Task[] = [
  { title: 'Stay Hydrated (2L)', icon: GlassWater, category: 'health' },
  { title: 'Morning Exercise', icon: Dumbbell, category: 'health' },
  { title: 'Read Personal Growth Book', icon: Book, category: 'growth' },
  { title: 'Mindfulness Meditation', icon: Brain, category: 'wellness' },
  { title: 'Morning Energizer Routine', icon: Sun, category: 'health' },
  { title: 'Evening Wind Down', icon: Moon, category: 'wellness' },
  { title: 'Healthy Meal Prep', icon: Utensils, category: 'health' },
  { title: 'Focus Work Session', icon: Zap, category: 'productivity' },
  { title: 'Nature Walk', icon: Leaf, category: 'wellness' },
  { title: 'Connect with Loved Ones', icon: MessageCircle, category: 'social' },
  { title: 'Learn Something New', icon: Sparkles, category: 'growth' },
  { title: 'Music & Relaxation', icon: Music, category: 'wellness' },
]
