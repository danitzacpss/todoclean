import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // Base public path
  base: './',
  
  // Build configuration
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    
    // Asset optimization
    assetsInlineLimit: 4096,
    
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      
      output: {
        // Chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['./src/components/ui'],
          utils: ['./src/utils']
        },
        
        // Asset naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash].[ext]'
          }
          
          if (/\.(png|jpe?g|webp|gif|svg|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]'
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]'
          }
          
          return 'assets/[name]-[hash].[ext]'
        }
      }
    },
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";'
      }
    },
    
    // PostCSS config is loaded from postcss.config.js
    postcss: './postcss.config.js',
    
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  
  // Development server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    
    // Proxy for API calls during development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // Preview server (for production build testing)
  preview: {
    port: 4173,
    host: true,
    cors: true,
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@design-system': resolve(__dirname, 'design-system'),
    }
  },
  
  // Plugin configuration
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Todo Clean Chillán',
        short_name: 'Todo Clean',
        description: 'Servicios profesionales de limpieza en Chillán',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // Define global variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  
  // Environment variables
  envPrefix: 'TODOCLEAN_',
  
  // Optimization for dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
    ],
    exclude: [
      // Large libraries that should not be pre-bundled
    ]
  },
  
  // ESBuild options
  esbuild: {
    target: 'es2020',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Worker configuration
  worker: {
    format: 'es',
    plugins: []
  }
});