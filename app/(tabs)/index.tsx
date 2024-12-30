import Header from '@/components/Header'
import MedicineList from '@/components/MedicineList' 
import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'

const MainIndex = () => {
  return (

    <FlatList
    data={[]}
    renderItem={() => null}
    ListHeaderComponent={
      <View className='h-screen p-3 w-full flex '>
      <Header/>
      {/* <NoMedicines/> */}
      <MedicineList/>
     </View>
    } 
    />

   
  )
}

export default MainIndex
