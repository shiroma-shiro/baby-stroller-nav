import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // ← 同一WiFiのスマホからアクセス可能にする
    port: 5173,
  },
})
