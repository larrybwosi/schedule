"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Our Story</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&#39;re on a mission to revolutionize the way people interact with technology. 
            Our passion drives us to create innovative solutions that make a difference.
          </p>
        </motion.section>

        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
            <ul className="space-y-4">
              {['Cutting-edge AI solutions', 'User-friendly interfaces', 'Personalized experiences', 'Robust data security'].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <svg className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-xl">
            <Image src="https://g-v8wsyh64scf.vusercontent.net/placeholder.svg" alt="Our Offerings" layout="fill" objectFit="cover" />
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Goals</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We strive to empower individuals and businesses with transformative technology, 
            fostering innovation and driving positive change in our global community.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', description: "Pushing the boundaries of what's possible" },
              { title: 'Accessibility', description: 'Making advanced technology available to all' },
              { title: 'Sustainability', description: 'Creating solutions for a better tomorrow' }
            ].map((goal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{goal.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Miller', 
                role: 'CEO, Quantum Solutions', 
                quote: "Partnering with them revolutionized our operations. We saw a 40% increase in efficiency within six months, thanks to their innovative tech solutions. Their ability to understand our unique challenges and offer tailored solutions has been a game-changer."
              },
              {
                name: 'Sarah Patel', 
                role: 'Founder, Visionary Startups', 
                quote: "The team's attention to detail and forward-thinking approach have been pivotal in scaling our business. From concept to execution, they ensured every aspect of our digital transformation exceeded expectations. Our customer satisfaction rates have never been higher."
              },
              {
                name: 'Michael Lee', 
                role: 'CTO, Horizon Enterprises', 
                quote: "Their technical expertise and reliability are unmatched. Not only did they help us streamline complex processes, but their proactive support ensured we stayed ahead in a rapidly evolving market. They've become an integral part of our strategic planning."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Journey</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Be part of our innovative community. Subscribe now and get a free consultation session!
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Subscribe</Button>
            </div>
          </form>
        </motion.section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">&copy; 2024 Schedule Wise. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}