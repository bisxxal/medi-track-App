import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

const Login = () => {
  const router = useRouter()
  return (
    <>
     <Toast />
    <View className='h-screen w-full flex flex-col '>
      <View className=' h-1/2 flex items-center px-3 justify-center'>
        <Image className=' !object-contain h-[95%] w-1/2 rounded-3xl ' source={require('../../assets/images/login.png')} />
      </View>

      <View className=' rounded-3xl buttonbg2 flex items-center w-full  h-1/2'>

     
      <View className='mt-10'>
        <Text className=' text-4xl font-extrabold '>Stay on Track, Stay healthy!</Text>  
      </View>

      <View className=''>
        <Text>Track your meds, take control of your health stay consitent, stay healthy</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/login/signin')}>
        <Text className=' w-[400px] text-center py-4 text-lg base text-white rounded-full '>Continue</Text>
      </TouchableOpacity>
      </View>

    </View>
    </>
  )
}

export default Login