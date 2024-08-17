import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'

export default function Slider({sliderList}) {
  
  return (
    <View className='mt-1'>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View>
          <Image source={{uri:item?.image}}
          className='h-[230px] w-[500px] rounded-lg object-contain ml-[-30]'
          />
        </View>
      )}
      />
    </View>
      
  )
}