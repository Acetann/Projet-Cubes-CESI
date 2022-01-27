import React from 'react';
import {View, Image, Text, Button } from 'react-native';
import { homeStyle } from './HomeStyles';
import { image } from '../../assets';
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={mainStyle.container}>
            <Image style={homeStyle.image} width={100} height={100} source={{uri: image.imageHome}}/>
            <Button
                title="Go to Create"
                onPress={() => navigation.navigate('Create')}
            />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}