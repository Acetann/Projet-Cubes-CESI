import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Header } from '..';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const onProfilePress = () => {
        navigation.navigate("Header")    
    }

    return (
    <>
        <Header onPress={onProfilePress} />
    </>
    )
}