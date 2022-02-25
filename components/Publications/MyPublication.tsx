import React from "react";
import { Text, View } from "react-native";

interface MyPublicationProps{}

export const MyPublication: React.FunctionComponent<MyPublicationProps> = () => {
    return (
        <View>
            <Text>
                {"Mes Publications"}
            </Text>
        </View>
    )
}