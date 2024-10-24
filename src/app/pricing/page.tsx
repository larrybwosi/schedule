"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Shield, HelpCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: { monthly: 9, annually: 99 },
    description: "Perfect for individuals just getting started",
    features: [
      "Basic task management",
      "5 projects",
      "1 team member",
      "1GB storage",
      "Email support"
    ],
    cta: "Start Free Trial",
    highlight: false
  },
  {
    name: "Pro",
    price: { monthly: 29, annually: 299 },
    description: "Ideal for growing teams and businesses",
    features: [
      "Advanced task management",
      "Unlimited projects",
      "Up to 10 team members",
      "10GB storage",
      "Priority email support",
      "Time tracking",
      "Custom workflows"
    ],
    cta: "Go Pro",
    highlight: true
  },
  {
    name: "Enterprise",
    price: { monthly: 99, annually: 999 },
    description: "For large organizations with complex needs",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "100GB storage",
      "24/7 phone support",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    highlight: false
  }
]

const PricingCard = ({ plan, isAnnual }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={cn(
        "relative overflow-hidden",
        plan.highlight ? "border-2 border-purple-500" : "border border-gray-200",
        isDark ? "bg-gray-800" : "bg-white"
      )}>
        {plan.highlight && (
          <div className="absolute top-0 right-0">
            <Badge className="rounded-none rounded-bl bg-purple-500 text-white px-3 py-1">
              Most Popular
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className={cn(
            "text-2xl font-bold",
            isDark ? "text-white" : "text-gray-900"
          )}>{plan.name}</CardTitle>
          <CardDescription className={isDark ? "text-gray-300" : "text-gray-600"}>
            {plan.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className={cn(
              "text-4xl font-bold",
              isDark ? "text-white" : "text-gray-900"
            )}>
              ${isAnnual ? plan.price.annually : plan.price.monthly}
            </span>
            <span className={isDark ? "text-gray-300" : "text-gray-600"}>
              /{isAnnual ? 'year' : 'month'}
            </span>
          </div>
          {isAnnual && (
            <Badge className="mb-4 bg-green-100 text-green-800">
              Save ${plan.price.monthly * 12 - plan.price.annually}!
            </Badge>
          )}
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}
              >
                <Check className="w-5 h-5 mr-2 text-green-500" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className={cn(
            "w-full",
            plan.highlight
              ? "bg-purple-500 hover:bg-purple-600 text-white"
              : isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          )}>
            {plan.cta}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cn(
      "min-h-screen py-12 px-4 sm:px-6 lg:px-8",
      isDark ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "text-4xl font-extrabold sm:text-5xl md:text-6xl",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "mt-3 max-w-2xl mx-auto text-xl sm:mt-4",
              isDark ? "text-gray-300" : "text-gray-500"
            )}
          >
            Unlock your productivity potential with our flexible pricing options
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center mb-8 space-x-4"
        >
          <span className={cn(
            "text-sm font-medium",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={cn(
            "text-sm font-medium",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Annually
            <Badge className="ml-2 bg-green-100 text-green-800">Save up to 20%</Badge>
          </span>
        </motion.div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h2 className={cn(
            "text-2xl font-bold mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={cn(
              "flex flex-col items-center p-4 rounded-lg",
              isDark ? "bg-gray-800" : "bg-white"
            )}>
              <Zap className="w-12 h-12 text-yellow-400 mb-2" />
              <h3 className={cn(
                "text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>Lightning Fast</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Our platform is optimized for speed, ensuring you can work efficiently.
              </p>
            </div>
            <div className={cn(
              "flex flex-col items-center p-4 rounded-lg",
              isDark ? "bg-gray-800" : "bg-white"
            )}>
              <Shield className="w-12 h-12 text-green-400 mb-2" />
              <h3 className={cn(
                "text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>Secure & Reliable</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Your data is protected with enterprise-grade security measures.
              </p>
            </div>
            <div className={cn(
              "flex flex-col items-center p-4 rounded-lg",
              isDark ? "bg-gray-800" : "bg-white"
            )}>
              <Star className="w-12 h-12 text-purple-400 mb-2" />
              <h3 className={cn(
                "text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>5-Star Support</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Our dedicated support team is always ready to assist you.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={cn(
            "mt-12 p-6 rounded-lg text-center",
            isDark ? "bg-gray-800" : "bg-white"
          )}
        >
          <h2 className={cn(
            "text-2xl font-bold mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className={cn(
                "flex items-center text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <HelpCircle className="w-5 h-5 mr-2 text-purple-500" />
                Can I change my plan later?
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className={cn(
                "flex items-center text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <HelpCircle className="w-5 h-5 mr-2 text-purple-500" />
                Is there a free trial available?
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <h2 className={cn(
            "text-2xl font-bold mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Still have questions?
          </h2>
          <p className={cn(
            "mb-4",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Our friendly team is here to help.
          </p>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Contact Support
          </Button>
        </motion.div>
      </div>
    </div>
  )
}