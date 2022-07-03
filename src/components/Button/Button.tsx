import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

interface ButtonProps {
    onPress: () => void,
    title:string,
    style: StyleProps,
    styleTitle: StyleProps,
}

export const Button: React.FunctionComponent<ButtonProps> = ({onPress, title, style,styleTitle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}>
        <Text style={styleTitle}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

export default Button;
