import React, { useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, BackHandler, Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get('screen');

interface ChatbotProps {
  embedToken: string | null;
  bridgeName: string | null;
  threadId: string | null;
  openInContainer?: boolean;
  hideIcon?: boolean;
  defaultOpen?: boolean;
  hideCloseButton?: boolean;
  variables?: any;
}

const ChatBot: React.FC<ChatbotProps> = (props) => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const { embedToken, bridgeName, threadId = "", openInContainer = false, hideIcon = false, defaultOpen = false, hideCloseButton = false, variables = {} } = props || {};

  const webViewRef = useRef(null);

  const [chatbotProps, setChatbotProps] = useState<any>({ ...props });

  // Update state when props change
  useEffect(() => {
    setChatbotProps((prevProps: any) => ({
      bridgeName: bridgeName || prevProps.bridgeName,
      threadId: threadId || prevProps.threadId,
      variables: { ...prevProps.variables, ...(variables || {}) }
    }));
  }, [props]);

  const handleEvent = (event: any) => {
    if (event?.type === 'openChatbot') {
      setIsWebViewVisible(true);
    } else if (event?.type === 'closeChatbot') {
      setIsWebViewVisible(false);
    }
    else if (event?.type === 'SendDataToChatbot') {
      const data = event.data;
      setChatbotProps((prevProps: any) => ({
        ...prevProps,
        ...data
      }));
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleCloseChatbot);
    DeviceEventEmitter.addListener('openChatbot', handleEvent);
    DeviceEventEmitter.addListener('closeChatbot', handleEvent);
    DeviceEventEmitter.addListener('SendDataToChatbot', handleEvent);
    return () => {
      DeviceEventEmitter.removeAllListeners('openChatbot');
      DeviceEventEmitter.removeAllListeners('closeChatbot');
    }
  }, [])

  const handleDataSending = (type: string) => {
    // Ensure WebView is loaded before injecting JS
    let script = "";
    if (webViewRef.current) {
      switch (type) {
        case "sendData":
          script = `
            if (window.SendDataToChatbot) {
              window.SendDataToChatbot(${JSON.stringify(chatbotProps)});
            } else {
              console.log("window.SendDataToChatbot is not available");
            }
          `;
          break;
        case "openChatbot":
          script = `
            if (window.openChatbot) {
              window.openChatbot();
            } else {
              console.log("window.openChatbot is not available");
            }
          `;
          break;
        case "closeChatbot":
          script = `
            if (window.closeChatbot) {
              window.closeChatbot();
            } else {
              console.log("window.closeChatbot is not available");
            }
          `;
          break;
        case "hideCloseButton":
          script = `
            if (window.SendDataToChatbot) {
              window.SendDataToChatbot(${JSON.stringify({ hideCloseButton: true })});
            } else {
              console.log("window.openChatbot is not available");
            }
          `;
          break;
        default:
          console.log("Unknown type");
      }
      webViewRef.current.injectJavaScript(script);  // Inject JavaScript to trigger chatbot opening
    }
  };

  useEffect(() => {
    handleDataSending("sendData");
  }, [chatbotProps]);

  // Handle message from WebView
  const handleOnMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data, 'event from webview');
    if (data?.type === "close") {
      setIsWebViewVisible(false);
    }
  };

  const handleOpenChatbot = () => {
    handleDataSending("openChatbot");
  }
  const handleCloseChatbot = (_: any) => {
    setIsWebViewVisible(false);
    handleDataSending("closeChatbot");
  }

  useEffect(() => {
    if (isWebViewVisible) {
      handleOpenChatbot();
    }
  }, [isWebViewVisible])

  // Create the HTML string with the chatbot script
  const generateHtmlContent = (embedToken: string, bridgeName: string, threadId: string) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chatbot</title>
    </head>
    <body>
      <script
        id="chatbot-main-script"
        embedToken="${embedToken}"
        bridgeName="${bridgeName}"
        threadId="${threadId}"
        async="true"
        src="https://chatbot-embed.viasocket.com/chatbot-prod.js"
        ></script>
    </body>
    </html>
  `;

  const [htmlContent, setHtmlContent] = useState(generateHtmlContent(embedToken, bridgeName, threadId));

  useEffect(() => {
    if (embedToken) {
      setHtmlContent(generateHtmlContent(embedToken, bridgeName, threadId));
    }
  }, [embedToken]);

  const hasNotch = StatusBar.currentHeight > 24;
  const iosKeyboardAvoidingHeight = hasNotch ? height - StatusBar.currentHeight : height - StatusBar.currentHeight * 3;
  // const hasNotch = false;

  if (!embedToken) {
    return (
      null
    )
  }

  return (
    <>
      {!hideIcon && <TouchableOpacity onPress={() => setIsWebViewVisible(true)} style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        zIndex: 99999,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }} >
        <Image
          source={require("./assets/whiteIcon.png")}
          style={{ width: 30, height: 30 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
      }
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: isWebViewVisible ? openInContainer ? '100%' : width : 0,
          height: isWebViewVisible ? openInContainer ? '100%' : '100%' : 0,
          zIndex: 999999 // Ensure the z-index is the highest
        }}>
        <StatusBar
          translucent={isWebViewVisible ? false : null}
          backgroundColor={null} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{
            width: isWebViewVisible ? openInContainer ? '100%' : width : 0,
            height: isWebViewVisible ? (openInContainer ? '100%' : (Platform.OS === 'android' ? '100%' : iosKeyboardAvoidingHeight)) : 0,
          }}
        >
          <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 30 : 0 }} >
            <WebView
              ref={webViewRef}  // Reference the WebView
              source={{ html: htmlContent }}  // Pass the HTML content
              style={[
                styles.webview
              ]}
              containerStyle={{ flex: 1 }}
              scalesPageToFit={false}
              scrollEnabled={false}
              // cacheMode='LOAD_CACHE_ELSE_NETWORK'
              cacheEnabled={false}
              allowingReadAccessToURL="*"
              sharedCookiesEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadEnd={() => {
                // You can call the method to open the chatbot once it is loaded
                handleDataSending("sendData");
                if (defaultOpen) {
                  handleDataSending("openChatbot");
                  setIsWebViewVisible(true);
                }
                if (hideCloseButton) {
                  handleDataSending("hideCloseButton");
                }
              }}
              onMessage={handleOnMessage}  // Listen to messages from WebView
              onError={(error) => console.log('error', error)}
              onHttpError={(error) => console.log('http error', error)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,  // Make sure the WebView takes up the full screen
  },
});

export default ChatBot;