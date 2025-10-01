import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'

const joinGame = () => {
  return (
    <View className='w-full h-full  justify-center items-center gap-10' >
      <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>


      <View className='flex flex-row'>
        <TouchableOpacity className='w-40 h-20 bg-white text-black border-2 justify-center items-center'><Text className='text-2xl text-center'>join private</Text></TouchableOpacity>
        <TextInput keyboardType='numeric' maxLength={4} className='bg-gray-100 w-40 border-2 text-black font-bold text-4xl'></TextInput>
      </View>



      <View className='gap-10 mt-20 '>
      <View className='flex flex-row justify-between items-center w-fit h-20 rounded-2xl bg-white border-2 gap-10 p-3'>
        <Text>Game_Name</Text>
        <Text>player_Name</Text>
        <TouchableOpacity className=' bg-white text-black justify-center items-center'><Text className='text-2xl text-center'>Join</Text></TouchableOpacity>
      </View>
      <View className='flex flex-row justify-between items-center w-fit h-20 rounded-2xl bg-white border-2 gap-10 p-3'>
        <Text>Game_Name</Text>
        <Text>player_Name</Text>
        <TouchableOpacity className=' bg-white text-black justify-center items-center'><Text className='text-2xl text-center'>Join</Text></TouchableOpacity>
      </View>
      <View className='flex flex-row justify-between items-center w-fit h-20 rounded-2xl bg-white border-2 gap-10 p-3'>
        <Text>Game_Name</Text>
        <Text>player_Name</Text>
        <TouchableOpacity className=' bg-white text-black justify-center items-center'><Text className='text-2xl text-center'>Join</Text></TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default joinGame