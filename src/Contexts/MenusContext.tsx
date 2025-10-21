import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import {
  getRandomQuestion as getRandomQuestionDB,
  startGame as startGameDB,
  startTimer as startTimerDB,
  checkAnswer as checkAnswerDB,
  switchTurn as switchTurnDB,
  endGame as endGameDB,
} from "../Firebase/games";
import { useGame } from "../Contexts/GameContext";
import questions from "../Firebase/questions.json" with { type: "json" };
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { router } from "expo-router";


export interface Player {
  id: string;
  name: string;
  points: number;
}

export interface Question {
  id: number;
  question: string;
  answers: { rank: number; answer: string }[];
}

interface MenusContextType {
  currentRoom: string | null;
  players: Player[];
  question: Question | null;
  isGameActive: boolean;
  randomQuestion: Question | null;
  questionAnswers:any
  revealedAnswers?: string[];
  currentIndex:number|any;
  questions: {
  id: number;
  question: string;
  answers: { rank: number; answer: string }[];
  revealedAnswers?:string[]; 
}[];
  // ✅ Game actions
  startMenusGame: (room: string, players: Player[] ,questions: Question[], randomQuestion: Question) => Promise<void>;
  startTimer: (roomId: string) => Promise<void>;
  checkAnswer: (
    roomId: string,
    playerId: string,
    answer: string,
    correctAnswer: string,
  ) => Promise<void>;
  switchTurn: (roomId: string) => Promise<void>;
  endGame: (roomId: string, players: Player[]) => Promise<void>;
}

// =========================
// 🧠 Context
// =========================

const MenusContext = createContext<MenusContextType | undefined>(undefined);

interface MenusProviderProps {
  children: ReactNode;
}

export const MenusProvider: React.FC<MenusProviderProps> = ({ children }) => {
const { room,setRoom, playerName, startGame,subscribeToRoom } = useGame();
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  useEffect(() => {if (room?.roomId) setCurrentRoom(room.roomId);}, [room]);
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState<Question[]>(questions);
  const [questionAnswers, setQuestionAnswers] = useState<any>(null);
const [allQuestions, setAllQuestions] = useState<Question[]>([]);
const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);
const [points, setPoints] = useState<string[]>([]);
const [currentIndex, setCurrentIndex] = useState<number>();
const ingame = useRef <boolean>(false)

  // =========================
  // 🔥 Game logic wrappers
  // =========================
   useEffect(() => {
  if (!currentRoom) return;

  // احفظ roomId محليًا عشان لو currentRoom اتغيّر تبقى الLogs واضحة
  const rid = currentRoom;
  console.log("Effect subscribe for", rid);

  // نخزن الدالة في ref لنضمن الوصول إليها من cleanup
  const unsubRef = { current: null as (() => void) | null };
  
  unsubRef.current = subscribeToRoom(rid, (data) => {
    if (!data) return;
    setRandomQuestion(data.currentQuestion)
    setQuestionAnswers(data.currentQuestionAnswers)
    setRevealedAnswers(data.revealedAnswers || []);
    setCurrentIndex(data.currentPlayerIndex ?? 0);
    if(data.status === "playing" && !ingame.current){
      ingame.current = true
       router.push({pathname: "/Game",})
   }});

  return () => {
    console.log("Cleanup for", rid, "unsubRef:", unsubRef.current);
    if (unsubRef.current && typeof unsubRef.current === "function") {
      unsubRef.current();
      unsubRef.current = null;
    } else {
      console.warn("No valid unsubscribe function for", rid);
    }
  };
}, [currentRoom]);

  
  
  useEffect(() => {
  setAllQuestions(questions);
}, []);
  
  const startMenusGame = async (room: string, players: Player[]) => {
    setIsGameActive(true);
  const fetchedQuestions = allQuestions;
  
 if (!allQuestions.length) {
  console.error("Questions not loaded yet");
  return;
}

const { randomQuestion, questionAnswers } = getRandomQuestionDB(fetchedQuestions);


  
await startGameDB(room, players, fetchedQuestions, randomQuestion,questionAnswers);
setRandomQuestion(randomQuestion);
setQuestionAnswers(questionAnswers);
  

  
};

  const startTimer = async (roomId: string) => {
    await startTimerDB(roomId);
  };

  const checkAnswer = async (
    roomId: string,
    playerId: string,
    answer: string,
    correctAnswer: string,
  ): Promise<void> => {
    return await checkAnswerDB(roomId, playerId, answer, correctAnswer);
  };

  const switchTurn = async (roomId: string) => {
    await switchTurnDB(roomId);
  };

  const endGame = async (roomId: string, players: Player[]) => {
    await endGameDB(roomId, players);
    setIsGameActive(false);
  };

  // =========================
  // 💡 Provider Value
  // =========================

  const value: MenusContextType = {
    currentRoom,
    players,
    question,
    isGameActive,
    startMenusGame,
    startTimer,
    checkAnswer,
    switchTurn,
    endGame,
    questions: questionsList,
    randomQuestion,
    questionAnswers,
    revealedAnswers,
    currentIndex,
  };

  return <MenusContext.Provider value={value}>{children}</MenusContext.Provider>;
};

// =========================
// 🪄 Hook
// =========================
export const useMenus = (): MenusContextType => {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("useMenus must be used within a MenusProvider");
  }
  return context;
};

