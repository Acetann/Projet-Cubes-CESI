import { Card } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getPublication } from "../../api/Publications";
import { image } from "../../assets";

interface PublicationProps{
    texte: string;
    id:number;
    image: string;
}

export const Publication: React.FunctionComponent<PublicationProps> = () => {

    const [publication, setPublication] = useState([]);
    useEffect(() => {
        getPublication(setPublication);
    }, []);
    return (
        <ScrollView>
        {publication.map(((item: PublicationProps, index: number) => {
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