import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Cesi } from "../../api/Users";
import { FriendContainer } from "../Friends/FriendContainer";

interface MyPublicationProps{}

export const MyPublication: React.FunctionComponent<MyPublicationProps> = () => {
    const [data, setData] = useState([]);
    const getPublications = async () => {
        try {
          const response = await fetch(
            `http://${Cesi}:3001/api/ressource`
          );
          const json = await response.json();
          return setData(json);
        } catch (error) {
          console.error(error);
        }
      };
     
       useEffect(() => {
        getPublications();
       }, []);
    return (
        <View>
            <FlatList data={data} renderItem={({ item }: ListRenderItemInfo<ItemType>) => (
                    <FriendContainer name={item.nom} pseudo={item.description} />
                )} />
        </View>
    )
}