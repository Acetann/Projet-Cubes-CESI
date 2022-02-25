import React from "react";
import { Text, View } from "react-native";

interface CommentsProps{}

export const Comments: React.FunctionComponent<CommentsProps> = () => {
    return (
        <View>
            <Text>
                {"Commentaires"}
            </Text>
        </View>
    )
}