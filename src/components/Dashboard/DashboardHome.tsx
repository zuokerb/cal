import React from 'react'
import { Camera, TrendingUp, Target, Calendar } from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface DashboardHomeProps {
  onNavigate: (page: string) => void
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const { profile, todaySummary, recentEntries, isLoading } = useUserData()

  const calorieGoal = profile?.daily_calorie_goal || 2000
  const currentCalories = todaySummary?.total_calories || 0
  const calorieProgress = Math.min((currentCalories / calorieGoal) * 100, 100)

  const proteinGoal = profile?.daily_protein_goal || 150
  const currentProtein = todaySummary?.total_protein_g || 0
  const proteinProgress = Math.min((currentProtein / proteinGoal) * 100, 100)

  const carbGoal = profile?.daily_carb_goal || 225
  const currentCarbs = todaySummary?.total_carbs_g || 0
  const carbProgress = Math.min((currentCarbs / carbGoal) * 100, 100)

  const fatGoal = profile?.daily_fat_goal || 65
  const currentFat = todaySummary?.total_fat_g || 0
  const fatProgress = Math.min((currentFat / fatGoal) * 100, 100)

  if (isLoading) {
    return (
      <div className="min-h-screen pastoral-gradient-bg p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-pastoral-sage-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-pastoral-sage-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-pastoral-moss-800">
            Welcome back, {profile?.full_name || 'there'}! 🌱
          </h1>
          <p className="text-lg text-pastoral-muted-600">
            Track your nutrition journey with natural intelligence
          </p>
          
          {/* Quick Action */}
          <Button
            onClick={() => onNavigate('analyze')}
            className="pastoral-button text-lg px-8 py-4 h-auto"
          >
            <Camera className="mr-2 h-5 w-5" />
            Analyze Food Photo
          </Button>
        </div>

        {/* Today's Overview */}
        <Card className="pastoral-card">
          <CardHeader>
            <CardTitle className="flex items-center text-pastoral-moss-800">
              <Calendar className="mr-2 h-5 w-5" />
              Today's Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Calories */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pastoral-moss-700">Calories</span>
                  <span className="text-sm text-pastoral-muted-600">{Math.round(currentCalories)}/{calorieGoal}</span>
                </div>
                <Progress value={calorieProgress} className="h-2" />
                <p className="text-xs text-pastoral-muted-600">
                  {calorieGoal - currentCalories > 0
                    ? `${Math.round(calorieGoal - currentCalories)} remaining`
                    : 'Goal achieved! 🎉'
                  }
                </p>
              </div>

              {/* Protein */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pastoral-moss-700">Protein</span>
                  <span className="text-sm text-pastoral-muted-600">{Math.round(currentProtein)}g/{proteinGoal}g</span>
                </div>
                <Progress value={proteinProgress} className="h-2" />
                <p className="text-xs text-pastoral-muted-600">
                  {proteinGoal - currentProtein > 0
                    ? `${Math.round(proteinGoal - currentProtein)}g remaining`
                    : 'Goal achieved! 💪'
                  }
                </p>
              </div>

              {/* Carbs */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pastoral-moss-700">Carbs</span>
                  <span className="text-sm text-pastoral-muted-600">{Math.round(currentCarbs)}g/{carbGoal}g</span>
                </div>
                <Progress value={carbProgress} className="h-2" />
                <p className="text-xs text-pastoral-muted-600">
                  {carbGoal - currentCarbs > 0
                    ? `${Math.round(carbGoal - currentCarbs)}g remaining`
                    : 'Goal achieved! ⚡'
                  }
                </p>
              </div>

              {/* Fat */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pastoral-moss-700">Fat</span>
                  <span className="text-sm text-pastoral-muted-600">{Math.round(currentFat)}g/{fatGoal}g</span>
                </div>
                <Progress value={fatProgress} className="h-2" />
                <p className="text-xs text-pastoral-muted-600">
                  {fatGoal - currentFat > 0
                    ? `${Math.round(fatGoal - currentFat)}g remaining`
                    : 'Goal achieved! 🥑'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Entries and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Food Entries */}
          <Card className="pastoral-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-pastoral-moss-800">
                <span className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Entries
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('history')}
                  className="text-pastoral-sage-600 hover:text-pastoral-sage-700"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentEntries?.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-pastoral-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-8 w-8 text-pastoral-sage-500" />
                  </div>
                  <p className="text-pastoral-muted-600 mb-4">
                    No food entries yet. Start by analyzing your first meal!
                  </p>
                  <Button
                    onClick={() => onNavigate('analyze')}
                    className="pastoral-button"
                  >
                    Analyze Food
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentEntries?.slice(0, 3).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center space-x-4 p-3 rounded-xl bg-pastoral-sage-50 hover:bg-pastoral-sage-100 transition-colors"
                    >
                      {entry.image_url && (
                        <img
                          src={entry.image_url}
                          alt={entry.food_name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-pastoral-moss-800">
                          {entry.food_name}
                        </h4>
                        <p className="text-sm text-pastoral-muted-600">
                          {Math.round(entry.calories)} calories
                        </p>
                      </div>
                      <div className="text-xs text-pastoral-muted-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="pastoral-card">
            <CardHeader>
              <CardTitle className="flex items-center text-pastoral-moss-800">
                <Target className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={() => onNavigate('analyze')}
                  className="w-full pastoral-button justify-start"
                >
                  <Camera className="mr-3 h-5 w-5" />
                  Analyze Food Photo
                </Button>
                
                <Button
                  onClick={() => onNavigate('goals')}
                  variant="outline"
                  className="w-full justify-start border-pastoral-sage-200 text-pastoral-moss-700 hover:bg-pastoral-sage-50"
                >
                  <Target className="mr-3 h-5 w-5" />
                  Set Nutrition Goals
                </Button>
                
                <Button
                  onClick={() => onNavigate('profile')}
                  variant="outline"
                  className="w-full justify-start border-pastoral-sage-200 text-pastoral-moss-700 hover:bg-pastoral-sage-50"
                >
                  <TrendingUp className="mr-3 h-5 w-5" />
                  Update Profile
                </Button>
              </div>

              {/* Motivational Message */}
              <div className="mt-6 p-4 bg-gradient-to-r from-pastoral-sage-50 to-pastoral-cream-50 rounded-xl">
                <p className="text-sm text-pastoral-moss-700 text-center font-medium">
                  🌱 Every healthy choice is a step towards a better you!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}