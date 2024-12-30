import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '@/service/Storage'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const Header = () => {
  const [name , setName] =useState('')
  const router =useRouter()
  const getNmae = async() => {
   const user = await getLocalStorage('userDetail')
    setName(user.displayName)
  }
  useEffect(()=>{
    getNmae()
  },[])
  return (
    <View className=' p-3 pt-5 flex flex-row pr-7 justify-between w-full '> 
      <Text className=' text-4xl textbase font-extrabold'>Hii ,{name} 👋🏻 </Text>

      <TouchableOpacity onPress={()=>router.push('/add-medicine')} className=' flex base rounded-3xl p-2 px-4 flex-row gap-2 items-center' >           
        <Text className='text-sm text-white '>Add </Text>      
         <FontAwesome6 name="file-medical" size={20} color="white" />
        </TouchableOpacity>

        
    </View>
  )
}

export default Header