import "./global.css"
import { Stack, Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { GameProvider } from "../Contexts/GameContext";
import { MenusProvider } from "../Contexts/MenusContext";
export default function RootLayout() {
  return (
    <GameProvider>
      <MenusProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "home" }}
          />
          <Stack.Screen
            name="room"
            options={{ headerShown: false, title: "room" }}
          />
          <Stack.Screen
            name="joinGame"
            options={{ headerShown: false, title: "joinGame" }}
          />
          <Stack.Screen
            name="Game"
            options={{ headerShown: false, title: "Game" }}
          />
        </Stack>
      </MenusProvider>
    </GameProvider>
  );
}
