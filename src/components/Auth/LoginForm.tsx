import React, { useState } from 'react'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginFormProps {
  onNavigate: (page: string) => void
}

export function LoginForm({ onNavigate }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      onNavigate('dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
      <div className="w-full max-w-md">
        <div className="pastoral-card p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-pastoral-sage-500 p-3 rounded-2xl mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-pastoral-moss-800">
              Welcome Back
            </h1>
            <p className="text-pastoral-muted-600 text-center mt-2">
              Sign in to continue your nutrition journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-pastoral-moss-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pastoral-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-pastoral-moss-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pastoral-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastoral-muted-500 hover:text-pastoral-sage-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full pastoral-button"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => onNavigate('forgot-password')}
              className="text-sm text-pastoral-moss-700 hover:text-pastoral-moss-800 transition-colors underline"
            >
              Forgot your password?
            </button>
            <div className="text-sm text-pastoral-muted-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-pastoral-moss-700 hover:text-pastoral-moss-800 font-semibold transition-colors underline"
              >
                Sign up here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}