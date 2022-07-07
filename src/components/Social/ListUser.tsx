import { Button } from "@ant-design/react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";
import { axiosInstance } from "../../helpers/axios.interceptor";
import ModalUser from "../Modal/ModalUser";

interface ListUserProps {
    nom: string;
    prenom: string;
    pseudo: string;
    image: string;
    nbdabonne: string;
    nbdabonnement: string;
    abonne?: Boolean;
    utilisateur: string;
}

export const ListUser: React.FunctionComponent<ListUserProps> = ({ nom, prenom, pseudo, image, nbdabonne, nbdabonnement, abonne,utilisateur}) => {
    const [isAbonne, setIsAbonne] = useState(false);
    const [isSignaled, setIsSignaled] = useState(false);
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const onFollow = () => {
        axiosInstance.patch(`/utilisateur/follow/${utilisateur}`)
          .then((res) => {
            if(isAbonne){
                setIsAbonne(false)
            }else{
                setIsAbonne(true)
            }
          })
          .catch((err) => {
            console.log(err)
    
          });
      };
      
    return (
        <View style={{marginVertical: responsiveWidth(5)}}>
            <View style={{flexDirection:'row', alignItems:'center', marginLeft: responsiveWidth(3)}}>
                {image !== undefined && (
                    <TouchableOpacity onPress={openModal} style={{flexDirection:'row', alignItems:'center', marginLeft: responsiveWidth(3)}}>
                        <Image source={{uri: image}} style={{width: 40,height: 40,borderRadius:40,marginRight: responsiveWidth(3)}}/>
                    </TouchableOpacity>
                )}
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row', marginBottom: responsiveWidth(2)}}>
                        <Text style={{fontSize:12, color: 'black', marginRight: responsiveWidth(2)}}>{pseudo}</Text>
                        {abonne && (
                            <TouchableOpacity onPress={onFollow} disabled={isAbonne ? true : false}>
                                <Text style={{fontSize:12, color: isAbonne ? Colors.inactiveTab : Colors.blue, fontWeight: isAbonne ? '600' : 'bold'}}>{isAbonne ? 'Abonné(e)' : "S'abonner"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,color: 'black', marginRight: responsiveWidth(2)}}>{prenom}</Text>
                        <Text style={{fontSize:12,color: 'black'}}>{nom}</Text>
                    </View>
                </View>
                <Button
                    disabled={abonne ? false : true}
                    style={{width:100,marginHorizontal: responsiveWidth(5), borderRadius: 8}}
                    children={
                        <Text style={{fontSize:12,color: 'black', marginRight: responsiveWidth(2)}}>{abonne ? 'Retirer' : 'Abonné(e)'}</Text>
                    }
                    onPress={() => {}}
                />
            </View>
            <ModalUser nom={nom} prenom={prenom} image={image} pseudo={pseudo} nbdabonne={nbdabonne} nbdabonnement={nbdabonnement} visible={visible} closeModal={closeModal} />
        </View>
    )
}