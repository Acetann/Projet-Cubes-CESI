import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";
import color from "../../assets/theme/color";
import { axiosInstance } from "../../helpers/axios.interceptor";

// définition des méthodes /propriétés de modalUser
interface ListUserProps {
    nom: string;
    prenom: string;
    pseudo: string;
    image: string;
    nbdabonne: string
    nbdabonnement: string
    signal: Boolean
    visible: boolean;
    closeModal: () => void;
}

export const ModalUser: React.FunctionComponent<ListUserProps> = ({ nom, prenom, pseudo, image, nbdabonne, nbdabonnement, visible, closeModal}) => {

  return (
    <Modal animationType="slide"  transparent={true} visible={visible} onDismiss={closeModal}>
        <View style={styles.centeredView}>
            <View style={{flex: 1, marginHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(5)}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri: image}} style={{width: 60,height: 60,borderRadius:60,marginRight: responsiveWidth(3)}}/>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', marginBottom: responsiveWidth(2)}}>
                            <Text style={{fontSize:15, color: 'black', marginRight: responsiveWidth(2)}}>{pseudo}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color: 'black', marginRight: responsiveWidth(2)}}>{prenom}</Text>
                            <Text style={{fontSize:15,color: 'black'}}>{nom}</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name="close" color="black" size={40} />
                    </TouchableOpacity>
                </View>
                    <View style={{ alignItems: 'center', paddingVertical: responsiveWidth(10)}}>
                        <Text style={{ fontWeight: '400', fontSize: 18, color: color.success }}>{nbdabonne}</Text>
                        <Text style={{ fontSize: 18, color: color.grey }}>{'Abonné(s)'}</Text>
                        <Text style={{ fontWeight: '400', fontSize: 18, color: color.success }}>{nbdabonnement}</Text>
                        <Text style={{ fontSize: 18, color: color.grey }}>{'Abonnements(s)'}</Text>
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