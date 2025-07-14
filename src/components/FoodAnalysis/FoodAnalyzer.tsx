import React, { useState, useCallback, useRef } from 'react'
import { Camera, Upload, Loader2, CheckCircle, AlertCircle, Image } from 'lucide-react'
import { useFoodAnalysis } from '@/hooks/useFoodAnalysis'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FoodAnalysisResult } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface FoodAnalyzerProps {
  onNavigate: (page: string) => void
}

export function FoodAnalyzer({ onNavigate }: FoodAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null)
  const [step, setStep] = useState<'select' | 'analyzing' | 'results'>('select')
  const [isSaving, setIsSaving] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  
  const { uploadImage, analyzeFoodFromFile, saveFoodEntry, isLoading } = useFoodAnalysis()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, PNG, or WebP)')
      return false
    }

    if (file.size > maxSize) {
      toast.error('Image file size must be less than 10MB')
      return false
    }

    return true
  }

  const handleFileSelect = useCallback((file: File) => {
    if (!validateFile(file)) return

    // Clean up previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setStep('select')
    setAnalysisResult(null)
    toast.success('Image selected successfully!')
  }, [previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
    // Reset input to allow selecting the same file again
    event.target.value = ''
  }

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first')
      return
    }

    setStep('analyzing')
    try {
      const result = await analyzeFoodFromFile.mutateAsync(selectedFile)
      setAnalysisResult(result)
      setStep('results')
    } catch (error) {
      setStep('select')
      toast.error('Failed to analyze food. Please try again.')
    }
  }

  const handleSave = async () => {
    if (!selectedFile || !analysisResult) {
      toast.error('Missing data to save food entry')
      return
    }

    setIsSaving(true)
    
    try {
      toast.loading('Uploading image...', { id: 'save-process' })
      const imageUrl = await uploadImage.mutateAsync(selectedFile)
      
      toast.loading('Saving food entry...', { id: 'save-process' })
      await saveFoodEntry.mutateAsync({
        imageUrl,
        nutritionData: analysisResult
      })
      
      toast.success('Food entry saved successfully!', { id: 'save-process' })
      
      setTimeout(() => {
        onNavigate('dashboard')
      }, 1000)
      
    } catch (error) {
      toast.error('Failed to save food entry. Please try again.', { id: 'save-process' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleStartOver = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysisResult(null)
    setStep('select')
  }, [previewUrl])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="min-h-screen p-4" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-pastoral-moss-800">
            AI Food Analysis 🍎
          </h1>
          <p className="text-lg text-pastoral-muted-600">
            Take a photo of your food and get instant nutritional insights
          </p>
        </div>

        {step === 'select' && (
          <Card className="pastoral-card">
            <CardHeader>
              <CardTitle className="text-center text-pastoral-moss-800">
                Upload Your Food Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Upload food image"
              />
              
              {/* File Upload Area */}
              <div 
                className={`
                  relative border-2 border-dashed rounded-2xl p-8 text-center 
                  transition-all duration-300 cursor-pointer group
                  ${isDragOver 
                    ? 'border-green-400 bg-green-50 scale-[1.02]' 
                    : 'border-pastoral-sage-300 hover:border-pastoral-moss-400'
                  }
                  ${previewUrl ? 'bg-white' : 'bg-gradient-to-br from-pastoral-sage-25 to-pastoral-cream-25'}
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onClick={triggerFileSelect}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    triggerFileSelect()
                  }
                }}
                aria-label="Upload area for food images"
              >
                {previewUrl ? (
                  <div className="space-y-6">
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Selected food"
                        className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="bg-white/90 hover:bg-white text-pastoral-moss-800"
                            onClick={(e) => {
                              e.stopPropagation()
                              triggerFileSelect()
                            }}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation()
                          triggerFileSelect()
                        }}
                        className="border-pastoral-sage-300 text-pastoral-moss-700 hover:bg-pastoral-sage-50"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Different Photo
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAnalyze()
                        }}
                        className="pastoral-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Camera className="mr-2 h-4 w-4" />
                        )}
                        Analyze Food
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-pastoral-sage-100 flex items-center justify-center group-hover:bg-pastoral-moss-100 transition-colors duration-200">
                        <Image className="h-10 w-10 text-pastoral-moss-600" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-pastoral-moss-800">
                          {isDragOver ? 'Drop your image here' : 'Select your food image'}
                        </h3>
                        <p className="text-sm text-pastoral-muted-600">
                          Drag and drop or click to browse
                        </p>
                        <p className="text-xs text-pastoral-muted-500">
                          Supports JPG, PNG, WebP • Max 10MB
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        triggerFileSelect()
                      }}
                      className="pastoral-button"
                      size="lg"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Choose Image
                    </Button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-pastoral-sage-50 rounded-xl p-4 border border-pastoral-sage-100">
                <h3 className="font-semibold text-pastoral-moss-800 mb-3 flex items-center">
                  <Camera className="mr-2 h-4 w-4" />
                  Photography Tips
                </h3>
                <ul className="text-sm text-pastoral-muted-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-pastoral-moss-500 mr-2">•</span>
                    Ensure good lighting and clear view of the food
                  </li>
                  <li className="flex items-start">
                    <span className="text-pastoral-moss-500 mr-2">•</span>
                    Include the entire meal or portion in the frame
                  </li>
                  <li className="flex items-start">
                    <span className="text-pastoral-moss-500 mr-2">•</span>
                    Take the photo from above for better portion estimation
                  </li>
                  <li className="flex items-start">
                    <span className="text-pastoral-moss-500 mr-2">•</span>
                    Avoid blurry or heavily filtered images
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'analyzing' && (
          <Card className="pastoral-card">
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-pastoral-sage-100 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="h-10 w-10 text-pastoral-sage-500 animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-2">
                    Analyzing Your Food...
                  </h3>
                  <p className="text-pastoral-muted-600">
                    Our AI is identifying ingredients and calculating nutrition facts
                  </p>
                </div>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Analyzing"
                    className="max-w-sm max-h-32 mx-auto rounded-lg opacity-75"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'results' && analysisResult && (
          <div className="space-y-6">
            {/* Analysis Results */}
            <Card className="pastoral-card">
              <CardHeader>
                <CardTitle className="flex items-center text-pastoral-moss-800">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Analysis Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image and Overall Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Analyzed food"
                        className="w-full rounded-lg shadow-lg"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-pastoral-moss-800 mb-2">
                        Meal Analysis
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-pastoral-muted-600">Meal Type:</span>
                          <Badge variant="secondary" className="bg-pastoral-sage-100 text-pastoral-moss-700">
                            {analysisResult.meal_analysis.meal_type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-pastoral-muted-600">Health Score:</span>
                          <Badge variant="secondary" className="bg-pastoral-cream-100 text-pastoral-earth-700">
                            {analysisResult.meal_analysis.overall_healthiness}/10
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {analysisResult.meal_analysis.recommendations && (
                      <div className="bg-pastoral-sage-50 rounded-lg p-4">
                        <h4 className="font-medium text-pastoral-moss-800 mb-2 flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Recommendations
                        </h4>
                        <p className="text-sm text-pastoral-muted-700">
                          {analysisResult.meal_analysis.recommendations}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nutrition Facts */}
                <div>
                  <h3 className="text-lg font-display font-bold text-pastoral-moss-800 mb-4">
                    Total Nutrition Facts
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-pastoral-sage-50 rounded-lg">
                      <div className="text-2xl font-bold text-pastoral-moss-800">
                        {Math.round(analysisResult.total_nutrition.total_calories)}
                      </div>
                      <div className="text-sm text-pastoral-muted-600">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-pastoral-cream-50 rounded-lg">
                      <div className="text-2xl font-bold text-pastoral-earth-800">
                        {Math.round(analysisResult.total_nutrition.total_protein_g)}g
                      </div>
                      <div className="text-sm text-pastoral-muted-600">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-pastoral-moss-50 rounded-lg">
                      <div className="text-2xl font-bold text-pastoral-moss-800">
                        {Math.round(analysisResult.total_nutrition.total_carbs_g)}g
                      </div>
                      <div className="text-sm text-pastoral-muted-600">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-pastoral-sage-50 rounded-lg">
                      <div className="text-2xl font-bold text-pastoral-sage-800">
                        {Math.round(analysisResult.total_nutrition.total_fat_g)}g
                      </div>
                      <div className="text-sm text-pastoral-muted-600">Fat</div>
                    </div>
                  </div>
                </div>

                {/* Individual Foods */}
                <div>
                  <h3 className="text-lg font-display font-bold text-pastoral-moss-800 mb-4">
                    Identified Foods
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.foods.map((food, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-pastoral-sage-200"
                      >
                        <div>
                          <h4 className="font-medium text-pastoral-moss-800">{food.name}</h4>
                          <p className="text-sm text-pastoral-muted-600">{food.description}</p>
                          <p className="text-xs text-pastoral-muted-500">Serving: {food.serving_size}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-pastoral-moss-800">
                            {Math.round(food.calories)} cal
                          </div>
                          <div className="text-xs text-pastoral-muted-600">
                            {Math.round(food.confidence * 100)}% confidence
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 pt-6">
                  <Button
                    onClick={handleStartOver}
                    variant="outline"
                    className="border-pastoral-sage-200 text-pastoral-moss-700 hover:bg-pastoral-sage-50"
                  >
                    Analyze Another
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="pastoral-button"
                    disabled={isLoading || isSaving}
                  >
                    {(isLoading || isSaving) ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    {isSaving ? 'Saving...' : 'Save to Journal'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}