import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Cesi } from "../../api";
import { getUsers } from "../../api/Users";
import { image } from "../../assets";
import { RouteParams } from "../../navigation/RouteNavigator";
import { SocialContent } from "../../src/components/Social/SocialContent";
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

export const Utilisateurs: React.FunctionComponent<UsersProps> = () => {
  
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
              navigation.navigate("Utilisateurs");
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
          <Fragment key={index}>
            <SocialContent
              nom={item.nom} 
              prenom={item.prenom} 
              _id={item._id} 
              img={item.image} 
              compte_actif={item.compte_actif}
              mail={item.mail}
              onDelete={onDelete}
            />
          </Fragment>
        )
      }))}
      <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}