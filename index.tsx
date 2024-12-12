import React, { useState } from 'react';
import { Button, View } from 'react-native';
import Chatbot from './Chatbot';

function Home() {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  return (
    <>
      <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <Button title='Chatbot' onPress={() => setIsWebViewVisible(!isWebViewVisible)} />
      </View>
      <Chatbot isWebViewVisible={isWebViewVisible} setIsWebViewVisible={setIsWebViewVisible}/>
    </>
  )
}

export default Home