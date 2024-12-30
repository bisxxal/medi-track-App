import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TypeList, WhenToTake } from '@/constants/Options'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateForText, formatTime, FromatDate, getDateRange, getLocalStorage } from '@/service/Storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { db } from '@/config/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; 
import { useRouter } from 'expo-router';
interface Type {
  dosage: string;
   endDate: any;
    name: string;
     reminder: string,
    startDate:any;
     type: {icon:string, name: string},
      when: string
    }
const AddNewMedicine = () => {
    const [fromData, setFromData] = useState<Type>()
    const [showStartDate, setShowStartDate] = useState(false)
    const [showEndDate, setShowEndDate] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [loader, setLoader] = useState(false)

    const router = useRouter()
    const onHandelInputChange = (field:string , value:any)=>{
        setFromData( (prev:any)=>({
            ...prev,
            [field]: value
        }))
    }

  const SaveMedicine = async()=>{
    setLoader(true)
    const docId = Date.now().toString()
    if(!fromData?.name || !fromData?.dosage){
      Alert.alert('Please fill all the fields')
      return ;
    }
    const user = await getLocalStorage('userDetail')
    const dates = getDateRange(fromData?.startDate, fromData?.endDate)
    console.log(dates)
    try{
      await setDoc(doc(db , 'Medicines', docId),{
        ...fromData,
       email: user.email,
       docId: docId,
       dates: dates
      }) 
      
      Alert.alert("great !!", 'Medicine Added Successfully',[{
        text:'Ok',
        onPress: ()=>router.push('/(tabs)') 
      }])
    }catch(e){
      console.log(e)
    }
    finally{
      setLoader(false)
    }
  }
  return (
    <View className='w-full p-3'>
       <Text className=' textbase text-2xl my-2 font-bold'> Add New Medicine </Text>

       <View className='bg-gray-200 flex flex-row border-[1.5px] border-[#3352cc] items-center rounded-xl gap-3 p-2 '>
       <FontAwesome6 name="capsules" size={22} color="#3352cc" />
       <TextInput className=' w-5/6' placeholder='Medicine Name' onChangeText={(value)=>onHandelInputChange('name', value)}  />            
       </View>


       <FlatList
        data={TypeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='px-3 w-[97%] mx-auto'
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>onHandelInputChange('type' , item)} className={` ${item.name === fromData?.type?.name ? ' base ' : ' '} border-[1.5px] border-[#3352cc]  ase  p-3  m-2 rounded-xl`}>
            <Text className={` ${item.name === fromData?.type?.name ? ' text-white ' : ' textbase '} font-semibold`}> {item.name} </Text>
          </TouchableOpacity>
        )}
         />

         <View className='bg-gray-200 flex flex-row items-center justify-between border-[1.5px] border-[#3352cc] p-2 my-2 rounded-xl'>
            <TextInput onChangeText={(value)=>onHandelInputChange('dosage', value)} className=' w-full' placeholder='Dose Ex- 2.5 ml' />      
         </View>

        <View className='bg-gray-200 border-[1.5px] border-[#3352cc] p-2 my-2 rounded-xl px-3 flex-row items-center flex  justify-between '>
        <Ionicons className='' name="timer-sharp" size={24} color="blue" />
        <View className='w-[95%] '>
        <Picker selectedValue={fromData?.when}
         className='  '
        onValueChange={(itemValue, itemIndex) => onHandelInputChange('when', itemValue)}
        >
          {WhenToTake.map((item,index)=>{
              return <Picker.Item key={index} label={item} value={item} />  
          })}
        </Picker>  
        </View>
        </View>


      <View className=' flex flex-row items-center justify-between'>
      <TouchableOpacity onPress={()=>setShowStartDate(true)} className='bg-gray-200 w-[47%] border-[1.5px] border-[#3352cc] p-3 my-2 rounded-xl px-3 flex-row items-center flex gap-3 '> 
        <FontAwesome6 name="calendar-minus" size={22} color="blue" />
          <Text> {fromData?.startDate ? formatDateForText(fromData?.startDate) : 'Select Start Date'} </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setShowEndDate(true)} className='bg-gray-200 w-[47%] border-[1.5px] border-[#3352cc] p-3 my-2 rounded-xl px-3 flex-row items-center flex gap-3 '> 
        <FontAwesome6 name="calendar-minus" size={22} color="blue" />
          <Text> {fromData?.endDate ? formatDateForText(fromData?.endDate) : 'Select End Date'} </Text>
        </TouchableOpacity>
      </View>

      <View>gap-3
      <TouchableOpacity onPress={()=>setShowTime(true)} className='bg-gray-200  border-[1.5px] border-[#3352cc] p-3 my-2 rounded-xl px-3 flex-row items-center flex   '> 
         <Ionicons name="time" size={24} color="blue" />
          <Text> {fromData?.reminder ? (fromData?.reminder) : 'Select reminder time'} </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={()=>SaveMedicine()} className='bg-[#3352cc] p-3 my-2 mx-auto w-full rounded-xl'>
      { loader ? <ActivityIndicator size={'small'} className='w-full' color={'white'}/> :
        <Text className='text-white text-center'> Save </Text>}
      </TouchableOpacity>

        {showStartDate && <DateTimePicker
          minimumDate={new Date()}
          onChange={(event)=>{ onHandelInputChange('startDate', FromatDate(event.nativeEvent.timestamp))
          setShowStartDate(false)
          }}
          value={new Date(fromData?.startDate) ?? new Date()}
          />}
        {showEndDate && <DateTimePicker
          minimumDate={new Date()}
          onChange={(event)=>{ onHandelInputChange('endDate', FromatDate(event.nativeEvent.timestamp))
          setShowEndDate(false)
          }}
          value={new Date(fromData?.endDate) ?? new Date()}
          />}

{showTime && <DateTimePicker
          minimumDate={new Date()}
          mode='time'
          onChange={(event)=>{ onHandelInputChange('reminder', formatTime(event.nativeEvent.timestamp))
          setShowTime(false)
          }}
          value={new Date(fromData?.reminder ?? new Date()) ?? new Date()}
          />}
    </View>
  )
}

export default AddNewMedicine