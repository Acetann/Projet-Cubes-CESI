import React from "react";
import { Text, View } from "react-native";

interface MyFriendProps{}

export const MyFriend: React.FunctionComponent<MyFriendProps> = () => {
    return (
        <View>
            <Text>
                {"Friend"}
            </Text>
        </View>
    )
}