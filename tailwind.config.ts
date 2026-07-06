import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
  		colors: {
  			background: '#0A0A0A',
  			foreground: '#F5F5F5',
  			card: {
  				DEFAULT: '#111111',
  				foreground: '#F5F5F5'
  			},
  			popover: {
  				DEFAULT: '#111111',
  				foreground: '#F5F5F5'
  			},
  			primary: {
  				DEFAULT: '#F5F5F5',
  				foreground: '#0A0A0A'
  			},
  			secondary: {
  				DEFAULT: '#1A1A1A',
  				foreground: '#8A8A8A'
  			},
  			muted: {
  				DEFAULT: '#1A1A1A',
  				foreground: '#8A8A8A'
  			},
  			accent: {
  				DEFAULT: '#222222',
  				foreground: '#F5F5F5'
  			},
  			destructive: {
  				DEFAULT: '#FF3333',
  				foreground: '#F5F5F5'
  			},
  			border: '#222222',
  			input: '#222222',
  			ring: '#8A8A8A',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
