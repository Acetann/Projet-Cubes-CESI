import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {View } from 'react-native';
import { RouteParams } from '../../navigation/RouteNavigator';
import { titleStyle } from '../../styles/styles';
import { Icon } from 'react-native-elements';



interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const onProfilePress = () => {
        navigation.navigate("Header")    
    }

    return (
    <View style={titleStyle.container}>
        <Icon onPress={onProfilePress} name='person-outline' />
    </View>
    )
}