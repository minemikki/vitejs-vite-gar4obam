import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

// Builds the whole app into ONE self-contained index.html (all JS/CSS inlined),
// with hash routing so it runs from any host path. Used to preview the app as
// a Claude Artifact when a normal deployment isn't available.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  define: { 'import.meta.env.VITE_HASH_ROUTER': JSON.stringify('1') },
  build: {
    outDir: 'dist-single',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
})
