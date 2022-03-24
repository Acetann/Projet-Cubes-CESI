import { StyleSheet } from "react-native";

export const imageUploaderStyles=StyleSheet.create({
    contain: {
      margin:8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container:{
        margin:8,
        elevation:2,
        height:150,
        width:150,
        position:'relative',
        alignItems:"center",
        borderRadius: 150,
        justifyContent:'center',
    },
    uploadBtnContainer:{
        position:'absolute',
        width:'100%',
    },
    uploadBtn:{
        alignItems:"center",
        justifyContent:'center'
    }
  })