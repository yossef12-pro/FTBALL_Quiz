import { collection, query, where, getDocs, addDoc,doc, updateDoc, arrayUnion, onSnapshot,deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';
import questions from "./questions.json" with { type: "json" };
export const uploadQuestions= async() =>{
 const questionsRef = collection(db,"questions")
 for (const q of questions) {
    await addDoc(questionsRef, q);
  }
};
uploadQuestions();


// GAME LOGIC


let currentPlayerIndex = 0;
let timer = null;
let timeLeft = 60;
let isAnswered = false;

const getRandomQuestion = (questions) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];
  return randomQuestion;
};




export const startGame = (randomQuestion, players) => {
  if (!randomQuestion || !players || players.length !== 2) {
    return;
  }

  console.log("🎮 Game started!");
  console.log("Question:", randomQuestion.question);
  console.log(`Player ${players[currentPlayerIndex].name} starts first!`);

  startTurn(players);
};

const startTurn = (players) => {
  isAnswered = false;
  timeLeft = 60;
  const currentPlayer = players[currentPlayerIndex];

  console.log(`⏳ ${currentPlayer.name}'s turn started!`);

  timer = setInterval(() => {
    timeLeft--;

    process.stdout.write(`\rTime left: ${timeLeft}s`);

    if (timeLeft <= 0 && !isAnswered) {
      clearInterval(timer);
      console.log(`\n⏰ ${currentPlayer.name}'s time is up!`);
      switchTurn(players);
    }
  }, 1000);
};

export const handleAnswer = (players) => {
  if (isAnswered) return; // تجاهل لو جاوب بالفعل

  isAnswered = true;
  clearInterval(timer);
  console.log(`✅ Player ${players[currentPlayerIndex].name} answered!`);

  switchTurn(players);
};

const switchTurn = (players) => {
  currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  startTurn(players);
};
