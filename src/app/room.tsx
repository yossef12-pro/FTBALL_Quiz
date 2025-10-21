import { View, Text, Image, TouchableOpacity ,Pressable, Alert, BackHandler } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGame } from "../Contexts/GameContext";
import { useMenus } from "../Contexts/MenusContext";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { getRandomQuestion } from '../Firebase/games';
export default function Room(){
  
  
  const router = useRouter()
   const { room, subscribeToRoom,selectedGame,setSelectedGame,startGame,playerName } = useGame();
   const {startMenusGame,questions,randomQuestion} = useMenus()
   const games = ["القوائم","المزاد","خمن الاعب"]
   const{leaveRoom,setRoom} = useGame()
   const players = room.players
   const roomId = room.roomId
   
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


          if( selectedGame==="القوائم"){ 
            startMenusGame(roomId,players,questions,randomQuestion!)
            
          }}      

if (!room) { return; }



  return (
    <View className='w-full h-full justify-center items-center'>
        <Image source ={require("../../assets/background.jpg")} className="w-full h-full absolute"/>

        <View className='w-full bg-white h-fit'><Text className='text-4xl text-black text-center'> Room Code : {room.roomcode}</Text></View>
     <View  className='flex flex-row justify-center items-center gap-40 py-12'>
      {/* USER 1 */}
{room.players?.[1] && (
  <View className='justify-center items-center gap-4'>
    <AntDesign name="user" size={54} color="yellow" />
    <Text className='text-3xl text-white'>{room.players[1].name}</Text>
  </View>
)}

{/* USER 2 */}
{room.players?.[0] && (
  <View className='justify-center items-center gap-4'>
    <AntDesign name="user" size={54} color="yellow" />
    <Text className='text-3xl text-white'>{room.players[0].name}</Text>
  </View>
)}
     </View>

     <Text className='font-bold text-white text-6xl mb-20'>PICK A GAME</Text>


      <View className='flex flex-col justify-center items-center gap-10 '>
        <View className=" justify-center items-center gap-12 bg-gray-500/5 w-60 h-50">
      {games.map((game) => {
        const isSelected = selectedGame === game;

        return (
          <Pressable key={game} onPress={() => setSelectedGame(game)}
            className={`rounded-2xl justify-center items-center h-20 w-[220px] 
              ${isSelected 
                ? "bg-yellow-400 border-[3px] border-black" 
                : "bg-yellow-400/80 border border-white"
              } 
            `}
          >

              <Text className="text-4xl font-bold text-black">{game}</Text>
          </Pressable>
        );
      })}
    </View>

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
