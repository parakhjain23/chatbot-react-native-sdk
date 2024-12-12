import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get('screen');

interface ChatbotProps {
    embedToken: string;
    bridgeName: string;
    threadId: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ props, isWebViewVisible, setIsWebViewVisible }) => {
    //   const [isWebViewVisible, setIsWebViewVisible] = useState(false);
    const { embedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjg5IiwiY2hhdGJvdF9pZCI6IjY2NTk2YWU3ZjA0NGRlNzMzZTNlYzdlYiIsInVzZXJfaWQiOiIxMjM0In0.WPAYYTuTFoXaLJLrA_SR14eym4lxjtiJpamyk2GBOTE", bridgeName = "demo", threadId = "12345" } = props || {};

    const webViewRef = useRef(null);

    const [chatbotProps, setChatbotProps] = useState<any>({ ...props });

    // Update state when props change
    useEffect(() => {
        setChatbotProps((prevProps: any) => ({
            bridgeName: bridgeName || prevProps.bridgeName,
            threadId: threadId || prevProps.threadId
        }));
    }, [props]);

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
                default:
                    console.log("Unknown type");
            }
            webViewRef.current.injectJavaScript(script);  // Inject JavaScript to trigger chatbot opening
        }
    };

    useEffect(() => {
        handleDataSending("sendData");
    }, [chatbotProps])

    // Handle message from WebView
    const handleOnMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        if (data?.type === "close") {
            setIsWebViewVisible(false);
        }
    };

    const handleOpenChatbot = () => {
        handleDataSending("openChatbot");
    }

    useEffect(() => {
        if (isWebViewVisible) {
            handleOpenChatbot();
        }
    }, [isWebViewVisible])

    // Create the HTML string with the chatbot script
    const htmlContent = `
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

    // const hasNotch = StatusBar.currentHeight > 24;
    const hasNotch = false;


    return (
        <View
            style={{
                position: 'absolute',
                width: isWebViewVisible ? width : 0,
                height: isWebViewVisible ? height : 0,
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{
                    width: isWebViewVisible ? width : 0,
                    height: isWebViewVisible ? Platform.OS === 'android' ? '100%' : hasNotch ? height - StatusBar.currentHeight : height - StatusBar.currentHeight * 3 : 0,
                }}
            >
                <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : 0 }} >
                    <WebView
                        ref={webViewRef}  // Reference the WebView
                        source={{ html: htmlContent }}  // Pass the HTML content
                        style={[
                            styles.webview
                        ]}
                        containerStyle={{ flex: 1 }}
                        scalesPageToFit={true}
                        cacheMode='LOAD_CACHE_ELSE_NETWORK'
                        contentMode="mobile"
                        javaScriptEnabled
                        collapsable={true}
                        scrollEnabled={false}
                        onLoadEnd={() => {
                            // You can call the method to open the chatbot once it is loaded
                            handleDataSending("sendData");
                        }}
                        onMessage={handleOnMessage}  // Listen to messages from WebView
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    webview: {
        flex: 1,  // Make sure the WebView takes up the full screen
    },
});

export default Chatbot;
