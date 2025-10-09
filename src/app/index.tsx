import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGame } from "../Contexts/GameContext";
export default function Index() {
  const router = useRouter()
  const [inputValue,setInputvalue] = useState("")
const [loading,setLoading] = useState(false)
  const {createGame,error, setError,setPlayerNametwo,setPlayerName} = useGame()


  const handleCreateGame = async () => {
if (!inputValue.trim()) {
    alert("Please enter your name first!");
    return;
  }

    if (loading) return;
  setLoading(true);
  setPlayerName(inputValue)
  await createGame(inputValue,  router);
  
    setLoading(false);
    router.push({
    pathname: "/room",
    params: { name: inputValue ,},
  });
};




const handleJoinGame = async () => {
  if(error){
    setError(false)
  }
  if (!inputValue.trim()) {
    alert("Please enter your name first!");
    return;
  }
  setPlayerNametwo(inputValue)
  
    router.push({
    pathname: "/joinGame",
    params: { name: inputValue ,},
  });
};

  return (
    <View className="w-full h-full bg-red-500 justify-center items-center">
      <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>
<View className="flex flex-col justify-center items-center gap-10">
      <Text className="text-5xl font-extrabold = text-white">Enter Your Name</Text>
      <TextInput
      placeholder="Your name"
className=" w-80 h-20 rounded-2xl border-2 border-white text-2xl text-white"
value= {inputValue}
onChangeText={setInputvalue}
    />
</View>


      <View className="flex top-40">
      <TouchableOpacity className="w-80 h-20 bg-white rounded-2xl mb-10 flex items-center justify-center shadow-2xl shadow-black"
       
      >
        <Text className="text-2xl font-bold" onPress={() => handleCreateGame()}>Create Game</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-80 h-20 bg-white rounded-2xl mb-10 flex items-center justify-center shadow-2xl shadow-black"
      onPress={()=>handleJoinGame()}>
        <Text className="text-2xl font-bold">Join game</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

