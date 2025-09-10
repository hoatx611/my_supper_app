import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import existing containers
import { AccountsListScreen } from '../../containers/app_accounts/screens/AccountsListScreen';
import { HelloScreen } from '../../containers/app_test_hello/screens/HelloScreen';

// Import new webview camera container
import { WebViewScreen } from '../../containers/app_webview_camera/screens/WebViewScreen';

const Tab = createBottomTabNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Accounts') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Hello') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Accounts" 
          component={AccountsListScreen}
          options={{ title: 'Tài khoản' }}
        />
        <Tab.Screen 
          name="Hello" 
          component={HelloScreen}
          options={{ title: 'Xin chào' }}
        />
        <Tab.Screen 
          name="Camera" 
          component={WebViewScreen}
          options={{ title: 'Camera Demo' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
