import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const Game = () => {
  // State for user's answer
  const [answer, setAnswer] = useState('');
  // State to track which positions have been correctly answered
  const [correctAnswers, setCorrectAnswers] = useState(Array(10).fill(false));
  // State to track the current position being attempted
  const [currentPosition, setCurrentPosition] = useState(0);

  // Function to check if the answer is correct
  const checkAnswer = () => {
    const formattedAnswer = answer.trim().toLowerCase();
    const correctAnswer = topPlayers[currentPosition].toLowerCase();
    
    if (formattedAnswer === correctAnswer) {
      // Create a new array with the current position marked as correct
      const newCorrectAnswers = [...correctAnswers];
      newCorrectAnswers[currentPosition] = true;
      setCorrectAnswers(newCorrectAnswers);
      
      // Move to the next position if not at the end
      if (currentPosition < 9) {
        setCurrentPosition(currentPosition + 1);
      }
    }
    
    // Clear the input field
    setAnswer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liverpool FC Legends Quiz</Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          What are the best 10 Liverpool players in history?
        </Text>
        <Text style={styles.instruction}>
          Enter player #{currentPosition + 1}:
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          placeholder="Enter player name"
          onSubmitEditing={checkAnswer}
        />
        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.leaderboard}>
        {topPlayers.map((player, index) => (
          <View 
            key={index} 
            style={[
              styles.playerRow,
              correctAnswers[index] && styles.correctAnswer
            ]}
          >
            <Text style={styles.position}>{index + 1}</Text>
            <Text style={styles.playerName}>
              {correctAnswers[index] ? player : '???'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#C8102E', // Liverpool red
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#C8102E', // Liverpool red
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  leaderboard: {
    flex: 1,
  },
  playerRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 8,
  },
  correctAnswer: {
    backgroundColor: '#4CAF50', // Green for correct answers
  },
  position: {
    width: 30,
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
  },
});

export default Game