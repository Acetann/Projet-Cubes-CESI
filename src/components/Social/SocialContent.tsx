import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../config/colors/colors";
import { mainStyle } from "../../../styles/styles";
import { MESSAGE } from "../../constants/routesName";
import { RouteParams } from "../../navigations/AuthNavigator";

interface SocialContentProps {
    nom: string;
    prenom: string;
    _id: number;
    mail: string;
    compte_actif: Boolean;
    isFriend: Boolean;
    img: Buffer;
    onDelete:(id: number) => void;
  }

export const SocialContent: React.FunctionComponent<SocialContentProps> = ({nom, prenom, _id, mail, compte_actif, img, onDelete, isFriend}) => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

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
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', marginTop: responsiveWidth(5)}}>
                <Button
                    style={{ borderRadius: 16}}
                    children={
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{marginRight: responsiveWidth(5), color: Colors.blue}}>{'Envoyer un message'}</Text>
                            <Icon name="comment" color={Colors.blue} />
                        </View>
                    }
                    onPress={() => navigation.navigate(MESSAGE)}
                />
                <View>
                    {isFriend ? (
                        <TouchableOpacity onPress={() => {onDelete(_id)}} style={[mainStyle.shadow,
                        {
                            padding: responsiveWidth(2),
                            borderRadius: 14,
                            justifyContent: 'space-between',
                            backgroundColor: Colors.red,
                        }]}>
                            <Icon name="delete" color={lightColors.white} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={() => {onDelete(_id)}} style={[mainStyle.shadow,
                        {
                            padding: responsiveWidth(2),
                            borderRadius: 14,
                            justifyContent: 'space-between',
                            backgroundColor: Colors.blue,
                        }]}>
                            <Icon name="add" color={lightColors.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}