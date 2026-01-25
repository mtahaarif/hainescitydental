/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dental-blue': {
          50: '#f0f9ff',
          100: '#e6f6ff',
          200: '#bfe9ff',
          300: '#87d8ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#0d5490',
          900: '#08385a'
        },
        'medikan-accent': '#187ec2',
        'medikan-cta': '#492012',
        'medikan-bg-start': '#f3f8fb',
        'medikan-bg-end': '#eef6fb'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'medikan-glow': '0 10px 40px rgba(14,165,233,0.12)'
      },
      borderRadius: {
        '3xl': '1.5rem'
      }
    }
  },
  plugins: []
}
