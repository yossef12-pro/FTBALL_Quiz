import { View, Text, Image, TouchableOpacity , } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { useLocalSearchParams } from "expo-router";

const CreateGame = ( ) => {
   const { name } = useLocalSearchParams();
  return (
    <View className='w-full h-full justify-center items-center'>
        <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>

        <View className='w-full bg-white h-fit'><Text className='text-4xl text-black text-center'> Room Code : 3425</Text></View>
     <View  className='flex flex-row justify-center items-center gap-40 py-12'>
      {/* USER 1 */}
      <View className=' justify-center items-center gap-4'>
       <AntDesign name="user" size={54} color="yellow" />
       <Text className='text-3xl text-white'> User 2</Text>
       </View>
       {/* USER 1 */}

      {/* USER 2 */}
      <View className=' justify-center items-center gap-4'>
       <AntDesign name="user" size={54} color="yellow" />
       <Text className='text-3xl text-white'> {name}</Text>
       </View>
       {/* USER 2 */}
     </View>

     <Text className='font-bold text-white text-6xl mb-20'>PICK A GAME</Text>


      <View className='flex flex-col justify-center items-center gap-10 '>
        <TouchableOpacity className='w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center'>
           <Text className='text-4xl font-bold'>القوائم</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center'>
           <Text className='text-4xl font-bold'>المزاد</Text>  
        </TouchableOpacity>
        <TouchableOpacity className='w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center'>
           <Text className='text-4xl font-bold'>خمن الاعب</Text>
        </TouchableOpacity>



        <TouchableOpacity className='w-48 h-20 bg-blue-400 rounded-2xl border-2 border-white justify-center items-center'>
           <Text className='text-3xl font-bold'>ابدء اللعبة</Text>
           </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateGame