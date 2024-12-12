# ChatBot Integration in React Native

A React Native component for integrating a customizable chatbot into your mobile applications. The chatbot provides a seamless way for users to interact with automated systems directly within their mobile apps.

## Installation

To install the package, use the following npm command:

```bash
npm i chatbot-react-native-sdk
```

## Usage

To use the `ChatBot` component, import it and include it in your component tree. Below is an example with basic configuration:

```javascript
import React from 'react';
import { View } from 'react-native';
import ChatBot from 'chatbot-react-native-sdk'; // Adjust path accordingly

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

**Configure the chatbot to get the embedToken and set the chatbot configuration**

   - Go to this website: [ai-middleware.com](https://ai.walkover.in)
   - Log in or create an account if you haven't already.
   - Follow these steps to get your embedToken:

      1. Navigate to the **Org** or **Bridges** section.
      2. Give your prompt and chatbot specification.
      2. Look for the **Chatbot** option.
      3. Generate your chatbot embedToken with the help of given org_id, chatbot_id, user_id and sign the token with access_key

   - Once you have the embedToken:

      1. Add it to your configuration script as follows:
        ```jsx
        <Chatbot
            embedToken="eysjadfl********************ladfl2ld"
        />
        ```

      2. Your Chatbot is ready, Now you can enjoy AI experience with Chatbot.

### Props

| Prop Name        | Type         | Default Value | Required | Description |
|---------------   |--------------|---------------|----------|-------------|
| `embedToken`     | `string`     | None          | true     | A JWT token containing the parameters `project_id`, `org_id`, `chatbot_id`, and `user_id` signed with `auth_key`. |
| `threadId`       | `string`     | ""            | true     | A unique identifier for the communication channel. This also helps in saving the chat history. |
| `bridgeName`     | `string`     | 'root'        | false    | Specifies the bridge name to use. Defaults to 'root' if not provided. |
| `variables`      | `object`     | {}            | false    | Additional or dynamic parameters that you want to send to the bridge. |
| `defaultOpen`    | `boolean`    | false         | false    | Is Chatbot opened by default or not |
| `hideCloseButton`| `boolean`    | false         | false    | Is close button should be visible or not at the top|
| `hideIcon`       | `boolean`    | false         | false    | Is chatbot icon should be visible or not.|
| `openInContainer`| `boolean`    | false         | false    | Is chatbot open in a parent container   |

## How it Works

-   The component leverages `WebView` to render the chatbot interface.
-   JavaScript is injected into the WebView to handle actions like opening the chatbot (`openChatbot`) or sending data (`SendDataToChatbot`).
-   The component can customize its behavior based on prop changes through the lifecycle of the component.

## Development

### Handling JavaScript Injection

To manage specific interactions between the app and chatbot, scripts are dynamically added to control behavior. Ensure these scripts and your conditions are met for the integration to work smoothly. Check your console output for any missing functions that need to be defined within your chatbot's web environment.


## Note

Make sure your web environment within the WebView loads all necessary scripts, and alterations or extensions to your local hosting setup may be necessary to properly render and execute your chatbot scripts.