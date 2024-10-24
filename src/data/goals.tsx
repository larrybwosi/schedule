import {
  Brain,
  Briefcase,
  GraduationCap,
  Heart,
  Smartphone,
  Book,
  Home,
  Globe,
  Music,
  Bike,
  Leaf,
  Coffee
} from 'lucide-react'

type Goal = {
  title: string
  description: string
  category: 'Health' | 'Education' | 'Finance' | 'Personal'
  icon: React.ElementType
  timeframe: string
}
export const predefinedGoals: Goal[] = [
  {
    title: 'Run a Marathon',
    description: 'Train and complete a full marathon',
    category: 'Health',
    icon: Heart,
    timeframe: '12 months'
  },
  {
    title: 'Learn a New Language',
    description: 'Achieve B2 level proficiency',
    category: 'Education',
    icon: Brain,
    timeframe: '6 months'
  },
  {
    title: 'Start a Side Business',
    description: 'Launch and generate first revenue',
    category: 'Finance',
    icon: Briefcase,
    timeframe: '6 months'
  },
  {
    title: 'Master Web Development',
    description: 'Build and deploy 3 full-stack applications',
    category: 'Education',
    icon: Smartphone,
    timeframe: '9 months'
  },
  {
    title: 'Read 24 Books',
    description: 'Two books per month for personal growth',
    category: 'Personal',
    icon: Book,
    timeframe: '12 months'
  },
  {
    title: 'Save for Down Payment',
    description: 'Save 20% for home purchase',
    category: 'Finance',
    icon: Home,
    timeframe: '24 months'
  },
  {
    title: 'Travel to 3 Countries',
    description: 'Experience new cultures and places',
    category: 'Personal',
    icon: Globe,
    timeframe: '12 months'
  },
  {
    title: 'Learn an Instrument',
    description: 'Master basic piano skills',
    category: 'Personal',
    icon: Music,
    timeframe: '6 months'
  },
  {
    title: 'Improve Fitness',
    description: 'Exercise 4 times per week',
    category: 'Health',
    icon: Bike,
    timeframe: '3 months'
  },
  {
    title: 'Start a Garden',
    description: 'Grow own vegetables and herbs',
    category: 'Personal',
    icon: Leaf,
    timeframe: '6 months'
  },
  {
    title: 'Professional Certification',
    description: 'Obtain industry certification',
    category: 'Education',
    icon: GraduationCap,
    timeframe: '4 months'
  },
  {
    title: 'Morning Routine',
    description: 'Establish consistent morning habits',
    category: 'Personal',
    icon: Coffee,
    timeframe: '1 month'
  }
]