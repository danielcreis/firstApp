import { Text, TextInput, View, Image } from "react-native";
import { styles } from './styles'


export default function Home() {
  return (
    <View style={styles.container}>

      <Image source={require('../../../assets/logo.png')} style={{
        width: 200,
        height: 200,
      }} resizeMode="contain" />
      <Text style={styles.eventName}>Cadastramento de Clientes</Text>

      <TextInput style={styles.input}
        placeholder='Nome do Aluno'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='Matrícula'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='Logradouro'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='Número'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='Bairro'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='CEP'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='Cidade'
        placeholderTextColor='#6b6b6b'
      />
      <TextInput style={styles.input}
        placeholder='UF'
        placeholderTextColor='#6b6b6b'
      />
      
    </View >
  )
}