import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function ActionModel() {
  const medicine = useLocalSearchParams()
  console.log(medicine)
  return (
    <View>
      <Text>ActionModel</Text>
    </View>
  )
}