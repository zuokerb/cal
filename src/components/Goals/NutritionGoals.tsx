import React, { useState } from 'react'
import { Target, Plus, Edit, Save, X, TrendingUp, Calendar } from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

interface NutritionGoalsProps {
  onNavigate: (page: string) => void
}

export function NutritionGoals({ onNavigate }: NutritionGoalsProps) {
  const { profile, todaySummary, goals, updateProfile, createGoal, isLoading } = useUserData()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [profileData, setProfileData] = useState({
    daily_calorie_goal: profile?.daily_calorie_goal || 2000,
    daily_protein_goal: profile?.daily_protein_goal || 150,
    daily_carb_goal: profile?.daily_carb_goal || 225,
    daily_fat_goal: profile?.daily_fat_goal || 65
  })
  const [newGoal, setNewGoal] = useState({
    goal_type: 'weight_loss',
    target_value: 0,
    unit: 'kg',
    target_date: ''
  })

  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync(profileData)
      setIsEditingProfile(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleCreateGoal = async () => {
    if (!newGoal.target_value || !newGoal.target_date) {
      alert('Please fill in all goal fields')
      return
    }

    try {
      await createGoal.mutateAsync({
        goal_type: newGoal.goal_type,
        target_value: newGoal.target_value,
        current_value: 0,
        unit: newGoal.unit,
        start_date: new Date().toISOString().split('T')[0],
        target_date: newGoal.target_date,
        is_active: true,
        progress_percentage: 0
      })
      setShowCreateGoal(false)
      setNewGoal({
        goal_type: 'weight_loss',
        target_value: 0,
        unit: 'kg',
        target_date: ''
      })
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  const currentCalories = todaySummary?.total_calories || 0
  const currentProtein = todaySummary?.total_protein_g || 0
  const currentCarbs = todaySummary?.total_carbs_g || 0
  const currentFat = todaySummary?.total_fat_g || 0

  const calorieProgress = Math.min((currentCalories / profileData.daily_calorie_goal) * 100, 100)
  const proteinProgress = Math.min((currentProtein / profileData.daily_protein_goal) * 100, 100)
  const carbProgress = Math.min((currentCarbs / profileData.daily_carb_goal) * 100, 100)
  const fatProgress = Math.min((currentFat / profileData.daily_fat_goal) * 100, 100)

  if (isLoading) {
    return (
      <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 rounded" style={{backgroundColor: '#d4e1cb'}}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 rounded" style={{backgroundColor: '#d4e1cb'}}></div>
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
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold" style={{color: '#2e3d28'}}>
            Nutrition Goals 🎯
          </h1>
          <p className="text-lg" style={{color: '#5c564f'}}>
            Set and track your personal nutrition and health objectives
          </p>
        </div>

        {/* Daily Nutrition Goals */}
        <Card className="pastoral-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between" style={{color: '#2e3d28'}}>
              <span className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Daily Nutrition Targets
              </span>
              <Button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                variant="outline"
                size="sm"
                style={{
                  borderColor: '#d4e1cb',
                  color: '#2e3d28'
                }}
              >
                {isEditingProfile ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                {isEditingProfile ? 'Cancel' : 'Edit Goals'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditingProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{color: '#2e3d28'}}>Daily Calorie Goal</Label>
                  <Input
                    type="number"
                    value={profileData.daily_calorie_goal}
                    onChange={(e) => setProfileData({...profileData, daily_calorie_goal: parseInt(e.target.value) || 0})}
                    className="pastoral-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{color: '#2e3d28'}}>Daily Protein Goal (g)</Label>
                  <Input
                    type="number"
                    value={profileData.daily_protein_goal}
                    onChange={(e) => setProfileData({...profileData, daily_protein_goal: parseInt(e.target.value) || 0})}
                    className="pastoral-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{color: '#2e3d28'}}>Daily Carbs Goal (g)</Label>
                  <Input
                    type="number"
                    value={profileData.daily_carb_goal}
                    onChange={(e) => setProfileData({...profileData, daily_carb_goal: parseInt(e.target.value) || 0})}
                    className="pastoral-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{color: '#2e3d28'}}>Daily Fat Goal (g)</Label>
                  <Input
                    type="number"
                    value={profileData.daily_fat_goal}
                    onChange={(e) => setProfileData({...profileData, daily_fat_goal: parseInt(e.target.value) || 0})}
                    className="pastoral-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    onClick={handleSaveProfile}
                    className="pastoral-button"
                    disabled={updateProfile.isPending}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Goals
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Calories */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#2e3d28'}}>Calories</span>
                    <span className="text-sm" style={{color: '#5c564f'}}>
                      {Math.round(currentCalories)}/{profileData.daily_calorie_goal}
                    </span>
                  </div>
                  <Progress value={calorieProgress} className="h-3" />
                  <p className="text-xs" style={{color: '#5c564f'}}>
                    {profileData.daily_calorie_goal - currentCalories > 0
                      ? `${Math.round(profileData.daily_calorie_goal - currentCalories)} remaining`
                      : 'Goal achieved! 🎉'
                    }
                  </p>
                </div>

                {/* Protein */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#2e3d28'}}>Protein</span>
                    <span className="text-sm" style={{color: '#5c564f'}}>
                      {Math.round(currentProtein)}g/{profileData.daily_protein_goal}g
                    </span>
                  </div>
                  <Progress value={proteinProgress} className="h-3" />
                  <p className="text-xs" style={{color: '#5c564f'}}>
                    {profileData.daily_protein_goal - currentProtein > 0
                      ? `${Math.round(profileData.daily_protein_goal - currentProtein)}g remaining`
                      : 'Goal achieved! 💪'
                    }
                  </p>
                </div>

                {/* Carbs */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#2e3d28'}}>Carbs</span>
                    <span className="text-sm" style={{color: '#5c564f'}}>
                      {Math.round(currentCarbs)}g/{profileData.daily_carb_goal}g
                    </span>
                  </div>
                  <Progress value={carbProgress} className="h-3" />
                  <p className="text-xs" style={{color: '#5c564f'}}>
                    {profileData.daily_carb_goal - currentCarbs > 0
                      ? `${Math.round(profileData.daily_carb_goal - currentCarbs)}g remaining`
                      : 'Goal achieved! ⚡'
                    }
                  </p>
                </div>

                {/* Fat */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#2e3d28'}}>Fat</span>
                    <span className="text-sm" style={{color: '#5c564f'}}>
                      {Math.round(currentFat)}g/{profileData.daily_fat_goal}g
                    </span>
                  </div>
                  <Progress value={fatProgress} className="h-3" />
                  <p className="text-xs" style={{color: '#5c564f'}}>
                    {profileData.daily_fat_goal - currentFat > 0
                      ? `${Math.round(profileData.daily_fat_goal - currentFat)}g remaining`
                      : 'Goal achieved! 🥑'
                    }
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Long-term Goals */}
        <Card className="pastoral-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between" style={{color: '#2e3d28'}}>
              <span className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Long-term Goals
              </span>
              <Button
                onClick={() => setShowCreateGoal(true)}
                className="pastoral-button"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {goals?.length === 0 ? (
              <div className="text-center py-12">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#e9f0e4'}}
                >
                  <Target className="h-8 w-8" style={{color: '#6d8f54'}} />
                </div>
                <p style={{color: '#5c564f'}} className="mb-4">
                  No long-term goals set yet. Create your first goal to start tracking progress!
                </p>
                <Button
                  onClick={() => setShowCreateGoal(true)}
                  className="pastoral-button"
                >
                  Create First Goal
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals?.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl"
                    style={{backgroundColor: 'rgba(233, 240, 228, 0.3)'}}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium" style={{color: '#2e3d28'}}>
                          {goal.goal_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="text-sm" style={{color: '#5c564f'}}>
                          Target: {goal.target_value} {goal.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{color: '#6d8f54'}}>
                          {goal.progress_percentage || 0}%
                        </div>
                        <div className="text-xs" style={{color: '#5c564f'}}>Complete</div>
                      </div>
                    </div>
                    
                    <Progress value={goal.progress_percentage || 0} className="h-2 mb-3" />
                    
                    <div className="flex justify-between items-center text-xs" style={{color: '#5c564f'}}>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Started: {new Date(goal.start_date).toLocaleDateString()}
                      </span>
                      {goal.target_date && (
                        <span>
                          Target: {new Date(goal.target_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create Goal Modal */}
            {showCreateGoal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="pastoral-card w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between" style={{color: '#2e3d28'}}>
                      <span>Create New Goal</span>
                      <Button
                        onClick={() => setShowCreateGoal(false)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label style={{color: '#2e3d28'}}>Goal Type</Label>
                      <select
                        value={newGoal.goal_type}
                        onChange={(e) => setNewGoal({...newGoal, goal_type: e.target.value})}
                        className="pastoral-input w-full"
                      >
                        <option value="weight_loss">Weight Loss</option>
                        <option value="weight_gain">Weight Gain</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="body_fat_reduction">Body Fat Reduction</option>
                        <option value="fitness_improvement">Fitness Improvement</option>
                        <option value="habit_building">Habit Building</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label style={{color: '#2e3d28'}}>Target Value</Label>
                        <Input
                          type="number"
                          value={newGoal.target_value}
                          onChange={(e) => setNewGoal({...newGoal, target_value: parseFloat(e.target.value) || 0})}
                          className="pastoral-input"
                          placeholder="0"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label style={{color: '#2e3d28'}}>Unit</Label>
                        <select
                          value={newGoal.unit}
                          onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                          className="pastoral-input w-full"
                        >
                          <option value="kg">kg</option>
                          <option value="lbs">lbs</option>
                          <option value="%">%</option>
                          <option value="days">days</option>
                          <option value="weeks">weeks</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label style={{color: '#2e3d28'}}>Target Date</Label>
                      <Input
                        type="date"
                        value={newGoal.target_date}
                        onChange={(e) => setNewGoal({...newGoal, target_date: e.target.value})}
                        className="pastoral-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button
                        onClick={() => setShowCreateGoal(false)}
                        variant="outline"
                        className="flex-1"
                        style={{
                          borderColor: '#d4e1cb',
                          color: '#2e3d28'
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateGoal}
                        className="pastoral-button flex-1"
                        disabled={createGoal.isPending}
                      >
                        Create Goal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}