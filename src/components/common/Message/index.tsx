import React from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import colors from '../../../assets/theme/color';

interface MessageProps {
    message: string;
    retry? : any;
    retryFn? : any;
    primary?: any;
    danger?: any;
    info?: any
    success?: any
    onDismiss?: any
}

export const Message: React.FC<MessageProps> = ({
    message,
    info,
    success,
    primary,
    danger,
    retry,
    retryFn,
    onDismiss

}) => {
    const [userDismissed, setDismissed] = React.useState(false);

    const getBgColor = () => {
        if (primary) {
            return colors.primary;
        }
        if (danger) {
            return colors.danger;
        }
        if (info) {
            return colors.info;
        }
        if (success) {
            return colors.secondary;
        }
    };
    return (
        <>
        {userDismissed ? null : (
            <TouchableOpacity style={[styles.wrapper, { backgroundColor: getBgColor() }]}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text 
                        style={{color: colors.white
                        }}>
                        {message}
                    </Text>

                        {retry && typeof onDismiss !== 'function' && (
                            <TouchableOpacity onPress={retryFn}>
                                <Text
                                    style={{
                                        color: colors.white,
                                    }}>
                                    Retry
                                </Text>
                            </TouchableOpacity>
                        )}

                        {typeof onDismiss === 'function' && (
                            <TouchableOpacity
                                onPress={() => {
                                    setDismissed(true);
                                    onDismiss();
                                }}>
                                <Text
                                    style={{
                                        color: colors.white,
                                    }}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 42,

        paddingHorizontal: 5,

        paddingVertical: 13,

        marginVertical: 5,
        borderRadius: 4,
        // alignItems: 'center',
        // justifyContent: 'space-evenly',
    },

    loaderSection: {
        flexDirection: 'row',
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