import React, { useState } from 'react';
import { Text} from 'react-native';
import { ChannelList, Chat, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import { client } from '../../../App';

export const ChannelScreen = () => {
    const [selectedChannel, setSelectedChannel] = useState<any>(null)

    const onChannelPressed = (channel: any) => {
        setSelectedChannel(channel)
        console.log(channel)
    }
return(
    <>
  
    <Chat client={client}>
        {selectedChannel ? (
            <Channel channel={selectedChannel}>
                <MessageList />
                <MessageInput />
                <Text  onPress={() => setSelectedChannel(null)}>
                    Go back
                </Text>
            </Channel>
            ) : (
            <ChannelList 
            onSelect={onChannelPressed} 
            /* filters={{name : "Socially.fr"}} */
            />
        )}
    </Chat>

    </>
)
}