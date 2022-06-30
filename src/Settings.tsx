import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../src/screens/navigation/RouteNavigator";
import { text } from "../words/words";
import { Button } from '@ant-design/react-native';

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={{margin: 16}}>
            <Button
                children={text.users.title}
                onPress={() => navigation.navigate('Utilisateurs')}
            /> 
            <Button
                children={text.logout.title}
                onPress={() => navigation.navigate('LandingScreen')}
            />
        </View>
    )

}