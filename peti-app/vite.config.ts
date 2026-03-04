import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/NexaCrux_Agent_Deployment_v5/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
