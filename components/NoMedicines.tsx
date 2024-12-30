import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
export default function NoMedicines() {
    const router = useRouter()
  return (
    <View className=' flex flex-col items-center justify-center mt-20'>
        <Image source={require('../assets/images/medicine.png')} style={{width: 200, height: 200}} />                   
      <Text className=' text-3xl text-center mt-10 font-semibold text-gray-400'>No Medicines !!</Text>

      <Text className=' text-sm text-center mt-2 font-semibold text-gray-400'>
        Add your medicines to get reminders
      </Text>

      <TouchableOpacity onPress={()=>router.push('/add-medicine')} className='base w-5/6 py-4 rounded-xl flex mt-5'>           
        <Text className='text-center text-white font-semibold'>Add Medicine
        <FontAwesome5 name="capsules" size={24}  />
        </Text>
        </TouchableOpacity>
    </View>
  )
}