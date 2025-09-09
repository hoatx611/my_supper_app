/**
 * My Super App - React Native
 * A modular super app with mini app architecture
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Import config
import { theme } from './src/config/theme';
import './src/config/i18n';

// Import core services
import { authService } from './src/core/auth';

// Import mini apps
import HelloScreen from './src/containers/app_test_hello/screens/HelloScreen';
import AccountsListScreen from './src/containers/app_accounts/screens/AccountsListScreen';

// Home Screen Component
const HomeScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    }}>
      <Text style={{
        fontSize: theme.typography.fontSize.xxxl,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
      }}>
        {t('navigation.home')}
      </Text>
      <Text style={{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: theme.typography.lineHeight.lg,
      }}>
        Welcome to My Super App!
      </Text>
    </View>
  );
};

// Simple Tab Component
const SimpleTabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'accounts':
        return <AccountsListScreen />;
      case 'hello':
        return <HelloScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{
        backgroundColor: theme.colors.primary,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}>
        <Text style={{
          color: theme.colors.white,
          fontSize: theme.typography.fontSize.xl,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          My Super App
        </Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Bottom Tabs */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.grayLight,
        paddingVertical: 10,
      }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text 
            style={{ 
              fontSize: 20, 
              color: activeTab === 'home' ? theme.colors.primary : theme.colors.gray,
              marginBottom: 5,
            }}
            onPress={() => setActiveTab('home')}
          >
            🏠
          </Text>
          <Text style={{
            fontSize: 12,
            color: activeTab === 'home' ? theme.colors.primary : theme.colors.gray,
          }}>
            {t('navigation.home')}
          </Text>
        </View>
        
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text 
            style={{ 
              fontSize: 20, 
              color: activeTab === 'accounts' ? theme.colors.primary : theme.colors.gray,
              marginBottom: 5,
            }}
            onPress={() => setActiveTab('accounts')}
          >
            👤
          </Text>
          <Text style={{
            fontSize: 12,
            color: activeTab === 'accounts' ? theme.colors.primary : theme.colors.gray,
          }}>
            {t('navigation.accounts')}
          </Text>
        </View>
        
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text 
            style={{ 
              fontSize: 20, 
              color: activeTab === 'hello' ? theme.colors.primary : theme.colors.gray,
              marginBottom: 5,
            }}
            onPress={() => setActiveTab('hello')}
          >
            👋
          </Text>
          <Text style={{
            fontSize: 12,
            color: activeTab === 'hello' ? theme.colors.primary : theme.colors.gray,
          }}>
            {t('navigation.hello')}
          </Text>
        </View>
      </View>
    </View>
  );
};

// App Content Component
const AppContent: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    // Initialize auth service
    authService.initializeAuth();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <SimpleTabNavigator />
    </View>
  );
};

// Main App Component
function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

export default App;
