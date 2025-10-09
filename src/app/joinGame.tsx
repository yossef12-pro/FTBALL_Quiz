import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useGame } from "../Contexts/GameContext";
const JoinGame = () => {
 const {error, setError,setRoom,} = useGame()
  const router = useRouter()
  const {joinRoom,PlayerNametwo} = useGame()
  const [roomCode, setRoomCode] = useState<string>("")
  const handleJoinRoom = async () => {
  setError(null); 

  const result = await joinRoom(Number(roomCode), PlayerNametwo);

  if ('error' in result) {
    // ابطل التنفيذ لو فيه مشكلة
    return;
  }

  router.push("/room"); // روح للرووم بس لو مفيش error
};
  return (
    <View className='w-full h-full  justify-center items-center gap-10' >
      <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>

      <Text className='text-4xl text-white font-bold'>Hello {PlayerNametwo}</Text>
        {error&&(<Text className='text-4xl text-red-200 font-bold'>{error}</Text>)}
      <View className='flex flex-row'>
        <TouchableOpacity className='w-40 h-20 bg-white text-black border-2 justify-center items-center' onPress={()=> handleJoinRoom()}><Text className='text-2xl text-center'>join private</Text></TouchableOpacity>
        <TextInput keyboardType='numeric' maxLength={4} className='bg-gray-100 w-40 border-2 text-black font-bold text-4xl' value={roomCode} onChangeText={setRoomCode} onFocus={() => setError(null)}></TextInput>
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

export default JoinGame