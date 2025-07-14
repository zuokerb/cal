import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tfaiqzvtojywtnywvvue.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYWlxenZ0b2p5d3RueXd2dnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTczNjcsImV4cCI6MjA2Nzg5MzM2N30.oUC1tGP9zWVTXGYWLyUfL6i0I_B6ab1l07SW-bYEzAI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  user_id: string
  email?: string
  full_name?: string
  age?: number
  gender?: string
  height_cm?: number
  weight_kg?: number
  activity_level?: string
  daily_calorie_goal?: number
  daily_protein_goal?: number
  daily_carb_goal?: number
  daily_fat_goal?: number
  created_at: string
  updated_at: string
}

export interface FoodEntry {
  id: string
  user_id: string
  image_url?: string
  food_name: string
  description?: string
  calories: number
  protein_g?: number
  carbs_g?: number
  fat_g?: number
  fiber_g?: number
  sugar_g?: number
  sodium_mg?: number
  serving_size?: string
  meal_type?: string
  confidence_score?: number
  analyzed_at: string
  created_at: string
}

export interface DailySummary {
  id: string
  user_id: string
  date: string
  total_calories?: number
  total_protein_g?: number
  total_carbs_g?: number
  total_fat_g?: number
  total_fiber_g?: number
  total_sugar_g?: number
  total_sodium_mg?: number
  meals_logged?: number
  goal_calories_met?: boolean
  goal_protein_met?: boolean
  goal_carbs_met?: boolean
  goal_fat_met?: boolean
  created_at: string
  updated_at: string
}

export interface NutritionInsight {
  id: string
  user_id: string
  insight_type: string
  title: string
  description: string
  recommendation?: string
  priority_level?: string
  is_read?: boolean
  expires_at?: string
  created_at: string
}

export interface UserGoal {
  id: string
  user_id: string
  goal_type: string
  target_value: number
  current_value?: number
  unit: string
  start_date: string
  target_date?: string
  is_active?: boolean
  progress_percentage?: number
  created_at: string
  updated_at: string
}

// Food analysis types from Gemini API
export interface FoodAnalysisResult {
  foods: {
    name: string
    description: string
    serving_size: string
    calories: number
    protein_g: number
    carbs_g: number
    fat_g: number
    fiber_g: number
    sugar_g: number
    sodium_mg: number
    confidence: number
  }[]
  total_nutrition: {
    total_calories: number
    total_protein_g: number
    total_carbs_g: number
    total_fat_g: number
    total_fiber_g: number
    total_sugar_g: number
    total_sodium_mg: number
  }
  meal_analysis: {
    overall_healthiness: string
    meal_type: string
    recommendations: string
  }
}