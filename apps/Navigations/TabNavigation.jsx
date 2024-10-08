import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPostScreen from '../Screens/AddPostScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenNavigation from './ExploreScreenNavigation';
import ProfileScreenStackNav from './ProfileScreenStackNav';
export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="home-nav"component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => 
            <Text style={{ color }}>Home</Text>,
          tabBarIcon: ({color,size})=>
            <FontAwesome name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen name="explore" component={ExploreScreenNavigation}
       options={{
        tabBarLabel: ({ color }) => 
          <Text style={{ color }}>Search</Text>,
        tabBarIcon: ({color,size})=>
          <FontAwesome name="search" size={size} color={color} />
      }} />
      <Tab.Screen name="addpost" component={AddPostScreen}
       options={{
        tabBarLabel: ({ color }) => 
          <Text style={{ color }}>Post</Text>,
        tabBarIcon: ({color,size})=>
          <FontAwesome name="camera" size={size} color={color} />
      }} />
      <Tab.Screen name="profile" component={ProfileScreenStackNav}
       options={{
        tabBarLabel: ({ color }) => 
          <Text style={{ color }}>Profile</Text>,
        tabBarIcon: ({color,size})=>
        <FontAwesome name="user" size={size} color={color} />
      }} />
    </Tab.Navigator>
  );
}