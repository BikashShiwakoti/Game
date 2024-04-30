import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";



const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMsg("Password does not match. Try again !!");
    } else if (password === '') {
      setErrorMsg('Password cannot be empty!');
    } else if(password.length != 5){
      setErrorMsg('Password should have minimum of five length. ')
    }
     else {
      fetch('http://10.0.2.2:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          console.log("Signup:", data.message);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setErrorMsg('Signup Sucessfull !!! Loin to continue..');
          navigation.navigate('Login');
          
        } else {
          setErrorMsg(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image source={require('../Images/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Signup for Guesstimate</Text>

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: 'white', fontSize: 20 }}>Sign Up</Text>
      </TouchableOpacity>

      <Text>
        Already have an account {' '}
        <Text style={styles.loginLink} onPress={handleLogin}>
          Login
        </Text>
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 90, 
    height: 90, 
    marginBottom: 20, 
    paddingBottom: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 50,
  },
  inputBox: {
    borderWidth: 3,
    borderColor: 'grey',
    margin: 10,
    padding: 10,
    width: 250,
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'black',
    width: 110,
    borderRadius: 18,
    fontSize: 30,
    padding: 20,
    marginTop: 70,
    marginBottom: 40,
  },
  loginLink: {
    color: 'blue', 
    pointerEvents: 'auto',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  
});

export default SignupScreen;
