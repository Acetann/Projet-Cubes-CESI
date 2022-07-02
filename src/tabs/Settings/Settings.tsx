import React from 'react';
import { Text, View } from 'react-native';

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = () => {

    return (
            <View>
                <Text>{'Paramètres'}</Text>
            </View>
    )
}