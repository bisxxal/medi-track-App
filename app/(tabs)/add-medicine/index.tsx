import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import AddNewMedicine from '@/components/AddNewMedicine'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'; 
const AddMedicine  = () => {
    const router = useRouter()
  return (
    <ScrollView className=' relative'>
    <Image className=' w-full h-[300px]' source={require('../../assets/images/consult.png')} /> 
    <TouchableOpacity className=' absolute top-2 left-3' onPress={() => router.back()}>              
    <Ionicons name="arrow-back-outline" size={24} color="black" />
    </TouchableOpacity>

    
      <AddNewMedicine/>
    </ScrollView>
  )
}

export default AddMedicine  