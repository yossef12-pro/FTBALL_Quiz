import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { doc, updateDoc, arrayUnion, onSnapshot,deleteDoc } from 'firebase/firestore';
import { router } from 'expo-router';
export const createGame = async (playerName) =>{
    
    const roomCode =Math.floor(1000 + Math.random()*9000)
        try{const docRef = await addDoc(collection(db,"rooms"),{
          players: [playerName],
          createdAt: new Date(),
          roomcode: roomCode,
          statue: "waiting"
        })
       console.log("Room created with ID: ", docRef.id);
return {
      roomId: docRef.id,
      roomcode: roomCode,
      players: [playerName],
      status: "waiting",
      host: playerName
    };
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
    
  };


  export const getRoomByCode = async (roomCode) => {
  // 1. Create a query to find the room
  const roomsRef = collection(db, "rooms");
  const q = query(roomsRef, where("roomcode", "==", roomCode));
  
  
  // 2. Execute the query
  const querySnapshot = await getDocs(q);
  
  // 3. Check if we found a room
  if (querySnapshot.empty) {
    return null;  // No room found
  }
  
  // 4. Get the first room (there should only be one)
  const roomDoc = querySnapshot.docs[0];
  // 6. Check if the room is full
  if (roomDoc.data().players.length >= 2) {
    return {full: true} ; // أو ترجع Error
  }
  
  // 5. Return room data with its ID
  return {
    roomId: roomDoc.id,
    ...roomDoc.data()
  };
};


export const joinRoom = async (roomCode, playerNametwo) => {
  // 1. Find the room first
  const room = await getRoomByCode(roomCode);
  
  // 2. Check if room exists
  if (!room) {
    return {error: "Room is Not Found !"};
  }
  if(room.full){
    return {error: "Room is Full !"};
  }
  
  
  // 4. Add player to the room
  const roomRef = doc(db, "rooms", room.roomId);
  
  await updateDoc(roomRef, {
    players: arrayUnion(playerNametwo)
  });
  
  // 5. Return updated room data
  return {
    roomId: room.roomId,
    roomCode: room.roomcode,
    players: [...room.players, playerNametwo]
  };
};



// Listen to Room Realtime Updates
export const listenToRoom = (roomId, callback) => {
  const roomRef = doc(db, "rooms", roomId);
  const unsubscribe = onSnapshot(roomRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({
        roomId: docSnap.id,
        ...docSnap.data()
      });
    } else {
      console.log("Room not found!");
      callback(null);
    }
  });

  return unsubscribe;
};



export const startGame = (selectedGame, roomId) => {
  const roomRef = doc(db,"rooms",roomId)
  updateDoc(roomRef,{
    status: "playing",
    game: selectedGame
  })
}

export const leaveRoom = async (playerName, room) => {
  if (!room) return;

  const roomRef = doc(db, "rooms", room.roomId);


  const newPlayers = room.players.filter((p) => p !== playerName);
  await updateDoc(roomRef, { players: newPlayers });
};