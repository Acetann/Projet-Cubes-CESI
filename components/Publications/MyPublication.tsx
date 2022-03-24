import { Card } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, ScrollView, Text, View } from "react-native";
import { Maison } from "../../api";
import { getPublication } from "../../api/Publications";
import { image } from "../../assets";
import { FriendContainer } from "../Friends/FriendContainer";

interface MyPublicationProps{
    texte: string;
    id:number;
    image: string;
}

export const MyPublication: React.FunctionComponent<MyPublicationProps> = () => {
    const [publication, setPublication] = useState([]);
    
     
       useEffect(() => {
        getPublication(setPublication);
       }, []);
    return (
      <ScrollView>
      {publication.map(((item: MyPublicationProps, index: number) => {
        return (
              <Card key={index} style={{margin:8}}>
                  <Card.Header
                      key={item.id}
                      title=""
                      thumbStyle={{ width: 30, height: 30 }}
                      thumb={item.image || image.imageHome}
                      extra={item.texte}
                  />
                  <Card.Body key={item.id}>
                      <View style={{ height: 42 }}>
                          <Text style={{ marginLeft: 16 }}>""</Text>
                      </View>
                  </Card.Body>
                  <Card.Footer
                    key={item.id}
                    content=""
                    extra=""
                  />
        </Card>
      )
    }))}
    </ScrollView>
    )
}