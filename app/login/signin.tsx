import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { auth } from '@/config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { setLocalStorage } from '@/service/Storage'

const Signin = () => {
  const router = useRouter()
   const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
     
    const onLogin = () => {
        if(email === '' || password === ''){      
            Toast.show({
              type: 'error',
              text1: 'Login Error',
              text2: 'Please fill in all fields'
            });
          }
        signInWithEmailAndPassword(auth, email, password)
          .then(async(userCredential) => { 
            const user = userCredential.user;
          await  setLocalStorage('userDetail', user)
            router.replace('/(tabs)')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode); 
            Toast.show({
              type: 'error',
              text1: 'Login Error',
              text2: 'email or password is incorrect'
            });
          });
    }
  return (
    <>
     <Toast />
    <View className=' h-screen p-6'>
      <Text className=' text-4xl font-extrabold'>Let's Sign You In</Text>
      <Text className=' text-4xl my-2 font-extrabold text-gray-300'>Welcome Back</Text>
      <Text className=' text-4xl font-extrabold text-gray-300'>You've been missed !</Text>

      <View className=' mt-2'>
        <Text className='font-medium pb-2 text-gray-600'>Enter your email</Text>
        <TextInput onChangeText={(value)=>setEmail(value)} className=' border-2 border-gray-300 rounded-xl placeholder:text-gray-400 font-semibold focus:border-blue-500' placeholder='Email ' />   
      </View>
      <View>
        <Text  className='font-medium mt-2 pb-2 text-gray-600'>Enter your Password</Text>
        <TextInput  onChangeText={(value)=>setPassword(value)}  className=' border-2 border-gray-300 rounded-xl placeholder:text-gray-400 font-semibold focus:border-blue-500' placeholder='Password' secureTextEntry={true} />   
      </View>
      <View>
        <TouchableOpacity onPress={onLogin}>
        <Text className=' rounded-xl py-3 text-center mt-4 base text-white '>Login</Text> 
        </TouchableOpacity>


   <TouchableOpacity onPress={() => router.push('/login/signup')}>
        <Text className=' mx-auto mt-3 border-2 border-[#3352cc] text-center py-3 text-[#3352cc] font-semibold rounded-2xl '>Have No Account , Create an Account</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

export default Signin