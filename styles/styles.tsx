import { StyleSheet } from 'react-native';
import { Colors } from '../config/colors/colors';

export const mainStyle = StyleSheet.create({
  containerTabButton: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerCreate: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10 
  },
      sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#000',
        padding: 10,
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
        },
        shadow: {
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
        errors: {
          fontSize: 14,
          color: 'red',
          fontWeight: 'bold',
          marginTop: 5
        }
      
})