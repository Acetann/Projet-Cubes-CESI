import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { getUsers } from "../../api/Users";
import { lightColors } from "../../config/colors/colors";
import { mainStyle } from "../../styles/styles";

interface UsersProps{
  nom: string;
  prenom: string;
  id: number;
  mail: string;
  compte_actif: Boolean;
  image: string;
}

export const Users: React.FunctionComponent<UsersProps> = () => {

    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getUsers(setUsers);
    }, []);

    return (
      <ScrollView style={{padding: responsiveWidth(5), paddingBottom: responsiveWidth(10)}}>
        {users.map(((item: UsersProps, index: number) => {
          return (
            <View key={index} style={[mainStyle.shadow,{
              padding: responsiveWidth(2),
              marginBottom: responsiveHeight(2),
              borderRadius: 14,
              justifyContent: 'space-between',
              backgroundColor: lightColors.white,
            }]}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                  <Image source={{uri: item.image}} style={{width: 30,height: 30, marginRight: responsiveWidth(2)}}/>
                  <View style={{ alignItems:'center'}}>
                    <Text style={{color: lightColors.mainBlue}}>{item.prenom}</Text>
                    <Text style={{color: lightColors.mainBlue}}>{item.nom}</Text>
                  </View>
                </View>
                <Text style={{color: lightColors.mainBlue}}>{item.mail}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', marginTop: responsiveWidth(5)}}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{marginRight: responsiveWidth(2), color: lightColors.mainBlue}}>{'Compte actif :'}</Text>
                    {item.compte_actif === false ? <Icon name="close" color={lightColors.red} /> : <Icon name="check" color={lightColors.green} />}
                  </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <TouchableOpacity style={[mainStyle.shadow,
                  {
                    padding: responsiveWidth(2),
                    marginHorizontal: responsiveWidth(2),
                    borderRadius: 14,
                    justifyContent: 'space-between',
                    backgroundColor: lightColors.mainBlue,
                  }]}>
                    <Icon name="edit" color={lightColors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.shadow,
                  {
                    padding: responsiveWidth(2),
                    borderRadius: 14,
                    justifyContent: 'space-between',
                    backgroundColor: lightColors.red,
                  }]}>
                    <Icon name="delete" color={lightColors.white} />
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }))}
      <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}