import "./global.css"
import { Stack, Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { GameProvider } from "../Contexts/GameContext";
export default function RootLayout() {
  return <GameProvider>
  <Stack>
    <Stack.Screen
    name="index"
    options={{headerShown:false,title:"home"}}
    />
    <Stack.Screen
    name="room"
    options={{headerShown:false,title:"home"}}
    />
    <Stack.Screen
    name="joinGame"
    options={{headerShown:false,title:"home"}}
    />
    <AntDesign name="home" size={24} color="black" />
  </Stack>
  </GameProvider>
}
