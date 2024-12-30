import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getLocalStorage } from '@/service/Storage';

const tabLayout = () => {

  const router = useRouter()

  const getUserDetail = async() => {
    const user = await getLocalStorage('userDetail')
    if(!user){
      router.replace('/login')
    } 
  }

  useEffect(() => {
    getUserDetail()
  }
  , [])

  return (
   <Tabs screenOptions={{
      tabBarActiveTintColor:'#3352cc',
      tabBarInactiveTintColor:'#ccc',
      tabBarStyle:{
        borderColor:'#ccc',        
        borderCurve:'circular', 
      },
    headerShown:false}}>
    <Tabs.Screen name="index" 
    options={{
      tabBarIcon: ({color, size}) => (
        <Entypo name="home" size={25} color={color}  />
      )  
    }}
    />
     <Tabs.Screen name="AddNew"
    options={{
      tabBarIcon: ({color, size}) => (
<FontAwesome5 name="capsules" size={25} color={color} />
      )  
    }}
    />
    <Tabs.Screen name="Profile" 
    options={{
      tabBarIcon: ({color, size}) => (
       <FontAwesome5 name="user" size={25} color={color} />
      )  
    }}
    />
    
   </Tabs>
  )
}

export default tabLayout
