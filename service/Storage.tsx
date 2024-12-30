import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'firebase/auth'
import moment from 'moment'
export const setLocalStorage = async(key: string, value: User) => {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = async(key: string) => {
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

export const removeLocalStorage = async(key: string) => {
  console.log('removed user')
    await AsyncStorage.clear()
}

export const FromatDate = (date: any) => {
  return new Date(date)
}

export const formatDateForText = (date: any) => {
  return moment(date).format('ll')  
}
export const formatTime = (timestamp: any) => {
 const time  = new Date(timestamp);
  return time.toLocaleTimeString([] , {hour: '2-digit', minute:'2-digit'})
}
export const getDateRange = (startDate: any, endDate: any) => {

  const start = moment(new Date(startDate) , 'MM-DD-YYYY')  
  const end = moment(new Date(endDate) , 'MM-DD-YYYY')
  const dates = []
  while(start.isSameOrBefore(end)){
    dates.push(start.format('MM-DD-YYYY'))
    start.add(1, 'days')
  }
  return dates
}

export const GetDateRangeToDisplay = ()=>{
  const dates = [];
  for(let i=0; i<7; i++){
    dates.push({
      date:moment().add(i, 'days').format('DD'), 
      day: moment().add(i, 'days').format('dd'),
      formartDate: moment().add(i, 'days').format('L')
    })
  } 
  return dates
}