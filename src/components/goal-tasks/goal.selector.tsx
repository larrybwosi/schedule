import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  GraduationCap,
  Heart,
  UserCircle,
  Wallet,
  Users,
  Target,
} from 'lucide-react';

const GoalSelector = ({ 
  newGoal, 
  setNewGoal, 
  setIsAddingGoal, 
  handleAddGoal 
}) => {
  const categories = [
    { value: 'Health', icon: Heart, color: 'text-red-500' },
    { value: 'Work', icon: Briefcase, color: 'text-blue-500' },
    { value: 'Personal', icon: UserCircle, color: 'text-purple-500' },
    { value: 'Education', icon: GraduationCap, color: 'text-green-500' },
    { value: 'Finance', icon: Wallet, color: 'text-yellow-500' },
    { value: 'Social', icon: Users, color: 'text-pink-500' },
  ];

  const statusColors = {
    'Not Started': 'text-gray-500',
    'In Progress': 'text-blue-500',
    'Achieved': 'text-green-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Create New Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Input with animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="title" className="text-sm font-medium mb-1.5 block">
              Goal Title
            </Label>
            <Input
              id="title"
              placeholder="Enter your goal title"
              value={newGoal.title || ''}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>

          {/* Category and Status Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Category Select */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium mb-1.5 block">
                Category
              </Label>
              <Select
                value={newGoal.category}
                onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
              >
                <SelectTrigger id="category" className="border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(({ value, icon: Icon, color }) => (
                    <SelectItem key={value} value={value} className="cursor-pointer">
                      <div className="flex items-center">
                        <Icon className={`w-4 h-4 mr-2 ${color}`} />
                        <span>{value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Select */}
            <div>
              <Label htmlFor="goalStatus" className="text-sm font-medium mb-1.5 block">
                Status
              </Label>
              <Select
                value={newGoal.status}
                onValueChange={(value) => setNewGoal({ ...newGoal, status: value })}
              >
                <SelectTrigger id="goalStatus" className="border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusColors).map(([status, color]) => (
                    <SelectItem key={status} value={status} className="cursor-pointer">
                      <span className={color}>{status}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Description Textarea */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="description" className="text-sm font-medium mb-1.5 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={newGoal.description || ''}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="Describe your goal in detail..."
              className="min-h-[120px] border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end space-x-3 pt-4"
          >
            <Button 
              variant="outline" 
              onClick={() => setIsAddingGoal(false)}
              className="border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddGoal}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create Goal
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GoalSelector;