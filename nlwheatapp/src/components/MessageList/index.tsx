import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message'
import { styles } from './styles';

const messagesQueue: MessageProps[] = [];
const socket = io(String(api.defaults.baseURL));

socket.on('new_message', (newMessage: MessageProps) => {
  messagesQueue.push(newMessage);
})

export function MessageList(){
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean));

        messagesQueue.shift();
      }
    }, 3000)
  }, []);

  useEffect(() => {
    async function fetchMessages(){
      const messages = await api.get<MessageProps[]>('messages/last3');
      setCurrentMessages(messages.data);
    }
    fetchMessages();
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {
        currentMessages.map(message =>
          <Message key={message.id} data={message} />
        )
      }
    </ScrollView>
  );
}
