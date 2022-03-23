import { StyleSheet } from 'react-native';
import { lightColors } from '../config/colors/colors';

export const mainStyle = StyleSheet.create({
  containerTabButton: {
    flex: 1,
    backgroundColor: lightColors.blue,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerCreate: {
        justifyContent: 'center',
        alignItems: 'center',
  },
      sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        height: 40,
        borderWidth: 1,
        padding: 8,
      },
      imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    center:{
        justifyContent:"center",
        alignItems:"center",
    },
    title:
        {
            fontSize: 22,
            color: "red"
        },
    container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 8,
        }
})