import 'react-native-gesture-handler';
import { AppNavContainer } from "./src/navigations";
import { GlobalProvider } from './src/context/globalProviders';
import { StreamChat } from 'stream-chat';
import React, { useEffect, useState } from 'react';
import { OverlayProvider, Chat, ChannelList } from 'stream-chat-expo';

const API_KEY = "njtxbbvtq8qx";
export const client = StreamChat.getInstance(API_KEY)

  const App = () =>{
    const [isReady, setIsReady] = useState(false);


  useEffect(() => {
   const connectUser = async () => {
      await client.connectUser(
        {
          id: 'alex',
          name: 'vesouille',
          image: 'https://i.imgur.com/fr9Jz14.png',
        },
        client.devToken('alex'),
      );

      const channel = client.channel("messaging", "public2", {
        name: "Salon public2 "
      });
      await channel.watch();
    };
    
    connectUser();
    return () => client.disconnectUser();
  }, []);


console.log(isReady)
    if (isReady) {
    return null;
    } else {
      return (
      <GlobalProvider>
        <OverlayProvider>
          <AppNavContainer />
        </OverlayProvider>
      </GlobalProvider>   
    );
  }
}

export default App;
