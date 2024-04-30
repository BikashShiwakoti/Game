import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    fetch('http://10.0.2.2:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        navigation.navigate('MathGame', {username});
        setUsername('');
        setPassword('');
      } else {
        setUsername('');
        setPassword('');
        setErrorMsg(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
       <Image source={require('../Images/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Login to Math Game</Text>

      <Text style = {styles.info}>
        Login to continue ......
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontSize: 'bold',
    fontWeight: 29,
  },
  logo: {
    width: 90, 
    height: 90, 
    marginBottom: 20, 
    paddingBottom: 50,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  info: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 38,
    color: '#075557',
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#963547',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 26,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
