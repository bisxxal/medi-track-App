import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetDateRangeToDisplay, getLocalStorage } from '@/service/Storage';
import moment from 'moment';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import NoMedicines from './NoMedicines';
import { useRouter } from 'expo-router'; 
import MedicineCard from './MedicineCard';
interface Range {
  day: string;
  date: string;
  formartDate:string
}
const MedicineList = () => {
  const [medList ,  setMediList] = useState<any>([]);
  const [rangeList , setRangeList] = useState<Range[]>()
  const today:string = moment().format('MM/DD/YYYY')
  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(()=>{
    getrangeList();
    getMedicineList(selectedDate as string)
    console.log(selectedDate as string)
  },[]) 
  const getrangeList = async()=>{
    const daterange = GetDateRangeToDisplay() 
    setRangeList(daterange)
  }

  const getMedicineList = async(selectedDate:any)=>{
    setLoading(true)
    const user = await getLocalStorage('userDetail')
    setMediList([])
    try {
      
      // console.log(" chaing date",selectedDate)
       const q = query(collection(db, "Medicines"),
        where("email", "==", user?.email),
        // where('dates' , 'array-contains' , selectedDate)
      );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
      setMediList((prev:any) => [...prev, doc.data()]) 
      // console.log(medList.length) 
    }); 
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
   finally{
    setLoading(false)
   }
  }
 
  return (
    <View className='w-full mt-7'>
        <Image className='w-[95%] rounded-3xl h-80 mx-auto' source={require('../assets/images/medication.jpeg')}/>

      <FlatList
        data={rangeList}
        horizontal={true}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>{
            setSelectedDate(item.formartDate)
            getMedicineList(item.formartDate)
          }} className={`${item.formartDate === selectedDate ? " base " : '  border-2 border-[#3352cc] '} ml-3 w-16 h-16 rounded-xl flex items-center justify-center `}>
            <Text className={` ${item.formartDate === selectedDate ? " text-white " : ' text-[#3352cc] '} `}>{item.day}</Text>
            <Text className={` ${item.formartDate === selectedDate ? " text-white " : ' text-[#3352cc] '} text-3xl  font-bold`}>{item.date}</Text>
          </TouchableOpacity>
        )}     
      />

    {medList?.length >0 ? <FlatList
        data={medList}
        onRefresh={()=>getMedicineList(selectedDate)}
        refreshing={loading}
        renderItem={({item , index})=>
       ( <MedicineCard item={item} selectedDate={selectedDate} key={index} />)  
        }
      /> : <NoMedicines/>
    }
    </View>
  )
}
export default MedicineList