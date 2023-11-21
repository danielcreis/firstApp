import { Text, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const MY_API_KEY = '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'

  const handleSend = async (newMessages = []) => {
    try {

      const userMessage = newMessages[0];

   
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      // @ts-ignore
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['comida', 'receita', 'food', 'dieta', 'fruta'];

      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: 'Eu sou um gerador de receitas de comida, pergunte-me qualquer coisa relacionada a comidas.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Gerador de Receitas'
          }
        };
        // @ts-ignore
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }

      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Get me a recipe for ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MY_API_KEY}`
          }
        }
      );

      
      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Gerador de Receitas',
        }
      };
      // @ts-ignore
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
      const navigation = useNavigation();
      // @ts-ignore
      navigation.navigate('Historico', { historico: [recipe] });
    } catch (error) {
     
      // @ts-ignore
      if (error.response && error.response.status === 429) {
        // @ts-ignore
        const retryAfter = error.response.headers['retry-after'];
        if (retryAfter) {
          const waitTime = parseInt(retryAfter, 10) * 1000;
          
          setTimeout(() => handleSend(newMessages), waitTime);
        } else {
          
        }
      }
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gerador de Receitas</Text>
      </View>
      <GiftedChat
        messages={messages}
        // @ts-ignore
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
        placeholder='Gere a sua receita..'
        renderSend={props => (
          <Send {...props}>
            <View style={styles.sendButton}>
              <Icon name="arrow-right" size={24} color="#010101" />
            </View>
          </Send>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C393F',
  },
  header: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
});