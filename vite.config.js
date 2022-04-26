import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@scss': path.resolve(__dirname, './src/assets/'),
      '@comps': path.resolve(__dirname, './src/components/'),
    }
  }
})
