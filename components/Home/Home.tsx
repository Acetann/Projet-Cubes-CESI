import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, Image, TouchableOpacity } from 'react-native';
import { RouteParams } from '../../navigation/RouteNavigator';
import { titleStyle } from '../../styles/styles';


interface HomeProps {
}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const onProfilePress = () => {
        navigation.navigate("Header")    }

    return (
    <View style={titleStyle.container}>
        <TouchableOpacity onPress={onProfilePress} activeOpacity={1}>
        <Text style={titleStyle.title}>Première vue de l'application</Text>
        <Image
       style={{width:300, height:300 }}
       source={{
        uri: "https://cdn.futura-sciences.com/buildsv6/images/wide1920/1/2/8/128d271d8d_50159499_animaux-rayure-canonique.jpg"
        }} />
        </TouchableOpacity>
    </View>
    )
}