import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MathGameScreen = ({ navigation, route }) => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 100) + 1);
  const [userInput, setUserInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState('');
  const { username } = route.params;

  const handleAnswer = async () => {
    if (userInput === '') {
      setErrorMsg('Please provide an answer.');
    } else {
      const sum = num1 + num2;
      const userAnswer = parseInt(userInput);
      const result = userAnswer === sum ? 'correct' : 'incorrect'; 
      setResult(result);
  
      fetch('http://10.0.2.2:3000/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, result }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          console.log("Data Updated")
        }
      })
      .catch(error => console.error('Error :', error));
  
      navigation.navigate('GameResult', { userAnswer: userInput, correctAnswer: sum });
      setNum1(Math.floor(Math.random() * 100) + 1);
      setNum2(Math.floor(Math.random() * 100) + 1);
      setUserInput('');
      setErrorMsg('');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          Can you solve this math problem?
          Enter the correct answer in the input field below.
          Click submit answer to check answer.
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>What is the result of:</Text>
        <Text style={styles.equation}>{num1} + {num2} = ?</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        value={userInput}
        onChangeText={setUserInput}
        keyboardType="numeric"
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>Submit Answer</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  instructionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  equation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default MathGameScreen;
