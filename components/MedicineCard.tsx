import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function MedicineCard({item , selectedDate ,key}:any) {
    const router = useRouter()
    const status = item?.action?.find((a:any)=>a.date == selectedDate)
  return (
      <TouchableOpacity onPress={()=>router.push({
                pathname:'/action-model',
               params:{...item , selectedDate:selectedDate , action:status?.status , actionDate:status?.date , icon:item?.type?.icon }
              })} key={key} className='w-full h-40 relative flex flex-row items-center justify-between border-[1.5px] border-[#3352cc] p-2 my-2 rounded-xl'>
                <View className='flex flex-row items-center justify-between pr-10 gap-2'>
                  <Image className='w-24 rounded-xl h-24' source={{uri:item?.type?.icon}}/>
                  <View>
                    <Text className='text-lg font-semibold'>{item.name}</Text>
                    <Text className='text-sm'>{item.dosage}  {item.type.name}</Text>
                    <Text className='text-sm'>{item.when}</Text>
                    <Text className='text-lg font-semibold'> </Text> 
                    <Text className='text-lg font-semibold'>{item.reminder}</Text> 
                  </View> 
                </View>
                <View className={`${status?.status === 'Taken' ?" bg-green-400  " :" bg-red-400 "} rounded-full absolute top-2 left-2`}>
                   
                  { status &&
                  (
                    status?.status === 'Taken' ? 
                    <Feather name="check" size={18} color="#166534" /> :
                    <Entypo name="cross" size={18} color="#7f1d1d" />
                  ) 
                  } 
                </View>
              </TouchableOpacity>
  )
}
