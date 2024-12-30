import { auth } from '@/config/FirebaseConfig'
import { removeLocalStorage } from '@/service/Storage'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Button, Text, View } from 'react-native'

const Profile = () => {

  const onLogOut = async() => { 
    console.log('logout')
    await removeLocalStorage('userDetail')
    await signOut(auth)
   }
  return (
    <View>
      <Text>profile.</Text>
      <Button title='Logout' onPress={onLogOut}/>
    </View>
  )
}

export default Profile
