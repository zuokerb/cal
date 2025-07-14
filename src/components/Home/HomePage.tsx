import React from 'react'
import { Camera, TrendingUp, Target, Shield, Zap, Heart, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden" style={{background: 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)'}}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/leaves-pattern.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight" style={{color: '#2e3d28'}}>
                  Track Nutrition
                  <span style={{color: '#6d8f54'}}> Naturally</span>
                </h1>
                <p className="text-xl leading-relaxed" style={{color: '#5c564f'}}>
                  Transform your relationship with food using AI-powered nutrition tracking. 
                  Simply snap a photo and let our intelligent system guide your wellness journey.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate('signup')}
                  className="pastoral-button text-lg px-8 py-4 h-auto"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Tracking Now
                </Button>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-pastoral-moss-600 text-pastoral-moss-800 hover:bg-pastoral-moss-50 font-semibold"
                >
                  Sign In
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pastoral-moss-800">98%</div>
                  <div className="text-sm text-pastoral-muted-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pastoral-moss-800">5s</div>
                  <div className="text-sm text-pastoral-muted-600">Analysis Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pastoral-moss-800">1000+</div>
                  <div className="text-sm text-pastoral-muted-600">Food Categories</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/food-hero.jpg"
                  alt="Healthy food photography"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pastoral-sage-200 rounded-full opacity-60 float-animation"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pastoral-cream-200 rounded-full opacity-60 float-animation" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-pastoral-moss-800 mb-4">
              Intelligent Nutrition Made Simple
            </h2>
            <p className="text-lg text-pastoral-muted-600 max-w-3xl mx-auto">
              Experience the future of nutrition tracking with our AI-powered platform that understands your food as well as you do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-sage-200 transition-colors">
                  <Camera className="h-8 w-8 text-pastoral-sage-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Instant Food Recognition
                </h3>
                <p className="text-pastoral-muted-600">
                  Snap a photo and get detailed nutritional analysis in seconds. Our AI recognizes thousands of foods and dishes.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-cream-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-pastoral-earth-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Smart Progress Tracking
                </h3>
                <p className="text-pastoral-muted-600">
                  Visualize your nutrition journey with beautiful charts and personalized insights that adapt to your goals.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-moss-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-moss-200 transition-colors">
                  <Target className="h-8 w-8 text-pastoral-moss-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Personalized Goals
                </h3>
                <p className="text-pastoral-muted-600">
                  Set custom nutrition targets and receive AI-powered recommendations tailored to your lifestyle and preferences.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-sage-200 transition-colors">
                  <Shield className="h-8 w-8 text-pastoral-sage-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Privacy First
                </h3>
                <p className="text-pastoral-muted-600">
                  Your data stays secure with enterprise-grade encryption and complete control over your personal information.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 5 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-cream-200 transition-colors">
                  <Zap className="h-8 w-8 text-pastoral-earth-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-pastoral-muted-600">
                  Get instant results with our optimized AI engine that processes your food photos in under 5 seconds.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 6 */}
            <Card className="pastoral-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pastoral-moss-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pastoral-moss-200 transition-colors">
                  <Heart className="h-8 w-8 text-pastoral-moss-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-pastoral-moss-800 mb-3">
                  Wellness Focused
                </h3>
                <p className="text-pastoral-muted-600">
                  More than just counting calories - understand your nutrition for better health and sustainable habits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/healthy-meal.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-pastoral-moss-900/80"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="text-xl text-pastoral-cream-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've already discovered the power of AI-driven nutrition tracking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-white text-pastoral-moss-800 hover:bg-pastoral-cream-50 text-lg px-8 py-4 h-auto font-medium shadow-lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button
              onClick={() => onNavigate('login')}
              variant="secondary"
              className="text-lg px-8 py-4 h-auto bg-white text-pastoral-moss-800 hover:bg-pastoral-cream-50 hover:text-pastoral-moss-900 font-semibold shadow-lg border-2 border-white transition-all duration-300"
            >
              Already a Member?
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pastoral-moss-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-pastoral-sage-500 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold">Cal AI</span>
            </div>
            <p className="text-pastoral-cream-200 mb-4">
              Natural nutrition tracking powered by artificial intelligence
            </p>
            <p className="text-sm text-pastoral-cream-300">
              © 2025 Cal AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}