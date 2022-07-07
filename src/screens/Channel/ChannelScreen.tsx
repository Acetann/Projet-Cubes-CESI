import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChannelList, Chat, Channel } from 'stream-chat-expo';
import { client } from '../../../App';

export const ChannelScreen = () => {
    const [selectedChannel, setSelectedChannel] = useState<any>(null)

    const onChannelPressed = (channel: any) => {
        console.log(channel)
    }
return(
    <>
  
    <Chat client={client}>
        {selectedChannel ? (
            <Channel channel={selectedChannel}>
                <Text
                style={{ marginTop: 50 }}
                onPress={() => setSelectedChannel(null)}
                >
                    Go back
                </Text>
            </Channel>
            ) : (
            <ChannelList onSelect={onChannelPressed} />
        )}
    </Chat>

    </>
)
}