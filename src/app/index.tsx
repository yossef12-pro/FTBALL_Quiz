import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
export default function Index() {
  const router = useRouter()
  const [inputValue,setInputvalue] = useState("")
  const createGame = async () =>{
        try{const docRef = await addDoc(collection(db,"rooms"),{
          player: [inputValue],
          createdAt: new Date()
        })
       console.log("Room created with ID: ", docRef.id);

      // بعد ما الروم يتعمل → نروح لصفحة room ومعانا الاسم والـ roomId
      router.push({
        pathname: "/room",
        params: { name: inputValue, roomId: docRef.id },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
      onPress={createGame}
      >
        <Text className="text-2xl font-bold">Create Game</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-80 h-20 bg-white rounded-2xl mb-10 flex items-center justify-center shadow-2xl shadow-black"
      onPress={()=>router.push({pathname:"/joinGame", params :{name:inputValue}})}>
        <Text className="text-2xl font-bold">Join game</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}