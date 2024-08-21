import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    className='flex-1 m-1 border-[1px] rounded-lg p-2 border-slate-300'
    onPress={()=>{navigation.push('product-detail',{
      product:item
    })}}
    >
    <Image
    source={{uri:item.image}}
    className='w-full h-[170] rounded-lg object-cover'
    />
    <View>
      <Text className='text-gray-500 text-[12px]'>{item.category}</Text>
      <Text className='text-[15px] font-bold mt-2'>{item.title}</Text>
      <Text className='text-[20px] font-bold text-green-700'>${item.price}</Text>
    </View>
  </TouchableOpacity>
  )
}