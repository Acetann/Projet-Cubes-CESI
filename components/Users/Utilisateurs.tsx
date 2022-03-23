import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Cesi } from "../../api/Users";
import { FriendContainer } from "../Friends/FriendContainer";

interface UsersProps{
  pseudo: string;
  nom: string;
}

export const Users: React.FunctionComponent<UsersProps> = () => {

    const [data, setData] = useState([]);
    const getUsers = async () => {
        try {
          let response = await fetch(
            `http://${Cesi}:3000/api/utilisateur`
          );
          const json = await response.json();
          return setData(json);
        } catch (error) {
          console.error(error);
        }
      };
useEffect(() => {
  getUsers();
}, []);
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item, index }: ListRenderItemInfo<UsersProps>) => (
                    <FriendContainer key={index} name={item.pseudo} pseudo={item.nom} />
                )}
                />
        </View>
    )
}