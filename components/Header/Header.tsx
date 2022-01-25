import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react"
import { Icon } from 'react-native-elements';
import { RouteParams } from "../../navigation/RouteNavigator";
import {TouchableOpacity, View, Text, } from 'react-native';
import { headerStyle } from "./HeaderStyle";

interface HeaderProps {
    onPress?: () => void;
}

export const Header: React.FunctionComponent<HeaderProps> = ({onPress}) => {
    return (
    <View
      style={{
        zIndex: 1,
      }}>
        <View style={headerStyle.header}>          
            <TouchableOpacity onPress={onPress}>
                <Icon name="arrow-back"/>
            </TouchableOpacity>
        </View>
    </View>
    );
}