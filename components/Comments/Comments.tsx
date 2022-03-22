import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Cesi } from "../../api/Users";
import { FriendContainer } from "../Friends/FriendContainer";

interface CommentsProps{}

export const Comments: React.FunctionComponent<CommentsProps> = () => {
    const [data, setData] = useState([]);
    const getComments = async () => {
        try {
          const response = await fetch(
            `http://${Cesi}:3001/api/commentaire`
          );
          const json = await response.json();
          return setData(json);
        } catch (error) {
          console.error(error);
        }
      };
     
       useEffect(() => {
        getComments();
       }, []);
    return (
        <View>
            <FlatList data={data} renderItem={({ item }: ListRenderItemInfo<ItemType>) => (
                    <FriendContainer name={item.nom} pseudo={item.description} />
                )} />
        </View>
    )
}