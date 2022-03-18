import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { FriendContainer } from "../Friends/FriendContainer";

interface UsersProps{}

export const Users: React.FunctionComponent<UsersProps> = () => {

    const [data, setData] = useState([]);
    const getMoviesFromApiAsync = async () => {
        try {
          const response = await fetch(
            'http://192.168.1.12:3001/api/utilisateur'
          );
          const json = await response.json();
          return setData(json);
        } catch (error) {
          console.error(error);
        }
      };
     
       useEffect(() => {
        getMoviesFromApiAsync();
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