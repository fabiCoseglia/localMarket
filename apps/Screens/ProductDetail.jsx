import { View, Text, Image, Button, ScrollView, TouchableOpacity, Share } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductDetail({navigation}) {
    const {params} = useRoute();
    const [product,setProduct] = useState([])
    useEffect(()=>{
        params && setProduct(params.product)
        shareButton()
    },[params,navigation])

    const shareProduct = () =>{
        const content = {
            message:product?.title
        }

        Share.share(content).then(res=>{
            console.log(res);
        },(error)=>{
            console.log(error);
        })
        
    }

    const shareButton=()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={()=>shareProduct()}>
                    <Ionicons name="share-social-sharp" size={25} color="white" style={{marginRight:20}} />
                </TouchableOpacity>
            ),
          });
    }
  return (
    <ScrollView className="p-5">
        <View className='bg-white p-5 shadow-lg rounded-md'>
            <Image source={{ uri: product.image }} className="w-full h-[350px]  rounded-lg" />
            <Text className="text-2xl font-bold mb-2 text-gray-800">{product.title}</Text>
            <Text className="text-xl font-bold mb-4 text-green-600">${product.price}</Text>
            <Text className="text-base text-gray-500 mb-5">{product.description}</Text>
            <TouchableOpacity onPress={() => alert('We are working on this funcionality!')}>
                <Text className='bg-blue-500 text-white text-center p-3 rounded-full'>Send a Message</Text>
            </TouchableOpacity>
        </View>
        <View className='bg-white p-5 shadow-lg flex flex-row items-center justify-center gap-5 rounded-md mt-2 mb-7'>
            <View>
                <Image source={{uri:product.userImage}} className='w-10 h-10 rounded-full' />
               <Text className='text-gray-500 text-[12px] text-center'>Seller</Text>
            </View>
            <View >
                <Text className='font-bold text-[16px]'>{product.userName} </Text>
                <Text>{product.userEmail} </Text>
            </View>
        </View>

    </ScrollView>
  )
}