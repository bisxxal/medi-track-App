import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign'; 
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import moment from 'moment';
export default function ActionModel() {
  const medicine = useLocalSearchParams()
  const router = useRouter() 
  const today:string = moment().format('MM/DD/YYYY')
      const [selectedDate, setSelectedDate] = useState<string>(today)
  const updateMedicine = async (status:string)=>{
    try {
      const docRef = doc(db, "Medicines", medicine.docId as string)
      await updateDoc(docRef, {
        action:arrayUnion({
          status: status,
          time: moment().format('LT'),
          date:medicine.selectedDate
        })
      });

      Alert.alert(status, `Medicine ${status}`,[
        {text: 'OK', onPress: ()=>router.replace('/(tabs)') }
      ] )  

    } catch (error) { 
      
    } 
  }  
  return (
    <View className=' flex h-screen items-center justify-center'>
       <View className='absolute top-5 left-5'>
          <TouchableOpacity onPress={()=>router.back()}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
            </View>
      <View>
         <Image className=' h-60 w-52 rounded-3xl ' source={require('../../assets/images/notification.gif')} />
      </View>

      <View className=' mt-10'>
        <Text className=' text-lg text-center'>{medicine.selectedDate}</Text>
        <Text className=' text-center textbase font-extrabold text-5xl mt-2'>{medicine.reminder}</Text>
        <Text className=' text-center  text-base mt-2'>it is time to take</Text>
            
        <View className='flex flex-row py-5 items-center gap-4 justify-center mt-10 border rounded-2xl'>
          <View>
            <Image  className='w-24 rounded-xl h-24' source={{uri: Array.isArray(medicine?.icon) ? medicine.icon[0] : medicine?.icon}} />
          </View> 
          <View>
          <Text className=' text-xl font-extrabold '> {medicine.name}</Text>
          <Text className=' text-lg mt-2'>{medicine.when}</Text>
          </View>
            </View>

        <View className='flex flex-row gap-3 items-center justify-center mt-10'>
          <TouchableOpacity disabled={!!medicine?.action } activeOpacity={0.7} onPress={()=>updateMedicine('Taken')} className=' disabled:bg-gray-500 flex flex-row items-center gap-2 bg-green-400 px-6 rounded-3xl py-2'>
          <Feather name="check" size={24} color="#166534" />
             <Text className=' text-green-800'>Taken</Text></TouchableOpacity> 
          <TouchableOpacity disabled={!!medicine?.action} activeOpacity={0.7} onPress={()=>updateMedicine('Missed')} className=' disabled:bg-gray-500 flex flex-row items-center gap-2 bg-red-500 px-6 rounded-3xl py-2'> <Entypo name="cross" size={24} color="#7f1d1d" /> <Text className=' text-red-900'>Missed</Text></TouchableOpacity> 
          </View>
            </View>
            <View className='absolute bottom-10'>
              <TouchableOpacity onPress={()=>router.back()}><Entypo name="circle-with-cross" size={25} color="black" /></TouchableOpacity>
               </View>
    </View>
  )
}