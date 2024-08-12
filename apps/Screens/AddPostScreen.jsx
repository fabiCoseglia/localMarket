import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function AddPostScreen() {
  const db=getFirestore(app)
  const [categoryList,setCategoryList] = useState([])
  useEffect(()=>{   
    getCategoryList();
  },[])

  //Get collection from Firebase
  const getCategoryList = async() =>{
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
        console.log(categoryList);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  return (
    <View className='mx-auto my-auto'>
      <Text className='font-semibold text-lg'>Add-Post Screen</Text>
    </View>
  )
}