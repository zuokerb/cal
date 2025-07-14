import { useMutation } from '@tanstack/react-query'
import { supabase, FoodAnalysisResult } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-hot-toast'

export function useFoodAnalysis() {
  const { user } = useAuth()

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      if (!user) throw new Error('User not logged in')

      // Convert file to base64
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = async () => {
          try {
            const base64Data = reader.result as string

            // Use Edge Function to upload image
            const { data, error } = await supabase.functions.invoke('upload-food-image', {
              body: {
                imageData: base64Data,
                fileName: `${Date.now()}-${file.name}`,
                userId: user.id
              }
            })

            if (error) throw error
            resolve(data.data.publicUrl)
          } catch (err) {
            reject(err)
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Image upload failed')
    }
  })

  const analyzeImageMutation = useMutation({
    mutationFn: async (imageData: string): Promise<FoodAnalysisResult> => {
      if (!user) throw new Error('User not logged in')

      const { data, error } = await supabase.functions.invoke('analyze-food-image', {
        body: {
          imageData,
          userId: user.id
        }
      })

      if (error) throw error
      return data.data
    },
    onError: (error: any) => {
      toast.error(error.message || 'Food analysis failed')
    }
  })

  const saveFoodEntryMutation = useMutation({
    mutationFn: async ({
      imageUrl,
      nutritionData
    }: {
      imageUrl?: string
      nutritionData: FoodAnalysisResult
    }) => {
      if (!user) throw new Error('User not logged in')

      const { data, error } = await supabase.functions.invoke('save-food-entry', {
        body: {
          userId: user.id,
          imageUrl,
          nutritionData
        }
      })

      if (error) {
        throw new Error(error.message || 'Failed to save food entry')
      }
      
      if (!data?.data) {
        throw new Error('Invalid response from server')
      }
      
      return data.data
    }
  })

  const analyzeFoodFromFile = useMutation({
    mutationFn: async (file: File) => {
      if (!user) throw new Error('User not logged in')

      // Convert file to base64
      return new Promise<FoodAnalysisResult>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = async () => {
          try {
            const base64Data = reader.result as string

            // Analyze the image
            const analysisResult = await analyzeImageMutation.mutateAsync(base64Data)
            resolve(analysisResult)
          } catch (err) {
            reject(err)
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    onSuccess: () => {
      toast.success('Food analysis complete!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Food analysis failed')
    }
  })

  return {
    uploadImage: uploadImageMutation,
    analyzeImage: analyzeImageMutation,
    saveFoodEntry: saveFoodEntryMutation,
    analyzeFoodFromFile,
    isLoading: uploadImageMutation.isPending || analyzeImageMutation.isPending || saveFoodEntryMutation.isPending
  }
}