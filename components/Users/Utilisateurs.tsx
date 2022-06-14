import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
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
      <ScrollView style={{padding: responsiveWidth(5)}}>
        {users.map(((item: UsersProps, index: number) => {
          return (
            <View key={item.id} style={[mainStyle.shadow,{
              padding: responsiveWidth(3),
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
              {item.compte_actif === false ? <Icon name="close" color={lightColors.red} /> : <Icon name="check" color={lightColors.green} />}
          </View>
        )
      }))}
      </ScrollView>
    )
}