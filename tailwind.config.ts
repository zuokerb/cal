import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pastoral color palette - soft, earthy, natural tones
        'pastoral-sage': {
          50: '#f6f8f4',
          100: '#e9f0e4',
          200: '#d4e1cb',
          300: '#b3caa4',
          400: '#8dac77',
          500: '#6d8f54',
          600: '#547040',
          700: '#425936',
          800: '#36472e',
          900: '#2e3d28',
        },
        'pastoral-moss': {
          50: '#f4f6f2',
          100: '#e6ebe1',
          200: '#ced8c4',
          300: '#adbf9e',
          400: '#85a070',
          500: '#678250',
          600: '#50653e',
          700: '#405134',
          800: '#35422b',
          900: '#2d3825',
        },
        'pastoral-cream': {
          50: '#fefcf9',
          100: '#fdf7f0',
          200: '#fbeee0',
          300: '#f7dfc5',
          400: '#f2ca9e',
          500: '#ecb074',
          600: '#e49654',
          700: '#d07d3c',
          800: '#ad6532',
          900: '#8b522c',
        },
        'pastoral-earth': {
          50: '#f9f7f4',
          100: '#f1ebe2',
          200: '#e3d6c4',
          300: '#d1bc9e',
          400: '#bc9d76',
          500: '#a8825c',
          600: '#957050',
          700: '#7d5d44',
          800: '#664d3b',
          900: '#544032',
        },
        'pastoral-muted': {
          50: '#f8f8f7',
          100: '#efeeec',
          200: '#dddbd6',
          300: '#c4c0b8',
          400: '#a8a196',
          500: '#92877b',
          600: '#847970',
          700: '#6f675e',
          800: '#5c564f',
          900: '#4c4843',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'pastoral-gradient': 'linear-gradient(135deg, #f6f8f4 0%, #e9f0e4 50%, #d4e1cb 100%)',
        'cream-gradient': 'linear-gradient(135deg, #fefcf9 0%, #fdf7f0 50%, #fbeee0 100%)',
        'sage-gradient': 'linear-gradient(135deg, #e9f0e4 0%, #d4e1cb 50%, #b3caa4 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config