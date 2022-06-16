import React from 'react';
import { Text} from 'react-native';
import { useFormikContext } from 'formik';
import { Button } from '@ant-design/react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors, lightColors } from '../../config/colors/colors';

interface AppFormSubmitButtonProps {
    title: string;
}

const AppFormSubmitButton = ({ title }: AppFormSubmitButtonProps) => {
    const { handleSubmit, isValid } = useFormikContext();
    return (
        <Button style={{borderColor: lightColors.blue, marginTop: responsiveWidth(5), marginHorizontal: responsiveWidth(15), backgroundColor:!isValid ? Colors.white : lightColors.blue}} onPress={() => handleSubmit()} disabled={!isValid}>
            <Text style={{color: !isValid ? lightColors.blue :  Colors.white}}>{title}</Text>
        </Button>
    );
};

export default AppFormSubmitButton;