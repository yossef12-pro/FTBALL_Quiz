import { View, Text, Image, TouchableOpacity ,Pressable, Alert, BackHandler } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGame } from "../Contexts/GameContext";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
export default function Room(){
  const router = useRouter()
   const { room, subscribeToRoom,selectedGame,setSelectedGame,startGame,playerName } = useGame();
   const{leaveRoom,setRoom} = useGame()
   const handleleaveRoom = async () => {
      const roomRef = doc(db, "rooms", room.roomId);
      if (room.players[0]===playerName) {
        await deleteDoc(roomRef);
        setRoom(null);
        
        return;
      }
      leaveRoom(playerName,room)
   }
   useEffect(() => {
    const backAction = () => {
      Alert.alert("تأكيد", "هل تريد مغادرة الغرفة؟", [
        { text: "إلغاء", style: "cancel" },
        { text: "نعم", onPress: async () =>{ handleleaveRoom(),
          router.back();
        },}
      ]);
      return true; // معناها "ما تخرجش تلقائي، أنا هتحكم في السلوك"
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // ننضف عند الخروج من الصفحة
  }, []);
   
   
   
   const handleStartGame = async () => {
           startGame(selectedGame,room)
          if( selectedGame==="القوائم") router.push({pathname: "/Game",})
   }
   useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    if (room?.roomId) {
      // @ts-ignore
      unsubscribe = subscribeToRoom(room.roomId);
    }

    return () => {
      if (unsubscribe) unsubscribe(); // نوقف الاستماع لما الصفحة تتقفل
    };
  }, [room?.roomId]);
if (!room) {
   
    return;
  }
  return (
    <View className='w-full h-full justify-center items-center'>
        <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>

        <View className='w-full bg-white h-fit'><Text className='text-4xl text-black text-center'> Room Code : {room.roomcode}</Text></View>
     <View  className='flex flex-row justify-center items-center gap-40 py-12'>
      {/* USER 1 */}
      <View className=' justify-center items-center gap-4'>
       <AntDesign name="user" size={54} color="yellow" />
       <Text className='text-3xl text-white'> {room.players?.[1]}</Text>
       </View>
       {/* USER 1 */}

      {/* USER 2 */}
      <View className=' justify-center items-center gap-4'>
       <AntDesign name="user" size={54} color="yellow" />
       <Text className='text-3xl text-white'>{room.players?.[0]}</Text>
       </View>
       {/* USER 2 */}
     </View>

     <Text className='font-bold text-white text-6xl mb-20'>PICK A GAME</Text>


      <View className='flex flex-col justify-center items-center gap-10 '>
        <Pressable className={`w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center ${selectedGame === "القوائم" ? "w-60 h-20 bg-yellow-500 border-green-500 border-3 rounded-2xl justify-center items-center" : "w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center"}`} onPress={() => setSelectedGame("القوائم")}>
           <Text className='text-4xl font-bold'>القوائم</Text>
        </Pressable>
        <Pressable className={`w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center ${selectedGame === "المزاد" ? "w-60 h-20 bg-yellow-500 border-green-500 border-3 rounded-2xl justify-center items-center" : "w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center"}`} onPress={() => setSelectedGame("المزاد")}>
           <Text className='text-4xl font-bold'>المزاد</Text>  
        </Pressable>
        <Pressable className={`w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center ${selectedGame === "خمن الاعب" ? "w-60 h-20 bg-yellow-500 border-green-500 border-3 rounded-2xl justify-center items-center" : "w-60 h-20 bg-yellow-500 border-white border-2 rounded-2xl justify-center items-center"}`} onPress={() => setSelectedGame("خمن الاعب")}>
           <Text className='text-4xl font-bold'>خمن الاعب</Text>
        </Pressable>


<View className='flex flex-row gap-10'>
        <TouchableOpacity className='w-28 h-20 bg-red-700 rounded-2xl border-2 border-white justify-center items-center' onPress={() => handleleaveRoom()}>
           <Text className='text-3xl font-bold'>خروج</Text>
           </TouchableOpacity>
        <TouchableOpacity className='w-48 h-20 bg-blue-400 rounded-2xl border-2 border-white justify-center items-center' onPress={handleStartGame}>
           <Text className='text-3xl font-bold'>ابدء اللعبة</Text>
           </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}
