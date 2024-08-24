import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import LatestItemList from '../components/HomeScreen/LatestItemList';
import { app } from '../../firebaseConfig';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList,setProductList] = useState([]);

  useEffect(()=>{
    getAllProducts();
  },[])

  const getAllProducts = async() =>{
    setProductList([]);
    const q = query(collection(db,'UserPost'),orderBy('createdAt','desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc)=>{
      setProductList(productList=>[...productList,doc.data()])
    })
  }
  return (
    <View className='p-5 py-4 mb-[85px]'>
      <Text className='text-[30px] font-bold'>Explore more</Text>
      <LatestItemList latestItemList={productList} />
    </View>
  )
}