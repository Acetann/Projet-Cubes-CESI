import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Cesi, Maison } from "../../api";
import { FriendContainer } from "../Friends/FriendContainer";

interface CommentsProps{
  nom: string;
  description: string;
}

export const Comments: React.FunctionComponent<CommentsProps> = () => {
    const [data, setData] = useState([]);
    const getComments = async () => {
        try {
          const response = await fetch(
            `http://${Maison}:3000/api/commentaire`
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
            <FlatList data={data} renderItem={({ item }: ListRenderItemInfo<CommentsProps>) => (
                    <FriendContainer name={item.nom} pseudo={item.description} />
                )} />
        </View>
    )
}