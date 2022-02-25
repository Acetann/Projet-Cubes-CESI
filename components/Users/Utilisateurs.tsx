import React from "react";
import { Text, View } from "react-native";

interface UsersProps{}

export const Users: React.FunctionComponent<UsersProps> = () => {
    return (
        <View>
            <Text>
                {"Users"}
            </Text>
        </View>
    )
}