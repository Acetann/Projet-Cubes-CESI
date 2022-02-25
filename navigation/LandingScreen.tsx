import React from "react"
import {Text, View } from 'react-native';
import { Button } from "../components/Button/Button";
import { text } from "../words/words";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "./RouteNavigator";

interface LandingScreenProps {}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <>
    <View style={{borderBottomLeftRadius:100, backgroundColor: '#417DC4', flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>{'Bienvenue au Gouvernement'}</Text> 
    </View>
<View style={{backgroundColor: '#CE614A', flex:1, justifyContent:'center',alignItems:'center'}}>
<Button
        children={text.create.title}
        onPress={() => navigation.navigate('Create')}
    />
    <Button
        children={text.login.title}
        onPress={() => navigation.navigate('Login')}
    />
</View>
    </>
    )
}