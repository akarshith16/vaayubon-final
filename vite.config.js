import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile({
      useRecommendedBuildConfig: false
    })
  ],
  base: './',
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 10000000,
    rollupOptions: {
      output: {
        codeSplitting: false,
        assetFileNames: '[name]-[hash].[ext]',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js'
      }
    }
  }
})
