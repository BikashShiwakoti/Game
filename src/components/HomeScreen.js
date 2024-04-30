// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
 


  const handleLogin = () => {
    navigation.navigate('Login')
  };
  

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Math Game</Text>
      <Text style={styles.info}>Login if you already have an account else
      signup for new account.</Text>
       <Image source={require('../Images/logo.jpg')} style={styles.logo} />


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
    width: 250, 
    height: 400, 
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
    color: '#db9b07',
    fontSize: 20,
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
});

export default HomeScreen;
