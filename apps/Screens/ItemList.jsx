import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../components/HomeScreen/LatestItemList';

export default function ItemList() {
    const {params} = useRoute();
    const db = getFirestore(app);
    const [itemList,setItemlist] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        params && getItemsListByCategory();
    },[params])

    const getItemsListByCategory = async()=>{
        setItemlist([]);
        setLoading(true);
        const q =  query(collection(db,'UserPost'),where('category', '==',params.category))
        const snapshot = await getDocs(q);
        snapshot.forEach(data =>{
            setItemlist(itemList=> [...itemList,data.data()])
          })
        setLoading(false)
    }
  return (
    <View className='p-3'>
      {
        loading ? 
        <ActivityIndicator size={'large'} color={'blue'} className='justify-center mt-32' />
        :
        itemList?.length >0?
        <LatestItemList className='mt-2' latestItemList={itemList} heading={'Latest post'} />
        :
        <Text className='text-center items-center p-5 text-[20px] text-gray-500'>Items not found</Text>
      }    
    </View>
  )
}