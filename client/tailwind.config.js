/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'main-color': '#3F3F3F',
  			'secondary-color': '#5C89E0',
  			'light-bg': 'rgba(248,248,248,0.05)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontFamily: {
  		inter: ["Inter", "serif"]
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
