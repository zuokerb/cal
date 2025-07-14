import React, { useState } from 'react'
import { Search, Calendar, Filter, TrendingUp, Clock, Image } from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FoodEntry } from '@/lib/supabase'

interface FoodHistoryProps {
  onNavigate: (page: string) => void
}

export function FoodHistory({ onNavigate }: FoodHistoryProps) {
  const { recentEntries, isLoading } = useUserData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterMeal, setFilterMeal] = useState('')

  // Filter entries based on search and filters
  const filteredEntries = recentEntries?.filter((entry: FoodEntry) => {
    const matchesSearch = entry.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = !filterDate || entry.created_at.startsWith(filterDate)
    const matchesMeal = !filterMeal || entry.meal_type === filterMeal
    
    return matchesSearch && matchesDate && matchesMeal
  }) || []

  // Calculate total stats for filtered entries
  const totalStats = filteredEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + (entry.protein_g || 0),
      carbs: acc.carbs + (entry.carbs_g || 0),
      fat: acc.fat + (entry.fat_g || 0),
      count: acc.count + 1
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 }
  )

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '🌅'
      case 'lunch': return '☀️'
      case 'dinner': return '🌙'
      case 'snack': return '🍎'
      default: return '🍽️'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 rounded" style={{backgroundColor: '#d4e1cb'}}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
            Food History 📊
          </h1>
          <p className="text-lg" style={{color: '#5c564f'}}>
            Track your nutrition journey and analyze your eating patterns
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="pastoral-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4" style={{color: '#5c564f'}} />
                <Input
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pastoral-input"
                />
              </div>
              
              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4" style={{color: '#5c564f'}} />
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pastoral-input"
                />
              </div>
              
              {/* Meal Filter */}
              <select
                value={filterMeal}
                onChange={(e) => setFilterMeal(e.target.value)}
                className="pastoral-input"
              >
                <option value="">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="other">Other</option>
              </select>
              
              {/* Clear Filters */}
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setFilterDate('')
                  setFilterMeal('')
                }}
                variant="outline"
                style={{
                  borderColor: '#d4e1cb',
                  color: '#2e3d28'
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="pastoral-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{color: '#2e3d28'}}>
                {totalStats.count}
              </div>
              <div className="text-sm" style={{color: '#5c564f'}}>Entries Found</div>
            </CardContent>
          </Card>
          
          <Card className="pastoral-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{color: '#6d8f54'}}>
                {Math.round(totalStats.calories)}
              </div>
              <div className="text-sm" style={{color: '#5c564f'}}>Total Calories</div>
            </CardContent>
          </Card>
          
          <Card className="pastoral-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{color: '#678250'}}>
                {Math.round(totalStats.protein)}g
              </div>
              <div className="text-sm" style={{color: '#5c564f'}}>Total Protein</div>
            </CardContent>
          </Card>
          
          <Card className="pastoral-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{color: '#a8825c'}}>
                {Math.round(totalStats.carbs)}g
              </div>
              <div className="text-sm" style={{color: '#5c564f'}}>Total Carbs</div>
            </CardContent>
          </Card>
          
          <Card className="pastoral-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{color: '#ecb074'}}>
                {Math.round(totalStats.fat)}g
              </div>
              <div className="text-sm" style={{color: '#5c564f'}}>Total Fat</div>
            </CardContent>
          </Card>
        </div>

        {/* Food Entries List */}
        <Card className="pastoral-card">
          <CardHeader>
            <CardTitle className="flex items-center" style={{color: '#2e3d28'}}>
              <TrendingUp className="mr-2 h-5 w-5" />
              Food Entries
              {searchTerm || filterDate || filterMeal ? (
                <span className="text-sm font-normal ml-2" style={{color: '#5c564f'}}>({filteredEntries.length} results)</span>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{backgroundColor: '#e9f0e4'}}
                >
                  <Image className="h-8 w-8" style={{color: '#6d8f54'}} />
                </div>
                <p style={{color: '#5c564f'}} className="mb-4">
                  {recentEntries?.length === 0 
                    ? 'No food entries yet. Start tracking your nutrition!' 
                    : 'No entries match your current filters.'}
                </p>
                <Button
                  onClick={() => onNavigate('analyze')}
                  className="pastoral-button"
                >
                  Analyze Food Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center space-x-4 p-4 rounded-xl transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: 'rgba(233, 240, 228, 0.3)'
                    }}
                  >
                    {/* Image */}
                    <div className="flex-shrink-0">
                      {entry.image_url ? (
                        <img
                          src={entry.image_url}
                          alt={entry.food_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center"
                          style={{backgroundColor: '#e9f0e4'}}
                        >
                          <Image className="h-8 w-8" style={{color: '#6d8f54'}} />
                        </div>
                      )}
                    </div>
                    
                    {/* Food Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium" style={{color: '#2e3d28'}}>
                          {entry.food_name}
                        </h4>
                        <span className="text-lg">
                          {getMealIcon(entry.meal_type || 'other')}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-sm mb-2" style={{color: '#5c564f'}}>
                          {entry.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-xs" style={{color: '#92877b'}}>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDate(entry.created_at)}
                        </span>
                        <span>Serving: {entry.serving_size || '1 serving'}</span>
                        {entry.confidence_score && (
                          <span>Confidence: {Math.round(entry.confidence_score * 100)}%</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Nutrition Info */}
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold" style={{color: '#2e3d28'}}>
                        {Math.round(entry.calories)} cal
                      </div>
                      <div className="text-xs space-y-0.5" style={{color: '#5c564f'}}>
                        <div>P: {Math.round(entry.protein_g || 0)}g</div>
                        <div>C: {Math.round(entry.carbs_g || 0)}g</div>
                        <div>F: {Math.round(entry.fat_g || 0)}g</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}