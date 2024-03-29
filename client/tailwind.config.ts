import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-overlay': "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"
      },
      colors: {
        'light-white': 'rgba(255, 255, 255, 0.1)',
        'gradient': 'radial-gradient(#800080, #FFC0CB)'
      },
      textColor: {
        'gradient': 'radial-gradient(#800080, #FFC0CB)'
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      }
    },
  },
  plugins: [],
}
export default config
