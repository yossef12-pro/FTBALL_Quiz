import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import { useMenus } from '../Contexts/MenusContext';
import { collection, query, where, getDoc, addDoc,doc, updateDoc, arrayUnion, onSnapshot,deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig.js';
import { useGame } from '../Contexts/GameContext';
const Game = () => {
const {room,playerName} = useGame();
const{randomQuestion,questionAnswers,checkAnswer,revealedAnswers,currentRoom,currentIndex} = useMenus()
const players = room.players
const [answer, setAnswer] = useState("");
const roomId = room.roomId

const handleSubmit = async () => {
  if (!answer.trim()) return;
  console.log(playerName)
  console.log(currentIndex)
  try {
    await checkAnswer(roomId, players, answer,questionAnswers);
    setAnswer("");
  } catch (error) {
    console.error("Error checking answer:", error);
  }
};


  return (
    <View className="flex-1 items-center justify-center relative">

      <Image
        source={require("../../assets/background.jpg")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />


      <View className="absolute inset-0 bg-black/50" />
       

      <View className="w-full max-w-md items-center gap-14">
        <View className="w-full flex-row justify-between items-center mb-6 p-5">
          <View className="items-center">
            <Text className="text-white font-bold text-lg">{players[0].name} </Text>
            <Text className="text-yellow-400 font-semibold text-base">نقاط: 15</Text>
          </View>

          <View className="items-center bg-white/20 px-6 py-2 rounded-full border border-white/30">
            <Text className="text-white text-xl font-bold">⏱️ 42</Text>
          </View>

          <View className="items-center">
            <Text className="text-white font-bold text-lg">{players[1].name}</Text>
            <Text className="text-yellow-400 font-semibold text-base">نقاط: 20</Text>
          </View>
        </View>
       <Text className='text-2xl font-bold text-white 'adjustsFontSizeToFit
        numberOfLines={1}>    {randomQuestion as any}   </Text>

        <View className="flex-row flex-wrap justify-between gap-4 mb-8 drop-shadow-2xl shadow-black">
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={i}
              className={`w-[48%] bg-white/15 rounded-xl border border-white/25 p-3 items-center justify-center ${revealedAnswers?.includes(questionAnswers?.[i]?.answer)?"bg-green-500 border-red-100 border-2":"bg-neutral-700"} `}
            >
              <Text className="text-white text-lg font-semibold  ">
                        {questionAnswers?.[i]?.answer}   {questionAnswers?.[i]?.rank} 
              </Text>
            </View>
          ))}
        </View>


        <View className="w-full flex-row items-center gap-3">
          <TextInput
            placeholder="اكتب إجابتك هنا..."
            placeholderTextColor="#ccc"
            className={`flex-1 bg-white/15 text-white px-4 py-3 rounded-xl border border-white/25`}
            value={answer}
            onChangeText={setAnswer}
           editable= {players[currentIndex].name === playerName.name}
          />
          <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-xl active:scale-95" onPress={handleSubmit}>
            <Text className="text-white font-semibold text-base">إرسال</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default Game