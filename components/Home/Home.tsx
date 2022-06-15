import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { image } from '../../assets';
import { getPublication } from '../../api/Publications';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { mainStyle } from '../../styles/styles';
import { Colors, lightColors } from '../../config/colors/colors';
import { Icon } from 'react-native-elements';
import moment from 'moment';

interface HomeProps {
  texte: string;
  titre: string;
  image: string;
  date_creation: Date;
  utilisateur: string;
  pseudo: string;
}

export const Home: React.FunctionComponent<HomeProps> = () => {

  const [publication, setPublication] = useState([]);
  const [isLike, setIsLike] = useState(Boolean(true))

    useEffect(() => {
        getPublication(setPublication);
    }, []);
    
    return (
      <ScrollView style={{padding: responsiveWidth(5), paddingBottom: responsiveWidth(10)}}>
        {publication.map(((item: HomeProps, index: number) => {
          return (
          <View key={index} style={[mainStyle.shadow,{
            padding: responsiveWidth(3),
            marginBottom: responsiveHeight(2),
            borderRadius: 14,
            justifyContent: 'space-between',
            backgroundColor: Colors.darkMainGrey,
          }]}>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginVertical: responsiveWidth(2)}}>
              <Text style={{color: lightColors.mainBlue}}>{item.pseudo || "Anonyme" }</Text>
              <Text style={{color: lightColors.mainBlue}}>{item.titre}</Text>
            </View>
            <View style={{alignItems:'center', marginTop: responsiveWidth(2)}}>
              <Image source={{uri: item.image || image.imageHome}} style={{width: 30,height: 30}}/>
              {item.texte !== undefined && <Text style={{color: lightColors.mainBlue}}>{item.texte}</Text>}
            </View>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-around', marginTop: responsiveWidth(5)}}>
            <TouchableOpacity  onPress={() => {
                    !isLike && setIsLike(true),
                    isLike && setIsLike(false)
                }}>
                  <Icon name={isLike ? "thumb-up-off-alt" : "thumb-up"} color={Colors.blue} />
            </TouchableOpacity>
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
            <Text style={{color: lightColors.mainBlue}}>{`${moment(item.date_creation).format('DD/MM/YYYY,HH:mm').replace(':','h')}`}</Text>
          </View>
        </View>
        )
      }))}
        <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}