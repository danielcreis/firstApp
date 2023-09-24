import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'


export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const MY_API_KEY = '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'

  const handleSend = async (newMessages = []) => {
    try {
      // Obtenha a mensagem do usuário
      const userMessage = newMessages[0];
  
      // Adicione a mensagem do usuário ao estado de mensagens
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
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
  
      console.log(response.data);
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
  
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        if (retryAfter) {
          const waitTime = parseInt(retryAfter, 10) * 1000;
          console.log(`Aguarde ${waitTime / 1000} segundos antes de tentar novamente.`);
          setTimeout(() => handleSend(newMessages), waitTime);
        } else {
          console.log('Limite de taxa excedido. Aguarde um tempo antes de tentar novamente.');
        }
      }
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: '#f5f5f5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 40,
        marginBottom: 5,
      }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
          Gerador de Receitas
        </Text>
      </View>
      <GiftedChat messages={messages} onSend={newMessages => handleSend(newMessages)} user={{ _id: 1 }} />


    </View>
  );
}

