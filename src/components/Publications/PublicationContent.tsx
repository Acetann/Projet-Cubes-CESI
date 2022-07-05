import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth, useResponsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../config/colors/colors";
import { mainStyle } from "../../../styles/styles";
import { format } from "../../../utils/Number";
import { EDIT_PUBLICATION } from "../../constants/routesName";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { RouteParams } from "../../navigations/AuthNavigator";

interface PublicationContentProps {
    id: string;
    texte: string;
    titre: string;
    image: string;
    date_creation: Date;
    pseudo: string;
    nb_reaction: Number;
    myPublication?: Boolean;
    utilisateur?: string
  }

export const PublicationContent: React.FunctionComponent<PublicationContentProps> = ({ texte, titre, image, date_creation, pseudo, nb_reaction, myPublication, id, utilisateur }) => {
    const [isLike, setIsLike] = useState(Boolean(true))
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const onLike = () => {
      try {
      axiosInstance.patch(`/ressource/${id}/reaction`)
        .then((res) => {
          console.log(res.data)
        })
      } catch (e) {
        console.log(e)
    };
  };

  const onFollow = () => {
    axiosInstance.patch(`/utilisateur/follow/${utilisateur}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)

      });
  };
      return (
        <>
            <View style={[mainStyle.shadow,{
              padding: responsiveWidth(3),
              marginBottom: responsiveHeight(2),
              borderRadius: 14,
              justifyContent: 'space-between',
              backgroundColor: Colors.darkMainGrey,
            }]}>
              <Text style={{color: lightColors.mainBlue, marginBottom: responsiveWidth(2)}}>{pseudo || "Anonyme" }</Text>
              <Text style={{color: lightColors.mainBlue, textAlign:'center'}}>{titre}</Text>
              <View style={{alignItems:'center', marginTop: responsiveWidth(2)}}>
                {image !== undefined && (<Image source={{uri: `https://projetcubesapi.herokuapp.com/images/${image}`}} style={{marginVertical:responsiveWidth(2), width: 50,maxWidth:50,maxHeight:50, height: 50}}/>)}
                {texte !== undefined && <Text style={{color: lightColors.mainBlue}}>{texte}</Text>}
              </View>
              <View style={{flexDirection:'row',alignItems:'flex-end', justifyContent:'space-around', marginTop: responsiveWidth(5)}}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  {nb_reaction !== undefined && (<Text style={{color: lightColors.mainBlue}}>{format(nb_reaction, false)}</Text>)}
                  <TouchableOpacity 
                  style={{flexDirection:'row',alignItems:'center',marginVertical: responsiveWidth(2)}}  
                  onPress={onLike}>
                      <Icon name={isLike ? "thumb-up-off-alt" : "thumb-up"} color={Colors.blue} />
                  </TouchableOpacity>
              </View>
                <TouchableOpacity style={
                  {
                    padding: responsiveWidth(2),
                    marginHorizontal: responsiveWidth(2),
                    borderRadius: 14,
                  }}>
                    <Icon name="comment" color={Colors.blue} />
                    </TouchableOpacity>
                {!myPublication && (
                <TouchableOpacity 
                style={
                  {
                    padding: responsiveWidth(2),
                    marginHorizontal: responsiveWidth(2),
                    borderRadius: 14,
                  }}
                 onPress={onFollow}>
                    
                <Icon name="person-add" color={Colors.blue} />
              </TouchableOpacity>
              )}
                  {myPublication && (
                    <View style={{flexDirection: 'row'}}>
                     <TouchableOpacity onPress={() => {
                      navigation.navigate(EDIT_PUBLICATION,{titre: titre, texte:texte, id:id})
                     }} style={[mainStyle.shadow,
                      {
                        padding: responsiveWidth(2),
                        borderRadius: 14,
                        justifyContent: 'space-between',
                        backgroundColor: Colors.blue,
                        marginRight: useResponsiveWidth(2)
                      }]}>
                        <Icon name="edit" color={lightColors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={[mainStyle.shadow,
                      {
                        padding: responsiveWidth(2),
                        borderRadius: 14,
                        justifyContent: 'space-between',
                        backgroundColor: Colors.red,
                      }]}>
                        <Icon name="delete" color={lightColors.white} />
                    </TouchableOpacity>
                    </View>
                  )}
            </View>
            <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
              <Text style={{color: lightColors.mainBlue}}>{"Publié le : "}</Text>
              <Text style={{color: lightColors.mainBlue}}>{`${moment(date_creation).format('DD/MM/YYYY,HH:mm').replace(':','h')}`}</Text>
            </View>
          </View>
        </>
      )
  }

