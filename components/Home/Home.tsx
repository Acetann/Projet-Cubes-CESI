import React from 'react';
import {View, Image } from 'react-native';
import { homeStyle } from './HomeStyles';
import { image } from '../../assets';
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Button } from '../Button/Button';
import { text } from '../../words/words';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={mainStyle.container}>
            <Image style={homeStyle.image} width={100} height={100} source={{uri: image.imageHome}}/>
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