import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/HomeScreen/Header'
import Slider from '../components/HomeScreen/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../components/HomeScreen/Categories'
import LatestItemList from '../components/HomeScreen/LatestItemList'

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList,setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])

//Get Sliders
  const getSliders=async()=>{
    const querySnapshot = await getDocs(collection(db,'Sliders'));
    querySnapshot.forEach((slider)=>{
      setSliderList(sliderList=>[...sliderList,slider.data()])
      
    })
  };
//Get Categories
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

  //Get Items to Home
  const getLatestItemList= async()=>{
    setLatestItemList([])
    const querySnapshot = await getDocs(collection(db,'UserPost'),orderBy('createdAt','desc'));
    querySnapshot.forEach((post)=>{
      setLatestItemList(latestItemList =>[...latestItemList,post.data()])
    })
  }
  return (
    <ScrollView className='py-8 px-6 flex flex-1 bg-white'>
      <Header/>
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} heading={'Latest items'} disableScroll={true} />
    </ScrollView>
  )
}