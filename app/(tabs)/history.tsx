import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react' 
import moment from 'moment'
import { GetDateRangeToDisplay, getLocalStorage } from '@/service/Storage' 
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import MedicineCard from '@/components/MedicineCard'
import Feather from '@expo/vector-icons/Feather';
export default function History() {
    const today:string = moment().format('MM/DD/YYYY')
    const [selectedDate, setSelectedDate] = useState<string>(today)
    const [rangeList , setRangeList] = useState<any>()
    const [medList ,  setMediList] = useState<any>([]); 
    const [loading, setLoading] = useState<boolean>(true) 
   
  useEffect(()=>{
    getrangeList();
    getMedicineList(selectedDate as string)
    console.log(selectedDate as string)
  },[]) 
  const getrangeList = async()=>{
    const daterange = GetDateRangeToDisplay() 
    setRangeList(daterange)
  }
    useEffect(()=>{
        getDateList()
    }
    ,[])

    const getDateList = ()=>{
        const dates = GetDateRangeToDisplay()
        setRangeList(dates)
    }
     const getMedicineList = async(selectedDate:any)=>{
        setLoading(true)
        const user = await getLocalStorage('userDetail')
        setMediList([])
        try { 
           const q = query(collection(db, "Medicines"),
            where("email", "==", user?.email),
            // where('dates' , 'array-contains' , selectedDate)
          );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          setMediList((prev:any) => [...prev, doc.data()])
        }); 
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
       finally{
        setLoading(false)
       }
      }

  return (
    <View className=' flex gap-4 px-3'>
      <Image className=' w-full h-80 rounded-3xl' source={require('../../assets/images/med-history.png')} />
      <Text className=' text-3xl text-center my-2 textbase font-bold '>Medication History</Text>

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
 
     {medList?.length >0 && <FlatList
             data={medList}
             onRefresh={()=>getMedicineList(selectedDate)}
             refreshing={loading}
             renderItem={({item , index})=>
            (
                item?.action?.find((a:any)=>a.date == selectedDate) ? <MedicineCard item={item} selectedDate={selectedDate} key={index} />
                :
                item?.action && <View className='flex items-center justify-center w-full h-80'>
                <Text className=' text-center text-lg font-bold text-gray-500 '>No Medicine Found</Text>
                </View>
            )  
             }
           />  
         }
      { loading &&  <View className='flex items-center justify-center w-full h-80'>
         <Feather className=' animate-spin ' name="loader" size={24} color="gray" />
         </View>}
 
    </View>
  )
}