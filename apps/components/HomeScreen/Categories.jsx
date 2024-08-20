import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Categories({categoryList}) {
  const navigation = useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>

      <FlatList
        className="mt-3"
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex-1 items-center justify-center p-2 border-[1px] border-gray-300 rounded-full"
          onPress={()=>navigation.navigate('item-list',{
            category: item.name
          })}
          >
            <Image
              source={{ uri: item?.image }}
              className="w-[80px] h-[80px] rounded-full"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}