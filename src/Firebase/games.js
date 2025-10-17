import { collection, query, where, getDocs, addDoc,doc,getDoc, updateDoc, arrayUnion, onSnapshot,deleteDoc } from 'firebase/firestore';
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

export const getRandomQuestion = (questions) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex].question;
  const questionAnswers = questions[randomIndex].answers;
  return { randomQuestion, questionAnswers };
};




export const startGame = async (roomId,players,questions,randomQuestion,questionAnswers) => {
 // if (!questions || !players || players.length !== 2) return;
  
  const roomRef = doc(db, "rooms", roomId);

  await updateDoc(roomRef, {
    status: "playing",
    currentQuestion: randomQuestion,
    currentQuestionAnswers:questionAnswers,
    currentPlayerIndex: 0,
    timeLeft: 60,
    isAnswered: false,
  });


};

export const startTimer = async (roomId) => {

    // لما الوقت يخلص
    if (timeLeft <= 0) {
      console.log("⏰ الوقت خلص!");
      await switchTurn(roomId);
    }
};

export const checkAnswer = async (roomId, playerId, answer, questionAnswers ) => {
  const roomRef = doc(db, "rooms", roomId);
  const normalizedAnswer = answer.trim().toLowerCase();
  const foundIndex = questionAnswers.findIndex(
    (a) => a.answer.trim().toLowerCase() === normalizedAnswer
  );
 console.log(normalizedAnswer)
  if (foundIndex !== -1) {
    const points = questionAnswers[foundIndex].rank;
    const correctAnswer = questionAnswers[foundIndex].answer
    
    await updateDoc(roomRef, {
      points: {points},
      revealedAnswers: arrayUnion(correctAnswer.trim().toLowerCase()),
      isAnswered: true,
      lastAnswer: {
        answer: questionAnswers[foundIndex].answer,
      },
    });

    console.log(`✅ ${answer} موجود في المركز ${points}!`);
  } else {
    await updateDoc(roomRef, {
      lastAnswer: { playerId, answer, points: 0 },
      isAnswered: true,
    });

    console.log(`❌ ${answer} مش في القائمة`);
  }

  await switchTurn(roomId);
};



export const switchTurn = async (roomId) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;

  const data = roomSnap.data();
  const newIndex = data.currentPlayerIndex === 0 ? 1 : 0;

  await updateDoc(roomRef, {
    currentPlayerIndex: newIndex,
    isAnswered: false,
  });
};

export const endGame = async (roomId,players) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;

  const data = roomSnap.data();
  const revealed = data.revealedAnswers || [];
  const scores = data.scores || {};

  const allRevealed = revealed.filter(Boolean).length >= data.currentQuestion.answers.length;

  if (!allRevealed) return;

  // 🧮 حساب النقاط
  const playerIds = Object.keys(scores);
  const player1 = playerIds[0];
  const player2 = playerIds[1];
  const score1 = scores[player1] || 0;
  const score2 = scores[player2] || 0;

  // 🏆 تحديد الفائز
  let winner;
  if (score1 > score2) winner = player1;
  else if (score2 > score1) winner = player2;
  else winner = "draw";

  // 💾 تحديث حالة اللعبة
  await updateDoc(roomRef, {
    status: "finished",
    winner,
    gameEndedAt: Date.now(),
  });
};