# 🤖✨ ChatBot Integration in React Native

Enhance your mobile applications with a customizable chatbot component, enabling seamless user interactions directly within your app. Let's get started! 🚀

## 📦 Installation

Install the package using npm:

```bash
npm install chatbot-react-native-sdk
```

## 🛠️ Usage

Import and integrate the `ChatBot` component into your application:

```javascript
import React from 'react';
import { View } from 'react-native';
import ChatBot from 'chatbot-react-native-sdk';

const App = () => (
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

export default App;
```

**Note:** While the chatbot can be initialized anywhere in your app, it's recommended to initialize it at the root level and use events to control its visibility. This approach ensures better management and accessibility throughout your application.

## 🔑 Obtaining Your Embed Token

To configure the chatbot, follow these steps:

1. Visit <a href="https://ai.walkover.in" target="_blank">ai.walkover.in 🌐</a>
2. Log in or create an account. 🔐
3. Navigate to the **Org** or **Bridges** section. 🏗️
4. Provide your prompt and chatbot specifications. ✍️
5. Generate your embed token using the provided `org_id`, `chatbot_id`, `user_id`, and sign it with your `access_key`. 🔑

Once you have your embed token, integrate it as shown above to enjoy an AI-driven chatbot experience. 🤖💬

## ⚙️ Props

| Prop Name         | Type      | Default Value | Required | Description                                                                                   |
|-------------------|-----------|---------------|----------|-----------------------------------------------------------------------------------------------|
| `embedToken`      | `string`  | None          | ✅        | A JWT containing `project_id`, `org_id`, `chatbot_id`, and `user_id`, signed with `auth_key`. |
| `threadId`        | `string`  | ""            | ✅        | Unique identifier for the communication channel, aiding in chat history preservation.         |
| `bridgeName`      | `string`  | 'root'        | ❌        | Specifies the bridge name; defaults to 'root' if not provided.                                |
| `variables`       | `object`  | {}            | ❌        | Additional parameters to send to the bridge.                                                  |
| `defaultOpen`     | `boolean` | false         | ❌        | Determines if the chatbot opens by default.                                                   |
| `hideCloseButton` | `boolean` | false         | ❌        | Controls the visibility of the close button at the top.                                       |
| `hideIcon`        | `boolean` | false         | ❌        | Controls the visibility of the chatbot icon.                                                  |
| `openInContainer` | `boolean` | false         | ❌        | Determines if the chatbot opens within a parent container.                                    |

## 🎯 Event Handling

Utilize `DeviceEventEmitter` to control the chatbot's visibility:

```javascript
import { DeviceEventEmitter } from 'react-native';

// To open the chatbot
DeviceEventEmitter.emit('openChatbot', { type: 'openChatbot' });

// To close the chatbot
DeviceEventEmitter.emit('closeChatbot', { type: 'closeChatbot' });
```

## 📝 Note on `openInContainer` Prop

- **Opening in a Container**: Ensure the parent view has `position: 'relative'` to confine the chatbot within its boundaries. 📐
- **Opening in Full Screen**: The parent view should have `position: 'static'` to allow the chatbot to cover the entire screen. 🖥️

## 🛠️ How It Works

The component leverages `WebView` to render the chatbot interface, ensuring a seamless integration within your React Native application. 🌐

## 🚧 Development

### 📝 Handling JavaScript Injection

To manage interactions between the app and the chatbot, ensure that necessary scripts are loaded and conditions are met within your web environment. Monitor console outputs for any missing functions that may need to be defined. 🛠️

## 🌐 Note

Ensure your web environment within the `WebView` loads all necessary scripts. You may need to adjust your hosting setup to properly render and execute your chatbot scripts. 🖥️

---

By following this guide, you'll integrate a dynamic and responsive chatbot into your React Native application, enhancing user engagement and interaction. Happy AI integration! 🎉 