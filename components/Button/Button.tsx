import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { mainStyle } from "../../styles/styles";
import { buttonStyle } from "./ButtonStyle";

interface ButtonProps {
  children: string;
  onPress: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <View style={mainStyle.center}>
      <TouchableOpacity onPress={onPress} style={buttonStyle.Container} activeOpacity={0.5}>
        <Text style={buttonStyle.Title}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};