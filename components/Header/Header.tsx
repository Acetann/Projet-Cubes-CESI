import React from "react"
import { Icon } from 'react-native-elements';
import {TouchableOpacity, View,Image, Text, } from 'react-native';
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
            {onPress && (
            <TouchableOpacity onPress={onPress}>
                <Icon name="arrow-back"/>
            </TouchableOpacity>
            )}      
        </View>
    </View>
    );
}