import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Cesi } from "../../api/Users";
import { FriendContainer } from "../Friends/FriendContainer";

interface MyPublicationProps{
  nom: string;
  description: string;
}

export const MyPublication: React.FunctionComponent<MyPublicationProps> = () => {
    const [data, setData] = useState([]);
    const getPublications = async () => {
        try {
          let response = await fetch(
            `http://${Cesi}:3000/api/ressource`, {
              headers: {
                "Content-Type": 'application/json'
              },
            }
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
            <FlatList data={data} renderItem={({ item,index }: ListRenderItemInfo<MyPublicationProps>) => (
                    <FriendContainer key={index} name={item.nom} pseudo={item.description} />
                )} />
        </View>
    )
}