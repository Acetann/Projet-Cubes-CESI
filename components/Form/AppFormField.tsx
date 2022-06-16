import React from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../config/colors/colors';
import { mainStyle } from '../../styles/styles';

const AppFormField = (props: any) => {
    const {
        placeholder,
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
        <>

            <View style={mainStyle.containerCreate}>
                <View style={mainStyle.sectionStyle}>
                    <Input
                        placeholder={placeholder}
                        onChangeText={text => onChange(name)(text)}
                        onBlur={() => {
                            setFieldTouched(name);
                            onBlur(name);
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        {...inputProps}
                    />
                </View>
            </View>
        {hasError && <Text style={{ color: Colors.red, marginLeft: responsiveScreenWidth(5) }}>{errors[name]}</Text>}
        </>
    );
};

export default AppFormField;