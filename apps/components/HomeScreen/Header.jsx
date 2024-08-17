import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Header() {
  const {user} = useUser();
  return (
    <View>
      <View className='flex flex-row items-center gap-2'>
        <Image source={{uri:user?.imageUrl}}
        className='rounded-full w-12 h-12'
        />
        <View>
          <Text className='text-[16px]'>Welcome</Text>
          <Text className='text-[20px] font-bold'>{user?.fullName}</Text>
        </View>
      </View>
      {/* SearchBar */}
      <View className='p-2 bg-white rounded-full mt-5 px-5 flex flex-row items-center border-[2px] border-gray-300'>
        <FontAwesome5 className='' name="search" size={24} color="gray" />
        <TextInput className='ml-2 text-[18px]' placeholder='Search' onChangeText={(value)=>console.log(value)}></TextInput>
      </View>
    </View>
  )
}