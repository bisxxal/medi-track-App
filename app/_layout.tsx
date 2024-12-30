import { Stack } from 'expo-router'; 
import './global.css';
import Toast from 'react-native-toast-message';

export default function RootLayout() { 
  return (
     <Stack screenOptions={{headerShown:false}}>
         <Toast />
        <Stack.Screen name="(tabs)" /> 
        <Stack.Screen name="login" /> 
        <Stack.Screen name="action-model"
        options={{presentation:'modal'}}
        /> 
      </Stack> 
  );
}
