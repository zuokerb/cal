import React from 'react'
import { Leaf, User, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      onNavigate('home')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="pastoral-card sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-pastoral-sage-500 p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-pastoral-moss-800">
                Cal AI
              </h1>
              <p className="text-xs text-pastoral-muted-600">
                Natural Nutrition Tracking
              </p>
            </div>
          </div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'text-pastoral-sage-600'
                    : 'text-pastoral-muted-600 hover:text-pastoral-sage-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('analyze')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'analyze'
                    ? 'text-pastoral-sage-600'
                    : 'text-pastoral-muted-600 hover:text-pastoral-sage-600'
                }`}
              >
                Analyze Food
              </button>
              <button
                onClick={() => onNavigate('history')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'history'
                    ? 'text-pastoral-sage-600'
                    : 'text-pastoral-muted-600 hover:text-pastoral-sage-600'
                }`}
              >
                History
              </button>
              <button
                onClick={() => onNavigate('goals')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'goals'
                    ? 'text-pastoral-sage-600'
                    : 'text-pastoral-muted-600 hover:text-pastoral-sage-600'
                }`}
              >
                Goals
              </button>
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-pastoral-sage-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-pastoral-sage-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="text-pastoral-muted-600 hover:text-pastoral-sage-600"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                  className="pastoral-button"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}