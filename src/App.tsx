import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Layout/Header'
import { HomePage } from '@/components/Home/HomePage'
import { LoginForm } from '@/components/Auth/LoginForm'
import { SignupForm } from '@/components/Auth/SignupForm'
import { DashboardHome } from '@/components/Dashboard/DashboardHome'
import { FoodAnalyzer } from '@/components/FoodAnalysis/FoodAnalyzer'
import { FoodHistory } from '@/components/History/FoodHistory'
import { NutritionGoals } from '@/components/Goals/NutritionGoals'
import './app/globals.css'
import { Analytics } from "@vercel/analytics/next"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'analyze' | 'history' | 'goals' | 'profile' | 'forgot-password'

function AppContent() {
  const { user, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>(user ? 'dashboard' : 'home')

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-pastoral-sage-200 rounded-full animate-pulse mx-auto"></div>
          <p className="text-pastoral-muted-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect authenticated users away from auth pages
  if (user && (currentPage === 'home' || currentPage === 'login' || currentPage === 'signup')) {
    setCurrentPage('dashboard')
  }

  // Redirect unauthenticated users to home
  if (!user && !['home', 'login', 'signup', 'forgot-password'].includes(currentPage)) {
    setCurrentPage('home')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />
      case 'login':
        return <LoginForm onNavigate={handleNavigate} />
      case 'signup':
        return <SignupForm onNavigate={handleNavigate} />
      case 'dashboard':
        return (
          <>
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <DashboardHome onNavigate={handleNavigate} />
          </>
        )
      case 'analyze':
        return (
          <>
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <FoodAnalyzer onNavigate={handleNavigate} />
          </>
        )
      case 'history':
        return (
          <>
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <FoodHistory onNavigate={handleNavigate} />
          </>
        )
      case 'goals':
        return (
          <>
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <NutritionGoals onNavigate={handleNavigate} />
          </>
        )
      case 'profile':
        return (
          <>
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
              <div className="container mx-auto max-w-4xl text-center py-20">
                <h1 className="text-3xl font-display font-bold mb-4" style={{color: '#2e3d28'}}>
                  Profile Settings
                </h1>
                <p className="text-pastoral-muted-600 mb-8">
                  Coming soon! Manage your profile and preferences.
                </p>
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className="pastoral-button"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </>
        )
      case 'forgot-password':
        return (
          <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
            <div className="w-full max-w-md pastoral-card p-8 text-center">
              <h1 className="text-2xl font-display font-bold text-pastoral-moss-800 mb-4">
                Reset Password
              </h1>
              <p className="text-pastoral-muted-600 mb-8">
                Coming soon! Password reset functionality.
              </p>
              <button
                onClick={() => handleNavigate('login')}
                className="pastoral-button w-full"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen">
      {renderPage()}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#f6f8f4',
            color: '#2e3d28',
            border: '1px solid #d4e1cb',
            borderRadius: '0.75rem',
          },
          success: {
            iconTheme: {
              primary: '#6d8f54',
              secondary: '#f6f8f4',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#f6f8f4',
            },
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Analytics />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App