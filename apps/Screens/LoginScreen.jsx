import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp
      }
    } catch (error) {
      console.error('OAuth error:', error.message || error); // Log the error message if available
      // Optional: log the stack trace for deeper debugging
      console.error(error.stack);
    }
  }, []);

  return (
    <View>
      <Image source={require('./../../assets/images/login.png')}
        className='w-full h-[380px] object-cover'
      />
      <View className='p-10 bg-white mt-[-15px] rounded-t-3xl shadow-md'>
        <Text className='text-[30px] font-bold'>Local Marketplace</Text>
        <Text className='text-[18px] text-slate-500 mt-5'>Buy Sell Marketplace where you can sell items and make money</Text>
        <Pressable onPress={onPress} className='p-4 bg-blue-500 rounded-full mt-20 w-[350px] mx-auto'>
          <Text className='text-white text-center text-[16px]'>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}
