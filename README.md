````markdown
# ChatBot Integration in React Native

A React Native component for integrating a customizable chatbot into your mobile applications. The chatbot provides a seamless way for users to interact with automated systems directly within their mobile apps.

## Features
- Embeds a chatbot within a `WebView`.
- Customizable appearance and behavior.
- Supports message passing between mobile app and the chatbot.

## Installation

Ensure you have `react-native-webview` installed in your project:

```bash
npm install react-native-webview
````

## Usage

To use the `ChatBot` component, import it and include it in your component tree. Below is an example with basic configuration:

```javascript
import React from 'react';
import { View } from 'react-native';
import ChatBot from './path-to-your-chatbot-component/ChatBot'; // Adjust path accordingly

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ChatBot
        embedToken="your-embed-token-here"
        bridgeName="your-bridge-name"
        threadId="unique-thread-id"
        openInContainer={false}
        hideIcon={false}
        defaultOpen={false}
        hideCloseButton={false}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop Name | Type | Required | Default | Description | |-----------------|---------|----------|---------|-----------------------------------------------------------------------------------------------| | `embedToken` | String | Yes | N/A | Token used to authenticate and configure the chatbot. | | `bridgeName` | String | Yes | N/A | A unique name identifying the chatbot bridge. | | `threadId` | String | Yes | N/A | An identifier for the conversation thread. | | `openInContainer` | Boolean | No | `false` | Opens the chatbot within a specific app container. | | `hideIcon` | Boolean | No | `false` | Option to hide the default chatbot launch icon. | | `defaultOpen` | Boolean | No | `false` | Opens the chatbot interface by default when the component mounts. | | `hideCloseButton` | Boolean | No | `false` | Hides the close button when true, keeping the chatbot always active. |

## How it Works

-   The component leverages `WebView` to render the chatbot interface.
-   JavaScript is injected into the WebView to handle actions like opening the chatbot (`openChatbot`) or sending data (`SendDataToChatbot`).
-   The component can customize its behavior based on prop changes through the lifecycle of the component.

## Development

### Handling JavaScript Injection

To manage specific interactions between the app and chatbot, scripts are dynamically added to control behavior. Ensure these scripts and your conditions are met for the integration to work smoothly. Check your console output for any missing functions that need to be defined within your chatbot's web environment.


## Note

Make sure your web environment within the WebView loads all necessary scripts, and alterations or extensions to your local hosting setup may be necessary to properly render and execute your chatbot scripts.