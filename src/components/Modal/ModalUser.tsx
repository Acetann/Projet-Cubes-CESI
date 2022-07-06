import React from "react";
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";

// définition des méthodes /propriétés de modalUser
interface ListUserProps {
    nom: string;
    prenom: string;
    pseudo: string;
    image: string;
    visible: boolean;
    closeModal: () => void;
}

export const ModalUser: React.FunctionComponent<ListUserProps> = ({nom, prenom, pseudo, image, visible, closeModal}) => {

  return (
    <Modal animationType="slide"  transparent={true} visible={visible} onDismiss={closeModal}>
        <View style={styles.centeredView}>
            <View style={{flex: 1, marginHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(5)}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri: image}} style={{width: 40,height: 40,borderRadius:40,marginRight: responsiveWidth(3)}}/>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', marginBottom: responsiveWidth(2)}}>
                            <Text style={{fontSize:12, color: 'black', marginRight: responsiveWidth(2)}}>{pseudo}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:12,color: 'black', marginRight: responsiveWidth(2)}}>{prenom}</Text>
                            <Text style={{fontSize:12,color: 'black'}}>{nom}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name="close" color="black" size={40} />
                    </TouchableOpacity>
                </View>
            </View>   
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveWidth(50),
    backgroundColor:Colors.white,
    borderWidth:1,
    borderColor: Colors.blue,
    borderRadius: 20,
  },
});

export default ModalUser;