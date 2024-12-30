import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '@/config/FirebaseConfig';
import { setLocalStorage } from '@/service/Storage';

const SignUp = () => {
   const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username , setUsername] = useState<string>('')
   
    const onCreateAccount = () => {
    if(email === '' || password === '' || username === ''){      
        Alert.alert('Please fill in all fields')
      }
    if( password.length < 6){      
        Alert.alert('password must be at least 6 characters')
      }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed up 
            const user = userCredential.user;

            await updateProfile(user,{
                displayName: username
            })    
           await setLocalStorage('userDetail', user)
            router.replace('/(tabs)')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if (errorCode === 'auth/email-already-in-use') {
                Alert.alert('Email already in use')
            }   
            // ..
        });

        // console.log(email)
   }
    return (
      <View className=' h-screen p-6'> 
        <Text className=' text-4xl my-2 font-extrabold '>Welcome Back</Text>
        <Text className=' text-4xl font-extrabold text-gray-300'>You've been missed !</Text>
  
       <View className=' mt-6'>
          <Text className='font-medium pb-2 text-gray-600'>Enter your Full name</Text>
          <TextInput onChangeText={(value)=>setUsername(value)}  className=' border-2 border-gray-300 rounded-xl placeholder:text-gray-400 font-semibold focus:border-blue-500' placeholder='Full name ' />   
        </View>
  
        <View className=' mt-2'>
          <Text className=' text-lg pb-2 text-gray-600'>Enter your email</Text>
          <TextInput onChangeText={(value)=>setEmail(value)} className=' border-2 border-gray-300 rounded-xl placeholder:text-gray-400 font-semibold focus:border-blue-500' placeholder='Email ' />   
        </View>
        <View>
          <Text  className=' text-lg mt-4 pb-2 text-gray-600'>Enter your Password</Text>
          <TextInput onChangeText={(value)=>setPassword(value)} className=' border-2 border-gray-300 rounded-xl placeholder:text-gray-400 font-semibold focus:border-blue-500' placeholder='Password' secureTextEntry={true} />   
        </View>
        <View>
          <TouchableOpacity onPress={onCreateAccount}>
          <Text className=' rounded-xl py-3 text-center mt-4 base text-white '>Create an account</Text> 
          </TouchableOpacity>
  
  
     <TouchableOpacity onPress={() => router.push('/login/signin')}>
          <Text className=' mx-auto mt-3 border-2 border-[#3352cc] text-center py-3 text-[#3352cc] font-semibold rounded-2xl '>Already have an Account</Text>
        </TouchableOpacity>
  
  
  
        </View>
      </View>
    )
}

export default SignUp