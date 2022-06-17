import moment from "moment";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../config/colors/colors";
import { mainStyle } from "../../../styles/styles";
import { image } from "../../../assets";


interface PublicationContentProps {
    texte: string;
    titre: string;
    img: string;
    date_creation: Date;
    utilisateur?: string;
    pseudo: string;
    nb_reaction: number;
  }

export const PublicationContent: React.FunctionComponent<PublicationContentProps> = ({texte, titre, img, date_creation, utilisateur, pseudo,nb_reaction}) => {
    const [isLike, setIsLike] = useState(Boolean(true))

      return (
            <View style={[mainStyle.shadow,{
              padding: responsiveWidth(3),
              marginBottom: responsiveHeight(2),
              borderRadius: 14,
              justifyContent: 'space-between',
              backgroundColor: Colors.darkMainGrey,
            }]}>
              <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginVertical: responsiveWidth(2)}}>
                <Text style={{color: lightColors.mainBlue}}>{pseudo || "Anonyme" }</Text>
                <Text style={{color: lightColors.mainBlue}}>{titre}</Text>
              </View>
              <View style={{alignItems:'center', marginTop: responsiveWidth(2)}}>
                <Image source={{uri: img || image.imageHome}} style={{width: 30,height: 30}}/>
                {texte !== undefined && <Text style={{color: lightColors.mainBlue}}>{texte}</Text>}
              </View>
              <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-around', marginTop: responsiveWidth(5)}}>
                <View style={{alignItems:'center'}}>
                <Text style={{color: lightColors.mainBlue}}>{nb_reaction}</Text>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginVertical: responsiveWidth(2)}}  onPress={() => {
                      !isLike && setIsLike(true),
                      isLike && setIsLike(false)
                  }}>
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
                  
            </View>
            <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
              <Text style={{color: lightColors.mainBlue}}>{"Publié le : "}</Text>
              <Text style={{color: lightColors.mainBlue}}>{`${moment(date_creation).format('DD/MM/YYYY,HH:mm').replace(':','h')}`}</Text>
            </View>
          </View>
          )
  }