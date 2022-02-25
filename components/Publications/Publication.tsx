import React from "react";
import { Text, View } from "react-native";

interface PublicationProps{}

export const Publication: React.FunctionComponent<PublicationProps> = () => {
    return (
        <View>
            <Text>
                {"Publication"}
            </Text>
        </View>
    )
}