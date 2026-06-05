import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // On GitHub Actions, CI=true is set automatically.
  // This sets the correct base path for GitHub Pages subdirectory hosting.
  // If you ever move to a custom domain (root), change this to '/'.
  base: process.env.CI ? '/runway-and-smooth/' : '/',
})
