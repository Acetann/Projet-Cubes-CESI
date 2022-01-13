import React, { Children } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { titleStyle } from "../../styles/styles";
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
    <TouchableOpacity style={titleStyle.center} onPress={onPress}>
      <View style={buttonStyle.Container}>
        <Text style={buttonStyle.Title}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};