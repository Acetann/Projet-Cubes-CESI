import React from "react"
import {View,Text} from "react-native"
import { headerStyle } from "./HeaderStyle"

interface HeaderProps {
    color?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({color}) => {
    return (
        <View style={headerStyle.separator} >
            <Text style={{color: color}}>
                Page Header
            </Text>
        </View>
    )
}

