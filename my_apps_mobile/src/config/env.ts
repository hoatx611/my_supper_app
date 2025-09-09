export const ENV = {
  // API Configuration
  API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.production.com',
  API_TIMEOUT: 10000,
  
  // App Configuration
  APP_NAME: 'My Super App',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_OTA_UPDATES: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  
  // Storage Keys
  STORAGE_KEYS: {
    USER_TOKEN: 'user_token',
    USER_DATA: 'user_data',
    APP_SETTINGS: 'app_settings',
  },
  
  // Debug Configuration
  DEBUG_MODE: __DEV__,
  LOG_LEVEL: __DEV__ ? 'debug' : 'error',
} as const;

export type EnvConfig = typeof ENV;
