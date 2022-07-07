import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React, { Fragment } from "react";
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../config/colors/colors";
import { ADD_COMMENTAIRE } from "../../constants/routesName";
import { RouteParams } from "../../navigations/AuthNavigator";
import { CustomButton } from "../common/Button";

// définition des méthodes /propriétés de ModalCommentaire
interface ListCommentaireProps {
    id: string,
    reponse: [],
    visible: boolean;
    closeModal: () => void;
}

export const ModalCommentaire: React.FunctionComponent<ListCommentaireProps> = ({ visible, reponse, id, closeModal }) => {

    //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onDismiss={closeModal}>
            <View style={styles.centeredView}>
                <View style={{ alignItems: 'center', justifyContent:'space-between', marginHorizontal: responsiveWidth(5), marginVertical:responsiveWidth(2), flexDirection: 'row'}}>
                   <Text style={{fontSize: 12}}>{`${reponse?.length} commentaire(s)`}</Text> 
                    <TouchableOpacity
                        onPress={closeModal}>
                        <Icon name="close" color="black" size={40} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(2) }}>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate(ADD_COMMENTAIRE, { id: id})}}
                        onPressOut={closeModal}>  
                        <CustomButton secondary title={"Ajouter un commentaire"} />
                    </TouchableOpacity>
                    <ScrollView style={{ flexDirection: 'column' }}>
                        {reponse?.map((item, index) => {                        
                            return (
                                <Fragment key={index}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image
                                            style={{
                                                height: 30,
                                                width: 30,  
                                                borderRadius: 80,
                                            }}
                                            source={{ uri: item?.utilisateur?.image }}/>
                                        <Text style={{ fontSize: 12, color: 'black' }}>{item?.utilisateur?.pseudo}</Text>
                                        <Text style={{ fontSize: 10, color: lightColors.mainBlue }}>{"Publié le : "}</Text>
                                        <Text style={{ fontSize: 10, color: lightColors.mainBlue }}>{`${moment(item?.date_creation).format('DD/MM/YYYY,HH:mm').replace(':', 'h')}`}</Text>
                                    </View>
                                    <View style={{ borderWidth: 1}}>  
                                        <Text style={{ fontSize: 12, color: 'black'}}>{item?.description}</Text>
                                    </View>
                                </Fragment>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveWidth(50),
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.blue,
        borderRadius: 20,
    },
});

export default ModalCommentaire;