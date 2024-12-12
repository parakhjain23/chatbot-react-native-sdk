import React, { useState } from 'react';
import { Button, View } from 'react-native';
import Chat from './Chat';

function ChatBot() {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  return (
    <>
      <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <Button title='Chatbot' onPress={() => setIsWebViewVisible(!isWebViewVisible)} />
      </View>
      <Chat isWebViewVisible={isWebViewVisible} setIsWebViewVisible={setIsWebViewVisible}/>
    </>
  )
}

export default ChatBot