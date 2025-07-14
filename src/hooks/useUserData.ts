import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, UserProfile, FoodEntry, DailySummary, UserGoal } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-hot-toast'

export function useUserData() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Get user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user) return null

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    },
    enabled: !!user
  })

  // Get today's summary
  const { data: todaySummary, isLoading: summaryLoading } = useQuery({
    queryKey: ['dailySummary', user?.id, new Date().toISOString().split('T')[0]],
    queryFn: async (): Promise<DailySummary | null> => {
      if (!user) return null

      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('daily_summaries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    },
    enabled: !!user
  })

  // Get recent food entries
  const { data: recentEntries, isLoading: entriesLoading } = useQuery({
    queryKey: ['foodEntries', user?.id],
    queryFn: async (): Promise<FoodEntry[]> => {
      if (!user) return []

      const { data, error } = await supabase
        .from('food_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return data || []
    },
    enabled: !!user
  })

  // Get user goals
  const { data: goals, isLoading: goalsLoading } = useQuery({
    queryKey: ['userGoals', user?.id],
    queryFn: async (): Promise<UserGoal[]> => {
      if (!user) return []

      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    },
    enabled: !!user
  })

  // Create or update profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      if (!user) throw new Error('User not logged in')

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          ...profileData
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile')
    }
  })

  // Create goal
  const createGoalMutation = useMutation({
    mutationFn: async (goalData: Omit<UserGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not logged in')

      const { data, error } = await supabase
        .from('user_goals')
        .insert({
          user_id: user.id,
          ...goalData
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGoals', user?.id] })
      toast.success('Goal created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create goal')
    }
  })

  return {
    profile,
    todaySummary,
    recentEntries,
    goals,
    isLoading: profileLoading || summaryLoading || entriesLoading || goalsLoading,
    updateProfile: updateProfileMutation,
    createGoal: createGoalMutation
  }
}