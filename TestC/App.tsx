import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SubscriptionProvider } from './src/context/SubscriptionContext';
import PaywallScreen from './src/screens/PaywallScreen';
import MeditationsScreen from './src/screens/MeditationsScreen';
import AiTuningScreen from './src/screens/AiTuningScreen';

export type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
  AiTuning: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <SubscriptionProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Paywall" component={PaywallScreen} />
              <Stack.Screen name="Meditations" component={MeditationsScreen} />
              <Stack.Screen name="AiTuning" component={AiTuningScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SubscriptionProvider>
    </PaperProvider>
  );
}

