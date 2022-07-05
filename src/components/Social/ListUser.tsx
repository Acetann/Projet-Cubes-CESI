import { Button } from "@ant-design/react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";

interface ListUserProps {
    nom: string;
    prenom: string;
    pseudo: string;
    image: string;
    abonne: Boolean;
  }

export const ListUser: React.FunctionComponent<ListUserProps> = ({nom, prenom, pseudo, image, abonne}) => {
    const [isAbonne, setIsAbonne] = useState(false)
    return (
        <View style={{marginVertical: responsiveWidth(5)}}>
            <View style={{flexDirection:'row', alignItems:'center', marginLeft: responsiveWidth(3)}}>
                {image !== undefined && (<Image source={{uri: image}} style={{backgroundColor:'black', width: 40,height: 40,borderRadius:40,marginRight: responsiveWidth(3)}}/>)}
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row', marginBottom: responsiveWidth(2)}}>
                        <Text style={{fontSize:12, color: 'black', marginRight: responsiveWidth(2)}}>{pseudo}</Text>
                        {abonne && (
                            <TouchableOpacity disabled={isAbonne ? true : false}>
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
        </View>
    )
}