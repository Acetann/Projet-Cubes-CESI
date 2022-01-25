import { StyleSheet } from 'react-native';
import { lightColors } from "../../config/colors/colors";

export const headerStyle = StyleSheet.create({
    header:
    {
        zIndex:10,
        alignItems:'flex-start',
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: lightColors.white,
    },
    separator:
    {
        marginTop: 10,
        marginBottom: 10,
    },
})