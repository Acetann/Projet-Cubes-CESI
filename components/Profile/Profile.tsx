import React from "react";
import { Text, View } from "react-native";

interface ProfileProps{}

export const Profile: React.FunctionComponent<ProfileProps> = () => {
    return (
        <View>
            <Text>
                {"Profile"}
            </Text>
        </View>
    )
}