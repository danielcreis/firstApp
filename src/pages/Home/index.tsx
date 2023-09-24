import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image source={require('../../assets/logo2.png')}
         animation="flipInY"
         style={{ width: '100%', height: 300 }}
          resizeMode='contain'
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Gere sua receita de comida o mais rápido possível!</Text>
        <Text style={styles.text}>Faça o login para começar</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('SignIn')} style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C393F"
  },
  containerLogo: {
    flex:2,
    backgroundColor: "#3C393F",
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  containerForm: {
    flex:1,
    backgroundColor:'#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart:'5%',
    paddingEnd:'5%'

  },
  title: {
    fontSize:24,
    fontWeight: 'bold',
    marginTop: 28, 
    marginBottom: 12,
  },
  text: {
    color: '#a1a1a1a1',
  },
  button:{
    position: 'absolute',
    backgroundColor:'#3C393F',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:  18,
    color: '#FFF',
    fontWeight: 'bold',
  }
})