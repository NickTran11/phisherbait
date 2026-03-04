import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'frontpage.html',
        authSelection: 'auth-selection.html',
        dashboard: 'dashboard.html',
        login: 'login.html',
        signup: 'signup.html'
      }
    }
  }
});
