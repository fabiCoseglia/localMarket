import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/HomeScreen/Header'
import Slider from '../components/HomeScreen/Slider'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../components/HomeScreen/Categories'

export default function HomeScreen() {
  const db = getFirestore(app)
  const [sliderList,setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([])

  useEffect(()=>{
    getSliders()
    getCategoryList()
  },[])


  const getSliders=async()=>{
    const querySnapshot = await getDocs(collection(db,'Sliders'));
    querySnapshot.forEach((slider)=>{
      setSliderList(sliderList=>[...sliderList,slider.data()])
      
    })
  };

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <View className='py-8 px-6 flex flex-1 bg-white'>
      <Header/>
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
    </View>
  )
}