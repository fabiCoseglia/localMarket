import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import myProducts from '../../assets/images/myProducts.png'
import search from '../../assets/images/search.png'
import logout from '../../assets/images/logout.png'
import { useNavigation } from '@react-navigation/native'



export default function ProfileScreen() {
  const {user} = useUser();
  const navigation = useNavigation()
  const menuList =[
    {
      id:1,
      name:'My Products',
      icon: myProducts,
      path: 'my-products'
    },
    {
      id:2,
      name:'Explore',
      icon: search,
      path: 'explore'
    },
    {
      id:3,
      name:'Logout',
      icon: logout
    }
  ]


  const onMenuPress = (item)=>{
    item?.path?navigation.navigate(item.path):null;
  }

  return (
      <View className='p-5'>
        <View className='items-center mt-14 mb-6'>
          <Image 
            source={{ uri: user?.imageUrl }} 
            className='w-[100px] h-[100px] rounded-full items-center justify-center text-center'
          />
          <Text className='font-bold text-[25px] mt-2'>{user?.fullName}</Text>
          <Text className='font-bold text-[18px] mt-1 text-gray-500'>{user?.primaryEmailAddress.emailAddress}</Text>
        </View> 
        <FlatList
          data={menuList}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity className='flex-1 items-center p-3 rounded-lg border-gray-400 shadow-lg bg-white  m-3'
            onPress={()=>onMenuPress(item)}
            >
              {item.icon && <Image source={item.icon} className='w-[100px] h-[100px] rounded-full' />}
              <Text className='text-center mt-2 text-gray-500'>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    
  )
}