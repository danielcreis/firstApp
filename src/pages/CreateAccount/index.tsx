import { Text, TextInput, View, Image, TouchableOpacity, Pressable, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles'
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebaseconfig.js'



export default function Home() {

  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigation = useNavigation();


  function handleCreateAccount() {

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }


    addDoc(collection(db, "users"), {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
      .then(() => {

        setName('');
        setEmail('');
        setPassword('');
        setconfirmPassword('');
        setPasswordsMatch(true);
        // @ts-ignore
        navigation.navigate('Users');
      })
      .catch((error) => {
      });
  }


  return (
    <View style={styles.container}>

      <Image source={require('../../assets/logo.png')} style={{
        width: 200,
        height: 200,
        marginLeft: 70,
      }} resizeMode="contain" />
      <Text style={styles.eventName}>Crie sua Conta</Text>

      <TextInput style={styles.input}
        placeholder='Nome Completo'
        placeholderTextColor='#6b6b6b'
        value={username}
        onChangeText={(username) => { setName(username) }}
      />
      <TextInput style={styles.input}
        value={email}
        onChangeText={(email) => { setEmail(email) }}
        placeholder='email'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        value={password}
        onChangeText={(password) => { setPassword(password) }}
        secureTextEntry={true}
        placeholder='senha'
        placeholderTextColor='#6b6b6b'
      />

      <TextInput style={styles.input}
        value={confirmPassword}
        onChangeText={(confirmPassword) => {
          setconfirmPassword(confirmPassword);
          setPasswordsMatch(true);
        }}
        secureTextEntry={true}
        placeholder='confirmar senha'
        placeholderTextColor='#6b6b6b'
      />

      {!passwordsMatch && (
        <Text style={{ color: 'red' }}>As senhas não coincidem. Tente novamente.</Text>
      )}


      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>


      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22
      }}>
        <Text style={{ fontSize: 16, color: "#FFF" }}>Possui conta?</Text>
        <Pressable
          // @ts-ignore
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={{
            fontSize: 16,
            color: '#633BBC',
            fontWeight: "bold",
            marginLeft: 6
          }}>Clica aqui para acessar.</Text>
        </Pressable>
      </View>

    </View >
  )
}