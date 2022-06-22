import React from 'react';
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigation/RouteNavigator";
import { text } from "../../words/words"
import { Button } from '@ant-design/react-native';

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={{flex:1, justifyContent:'flex-end'}}>
            <Button
                children={text.geolocalisation.title}
                onPress={() => navigation.navigate('Geolocalisation')}
            /> 
            <Button
                children={text.logout.title}
                onPress={() => navigation.navigate('LandingScreen')}
            />
        </View>
    )

}