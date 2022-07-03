import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../config/colors/colors";
import { mainStyle } from "../../../styles/styles";
import { text } from "../../../words/words";

interface SocialContentProps {
    nom: string;
    prenom: string;
    _id: number;
    mail: string;
    compte_actif: Boolean;
    img: Buffer;
    onDelete:(id: number) => void;
  }

export const SocialContent: React.FunctionComponent<SocialContentProps> = ({nom, prenom, _id, mail, compte_actif, img, onDelete}) => {

    return (
        <View style={[mainStyle.shadow,{
            padding: responsiveWidth(2),
            marginBottom: responsiveHeight(2),
            borderRadius: 14,
            justifyContent: 'space-between',
            backgroundColor: lightColors.white,
        }]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                  <Image source={img} style={{width: 30,height: 30, marginRight: responsiveWidth(2)}}/>
                  <View style={{ alignItems:'center'}}>
                    <Text style={{color: lightColors.mainBlue}}>{prenom}</Text>
                    <Text style={{color: lightColors.mainBlue}}>{nom}</Text>
                  </View>
                </View>
                <Text style={{color: lightColors.mainBlue}}>{mail}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', marginTop: responsiveWidth(5)}}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{marginRight: responsiveWidth(2), color: lightColors.mainBlue}}>{text.actifAccount.title}</Text>
                        {compte_actif === false ? <Icon name="close" color={Colors.red} /> : <Icon name="check" color={Colors.blue} />}
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={[mainStyle.shadow,
                    {
                        padding: responsiveWidth(2),
                        marginHorizontal: responsiveWidth(2),
                        borderRadius: 14,
                        justifyContent: 'space-between',
                        backgroundColor: Colors.blue,
                    }]}>
                        <Icon name="edit" color={lightColors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {onDelete(_id)}} style={[mainStyle.shadow,
                    {
                        padding: responsiveWidth(2),
                        borderRadius: 14,
                        justifyContent: 'space-between',
                        backgroundColor: Colors.red,
                    }]}>
                        <Icon name="delete" color={lightColors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}