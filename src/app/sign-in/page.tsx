'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the OTP to the provided email
    setIsOtpSent(true)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would verify the OTP and sign in the user
    console.log('OTP submitted:', otp.join(''))
  }

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current one is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Sign in
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Sign in with Google
              </Button>
              <Button variant="outline" className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                <Github className="w-5 h-5 mr-2" />
                Sign in with GitHub
              </Button>
            </motion.div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            {!isOtpSent ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="otp-0">Enter OTP</Label>
                  <div className="flex justify-between">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d{1}"
                        maxLength={1}
                        className="w-12 h-12 text-center text-2xl"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        required
                      />
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Verify OTP
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="link" className="text-sm text-indigo-600 hover:text-indigo-700">
              Forgot your password?
            </Button>
            <div className="flex items-center justify-center space-x-1 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Don&apos;t have an account?</span>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-700">
                Sign up
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      {isOtpSent && (
        <motion.div
          className="fixed bottom-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="bg-green-100 border-green-300 text-green-800">
            <Mail className="h-4 w-4" />
            <AlertDescription>OTP sent successfully! Check your email.</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}