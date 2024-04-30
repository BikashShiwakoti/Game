import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameResultScreen = ({ route, navigation }) => {
  const { userAnswer, correctAnswer } = route.params;
  const isCorrect = userAnswer == correctAnswer;
  const [leaderboard, setLeaderboard] = useState([]);
    const { username } = route.params;


    const fetchLeaderboard = () => {
      console.log("pressed");
      fetch('http://10.0.2.2:3000/leaderboard') 
     
        .then(response => response.json())
        .then(data => {
          if (data.leaders) {
            console.log("success");
            setLeaderboard(data.leaders);
          }
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
    };
  
    useEffect(() => {
      fetchLeaderboard();
    }, []);

  return (
    <View style={[styles.container, { backgroundColor: isCorrect ? '#4CAF50' : '#F44336' }]}>
      
      <Text style={styles.resultText}>{isCorrect ? 'Correct!' : 'Incorrect!'}</Text>
      <View style={styles.answerContainer}>
        <Text style={styles.labelText}>Your Answer:</Text>
        <Text style={styles.answer}>{userAnswer}</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.labelText}>Correct Answer:</Text>
        <Text style={styles.answer}>{correctAnswer}</Text>
      </View>
      <View>
        
        {leaderboard.length > 0 && (
          <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            {leaderboard.map((username, index) => (
              <Text key={index} style={styles.leaderboardItem}>{index + 1}. {username}</Text>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MathGame',{username})}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#FFF',
  },
  answer: {
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  leaderboardContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  leaderboardItem: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default GameResultScreen;
