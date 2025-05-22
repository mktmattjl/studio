
import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      // Ensure .font-pixel uses the --font-pixelify-sans CSS variable
      pixel: ['var(--font-pixelify-sans)', ...defaultTheme.fontFamily.mono],
    },
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
          'border-highlight': 'hsl(var(--card-border-highlight))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
        'gold-accent': 'hsl(var(--gold-accent))',
        'xp-bar-color': 'hsl(var(--xp-bar-color))',
        'parchment-bg': 'hsl(var(--parchment-bg))',
        'parchment-text': 'hsl(var(--parchment-text))',
        'text-accent-thematic': 'hsl(var(--text-accent-thematic))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
        'input-foreground': 'hsl(var(--input-foreground))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'var(--radius)',
  			sm: 'calc(var(--radius) - 2px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'pulse-correct': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0px hsl(var(--secondary) / 0.4)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 10px 2px hsl(var(--secondary) / 0.5)' },
        },
        'glow-card-correct': {
          '0%, 100%': { borderColor: 'hsl(var(--border))', boxShadow: 'none' },
          '50%': { borderColor: 'hsl(var(--secondary))', boxShadow: '0 0 15px hsl(var(--secondary) / 0.3)' },
        },
        'coin-bonus-animation': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.8)' },
          '20%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '80%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.1)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'button-correct-pulse': 'pulse-correct 0.6s ease-in-out',
        'card-correct-glow': 'glow-card-correct 0.8s ease-in-out',
        'coin-bonus-animate': 'coin-bonus-animation 1.5s ease-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
