import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile-ionic',
  webDir: 'dist',
  bundledWebRuntime: false,
  server : {
    "url" : "http://localhost:5173/"  //<= use address the server is running on locally
  }
};

export default config;
