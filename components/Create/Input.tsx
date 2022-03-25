import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";

interface InputProps {
  placeholder?: string;
  value: string;
  password?: boolean;
  type?: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
}

export const Input: React.FunctionComponent<InputProps> = ({
  placeholder,
  value,
  password,
  type = "default",
  onChangeText,
  onBlur,
  error = false,
}) => {
  return (
      <TextInput
        style={{flex:1,borderColor: error ? "red" : "black"}}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={password}
        keyboardType={type}
      />
  );
};