import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../config/colors/colors';

interface ButtonProps {
    onPress: () => void,
    title:string,
}

export const Button: React.FunctionComponent<ButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        height: responsiveHeight(6),
        borderRadius: 30,
        paddingHorizontal: responsiveWidth(29),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue
    }}>
        <Text style={{color: Colors.white}}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

export default Button;
