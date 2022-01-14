import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  password?: boolean;
  type?: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorDetails?: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  password,
  type = "default",
  onChangeText,
  onBlur,
  error = false,
  errorDetails,
}) => {
  return (
    <View style={{marginHorizontal:16, marginVertical:8}}>
      {!!label && (<View style={{flexDirection:"row"}}>
        <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
        <Text style={{color: "black",marginBottom:8}}>{label}</Text>
     </View> )}
      <TextInput
      style={{
        height: 40,
        borderWidth: 1,
        padding: 8,
        borderColor: error ? "red" : "black",
            }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={password}
        keyboardType={type}
      />
      {Boolean(errorDetails) && (
        <Text style={{color:"red",marginTop:8}}>
        {errorDetails}
      </Text>)}
    </View>
  );
};