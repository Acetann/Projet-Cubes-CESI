import React from 'react';
import { StyleProp, Text, TouchableOpacity } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../config/colors/colors';

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
