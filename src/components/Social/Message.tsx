import React from 'react';
import { Text, View } from 'react-native';

interface MessageProps {}

export const Message: React.FunctionComponent<MessageProps> = () => {

    return (
            <View>
                <Text>{'Page de message'}</Text>
            </View>
    )
}