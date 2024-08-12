import {  StatusBar, Text, View } from 'react-native';
import LoginScreen from './apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './apps/Navigations/TabNavigation';
import TabNavigation from './apps/Navigations/TabNavigation';

export default function App() {
  const publishableKey = 'pk_test_Y2FyaW5nLWJpcmQtNC5jbGVyay5hY2NvdW50cy5kZXYk'
  return (
  <ClerkProvider publishableKey={publishableKey}>    
    <View className="flex-1 bg-white">
      <StatusBar style={'auto'} />
      <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>        
      </SignedOut>
    </View>
  </ClerkProvider>
  );
}
