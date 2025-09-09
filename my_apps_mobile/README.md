# My Super App - React Native

A modular super app with mini app architecture built with React Native.

## 🏗️ Architecture

This app follows a modular architecture where each feature is organized as a mini app (container) with its own screens, components, services, and hooks.

### 📁 Project Structure

```
my_apps_mobile/
├── src/
│   ├── core/                # Core platform services
│   │   ├── api/            # API service layer
│   │   ├── auth/           # Authentication service
│   │   ├── navigation/     # Navigation configuration
│   │   ├── ota/            # Over-the-air updates
│   │   ├── storage/        # Local storage service
│   │   ├── push/           # Push notifications
│   │   └── callcenter/     # Customer support
│   │
│   ├── shared/             # Shared UI components and utilities
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Shared assets
│   │
│   ├── containers/         # Mini app modules
│   │   ├── app_accounts/   # Accounts management mini app
│   │   │   ├── screens/    # Screen components
│   │   │   ├── components/ # Mini app specific components
│   │   │   ├── bridge/     # Communication bridge
│   │   │   ├── services/   # Business logic services
│   │   │   ├── hooks/      # Custom hooks
│   │   │   ├── assets/     # Mini app assets
│   │   │   ├── index.ts    # Public API exports
│   │   │   └── manifest.json # Mini app configuration
│   │   │
│   │   └── app_test_hello/ # Demo "Hello World" mini app
│   │       ├── screens/
│   │       │   └── HelloScreen.tsx
│   │       ├── index.ts
│   │       └── manifest.json
│   │
│   ├── config/             # App configuration
│   │   ├── env.ts          # Environment variables
│   │   ├── theme.ts        # Design system
│   │   └── i18n.ts         # Internationalization
│   │
│   └── app.tsx             # Main app component
│
├── tests/                  # Test files
├── App.tsx                 # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run on iOS:
```bash
npm run ios
```

5. Run on Android:
```bash
npm run android
```

## 🏛️ Core Services

### API Service (`src/core/api/`)
- Centralized HTTP client using Axios
- Request/response interceptors
- Automatic token management
- Error handling

### Authentication Service (`src/core/auth/`)
- User authentication and authorization
- Token management
- User session handling
- Login/logout functionality

### Navigation (`src/core/navigation/`)
- React Navigation configuration
- Type-safe navigation
- Tab and stack navigators
- Navigation utilities

### Storage Service (`src/core/storage/`)
- AsyncStorage wrapper
- Type-safe storage operations
- Object serialization/deserialization
- Storage utilities

### OTA Updates (`src/core/ota/`)
- Over-the-air update checking
- Update download and installation
- Version management
- Update notifications

### Push Notifications (`src/core/push/`)
- Push notification handling
- Token management
- Notification storage
- Topic subscriptions

### Call Center (`src/core/callcenter/`)
- Customer support integration
- Chat functionality
- Agent management
- Rating system

## 🎨 Design System

The app uses a centralized design system defined in `src/config/theme.ts`:

- **Colors**: Primary, secondary, neutral, and status colors
- **Typography**: Font families, sizes, and line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standard border radius values
- **Shadows**: Elevation shadows for depth

## 🌍 Internationalization

The app supports multiple languages using `react-i18next`:

- English (default)
- Vietnamese
- Easy to add more languages

Translation files are located in `src/config/i18n.ts`.

## 📱 Mini Apps

### app_accounts
A complete accounts management mini app with:
- Account listing
- Account details
- Add/edit accounts
- Account services and hooks

### app_test_hello
A simple demo mini app showing:
- Basic screen structure
- Internationalization
- Theme usage
- Mini app manifest

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📦 Dependencies

### Core Dependencies
- React Native 0.81.1
- React Navigation 6.x
- React i18next for internationalization
- Axios for API calls
- AsyncStorage for local storage

### Development Dependencies
- TypeScript
- ESLint
- Prettier
- Jest for testing

## 🔧 Configuration

### Environment Variables
Configure app settings in `src/config/env.ts`:
- API endpoints
- Feature flags
- App metadata
- Debug settings

### Theme Customization
Modify the design system in `src/config/theme.ts`:
- Colors
- Typography
- Spacing
- Component styles

## 📝 Adding New Mini Apps

1. Create a new folder in `src/containers/`
2. Add the required structure:
   - `screens/` - Screen components
   - `components/` - Mini app specific components
   - `services/` - Business logic
   - `hooks/` - Custom hooks
   - `index.ts` - Public API
   - `manifest.json` - Configuration

3. Update navigation in `App.tsx`
4. Add translations in `src/config/i18n.ts`

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for type safety
3. Follow the design system
4. Add proper error handling
5. Write tests for new features
6. Update documentation

## 📄 License

This project is licensed under the MIT License.