import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Cesi } from "../../api/Users";
import { FriendContainer } from "../Friends/FriendContainer";

interface UsersProps{}

export const Users: React.FunctionComponent<UsersProps> = () => {

    const [data, setData] = useState([]);
    const getUsers = async () => {
        try {
          const response = await fetch(
            `http://${Cesi}:3001/api/utilisateur`
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
                renderItem={({ item }: ListRenderItemInfo<ItemType>) => (
                    <FriendContainer name={item.pseudo} pseudo={item.nom} />
                )}
                keyExtractor={(item) => item.id}
                />
        </View>
    )
}