import React from 'react';
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigation/RouteNavigator";
import { text } from "../../words/words"
import { Button } from "../Button/Button"

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={{margin: 16}}>
            <Button
                children={text.create.title}
                onPress={() => navigation.navigate('Create')}
            />
            <Button
                children={text.login.title}
                onPress={() => navigation.navigate('Login')}
            /> 
        </View>
    )

}