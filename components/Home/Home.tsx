import React from 'react';
import {View, Image, Text } from 'react-native';
import { homeStyle } from './HomeStyles';
import { image } from '../../assets';
import { mainStyle } from '../../styles/styles';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    // const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    // const onProfilePress = () => {
    //     navigation.navigate("Count")  
    // }

    return (
        <View style={mainStyle.container}>
            <Image style={homeStyle.image} width={100} height={100} source={{uri: image.imageHome}}/>
        </View>
    )
}