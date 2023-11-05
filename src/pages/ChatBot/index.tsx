import { Text, View } from 'react-native'
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
      // Obtenha a mensagem do usuário
      const userMessage = newMessages[0];

      // Adicione a mensagem do usuário ao estado de mensagens
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
      // @ts-ignore
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
      const navigation = useNavigation();
        // @ts-ignore
      navigation.navigate('Historico', { historico: [recipe] });
    } catch (error) {
      console.log(error);
      // @ts-ignore
      if (error.response && error.response.status === 429) {
        // @ts-ignore
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
    <View style={{ flex: 1, backgroundColor: '#3C393F' }}>
      <View style={{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 40,
        marginBottom: 5,
      }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', backgroundColor: '#3C393F' }}>
          Gerador de Receitas
        </Text>
      </View>
      <GiftedChat messages={messages} onSend={newMessages => handleSend(newMessages)} user={{ _id: 1 }} placeholder='Gere a sua receita..' renderSend={props => (
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 5 }}>
            <Icon name="arrow-right" size={24} color="#010101" />
          </View>
        </Send>
      )}
      />
    </View>
  );
}

