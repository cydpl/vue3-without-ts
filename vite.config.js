import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true,//监听所有地址
    port:8080,
    proxy:{
      '/api':{
        target: 'http://localhost',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,''),
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.json'] // 导入时想要省略的扩展名列表
  },
})
