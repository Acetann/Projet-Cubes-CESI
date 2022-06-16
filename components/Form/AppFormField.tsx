import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
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
        {hasError && <Text style={{ color: 'red' }}>{errors[name]}</Text>}
        </>
    );
};

export default AppFormField;