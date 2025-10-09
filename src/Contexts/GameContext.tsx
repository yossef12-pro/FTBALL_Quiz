import React, { createContext, useContext, useState } from "react";
import { 
  createGame as createGameInDB, 
  joinRoom as joinRoomInDB, 
  listenToRoom as listenToRoomInDB, 
  startGame as startGameInDB,
  leaveRoom as leaveRoomInDB,
} from "../Firebase/service.js";

type GameContextType = {
  room: any;
  setRoom:any;
  roomCode: number | null;
  setRoomCode: any
  playerName: any
  setPlayerName:any
  PlayerNametwo:any
  setPlayerNametwo:any
  error:any
  setError: any
  selectedGame:any
  setSelectedGame:any
  createGame: (
  playerName: string,
  router: any,
) => Promise<void>;

  leaveRoom: (playerName: string, room: any) => Promise<void>;
  joinRoom: (roomCode: number, playerName: any) => Promise<void>;
  subscribeToRoom: (roomId: string) => void;
  startGame: (selectedGame: string, roomId: string) => Promise<void>;
};


const GameContext = createContext<GameContextType | null>(null);

type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [room, setRoom] = useState<any>(null);
  const [playerName, setPlayerName] = useState<any | null>(null);
  const [roomCode, setRoomCode] = useState<number | null>(null);
  const [PlayerNametwo, setPlayerNametwo] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  
  
 const createGame = async (
  playerName: string,
  router: any
) => {
    
    const newRoom = await createGameInDB(playerName);


    setRoom(newRoom); 
    setRoomCode(newRoom!.roomcode)
    setPlayerName(newRoom!.players[0])
  };

  type JoinRoomResult = 
  | { error: string }
  | { roomId: string; roomCode: number; players: string[] };

const joinRoom = async (
  roomCode: number, 
  playerName: string
): Promise<JoinRoomResult> => {
  const updatedRoom = await joinRoomInDB(roomCode, playerName);

  if ('error' in updatedRoom) {
    setError(updatedRoom.error);
    return updatedRoom; // لازم ترجع object فيه error
  }

  setRoom(updatedRoom);
  setRoomCode(updatedRoom.roomCode);
  return updatedRoom; // object فيه بيانات الغرفة
};
const leaveRoom = async (playerName: string, room: string) => {
    const updatedRoom = await leaveRoomInDB(playerName, room);
    setRoom(updatedRoom)
  };

  const subscribeToRoom = (roomId: string) => {
    return listenToRoomInDB(roomId, (data: any) => {
      setRoom(data);
    });
  };

  const startGame = async (selectedGame: string, roomId: string) => {
    await startGameInDB(selectedGame, roomId);
  };

  return (
    <GameContext.Provider value={{ room, createGame, joinRoom, subscribeToRoom, startGame,roomCode,setRoomCode,setPlayerName,playerName,PlayerNametwo,setPlayerNametwo,error,setError,setRoom,selectedGame,setSelectedGame,leaveRoom}}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
