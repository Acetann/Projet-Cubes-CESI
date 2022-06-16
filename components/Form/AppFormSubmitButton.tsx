import React from 'react';
import { Button, View, Text} from 'react-native';
import { useFormikContext } from 'formik';

interface AppFormSubmitButtonProps {
    title: string;
}

const AppFormSubmitButton = ({ title }: AppFormSubmitButtonProps) => {
    const { handleSubmit, isValid } = useFormikContext();
    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                flex: 1
            }}>
            <Text>
                <Button onPress={() => handleSubmit()} title={title} disabled={!isValid} />
            </Text>
        </View>
        </>
    );
};

export default AppFormSubmitButton;