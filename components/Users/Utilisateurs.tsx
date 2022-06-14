import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Cesi } from "../../api";
import { getUsers } from "../../api/Users";
import { lightColors } from "../../config/colors/colors";
import { RouteParams } from "../../navigation/RouteNavigator";
import { mainStyle } from "../../styles/styles";
import { text } from "../../words/words";

interface UsersProps{
  nom: string;
  prenom: string;
  _id: number;
  mail: string;
  compte_actif: Boolean;
  image: string;
}

export const Users: React.FunctionComponent<UsersProps> = () => {

    const [users, setUsers] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const onDelete = async (id: number) => {
      await fetch(`http://${Cesi}:3000/api/utilisateur/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(async res => {
          try {
            if (res.status === 200) {
              navigation.navigate("Users");
              getUsers(setUsers);
            }
          } catch (err) {
            console.log(err,'erreur');
          };
        })
        .catch(err => {
          console.log(err);
        });
    };

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
                    <Text style={{marginRight: responsiveWidth(2), color: lightColors.mainBlue}}>{text.actifAccount.title}</Text>
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
                  <TouchableOpacity onPress={() => {onDelete(item._id)}} style={[mainStyle.shadow,
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