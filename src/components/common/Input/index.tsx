import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../../assets/theme/color';

interface InputProps {
    onChangeText: Function;
    placeholder?: string;
    isSecure?: boolean;
    icon?: any;
    iconPosition?: string;
    style?: any;
    error?: string;
    value?: string;
}

export const Input :React.FC<InputProps> = ({
    onChangeText,
    placeholder,
    isSecure,
    icon,
    iconPosition,
    style,
    error,
    value,
    ...props
}) => {

    const [focused, setFocused] = useState(false);

    const getFlexDirection = () => {
        if (icon && iconPosition) {
            if (iconPosition === 'left') {
                return 'row';
            } else if (iconPosition === 'right') {
                return 'row-reverse';
            }
        }
    };

    const getBorderColor = () => {
        if (error) {
            return colors.danger;
        }
        if (focused) {
            return colors.primary;
        } else {
            return colors.grey;
        }
    };

    return (
        <View style={styles.inputContainer}>
            <View
                style={[
                    styles.wrapper,
                    { alignItems: icon ? 'center' : 'baseline' },
                    { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
                ]}>
                <View>{icon && icon}</View>

                <TextInput 
                    placeholder={placeholder}
                    value={value}
                    style={[styles.textInput, style]}
                    onChangeText={(text) => onChangeText(text)}
                    secureTextEntry={isSecure}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    {...props}
                />
            </View>

            {<Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,

        marginTop: 5,
    },

    inputContainer: {
        paddingVertical: 12,
    },

    textInput: {
        flex: 1,
        width: '100%',
    },

    error: {
        color: colors.danger,
        paddingTop: 4,
        fontSize: 12,
    },
});