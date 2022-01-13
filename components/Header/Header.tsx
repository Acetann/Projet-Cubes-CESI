import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react"
import {View,Text} from "react-native"
import { Icon } from 'react-native-elements';
import { RouteParams } from "../../navigation/RouteNavigator";
import { titleStyle } from "../../styles/styles";

interface HeaderProps {
    color?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({color}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const onProfilePress = () => {
        navigation.navigate("Count")    
    }

    return (
    <View style={titleStyle.container}>
        <Icon onPress={onProfilePress} name="person-outline" />
    </View>
    )
}

