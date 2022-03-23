import { Card } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Cesi } from "../../api/Users";
import { lightColors } from "../../config/colors/colors";

interface UsersProps{
  nom: string;
  prenom: string;
  id: number;
  mail: string;
  compte_actif: Boolean;
  image: string;
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
      <ScrollView>
        {data.map(((item: UsersProps, index: number) => {
          return (
                <Card key={index} style={{margin:8}}>
                    <Card.Header
                        key={item.id}
                        title={item.prenom}
                        thumbStyle={{ width: 30, height: 30 }}
                        thumb={item.image}
                        extra={item.nom}
                    />
                    <Card.Body key={item.id}>
                        <View style={{ height: 42 }}>
                            <Text style={{ marginLeft: 16 }}>{item.mail}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer
                      key={item.id}
                      content={item.compte_actif === false ? <Icon name="close" color={lightColors.red} /> : <Icon name="check" color={lightColors.green} />}
                      extra=""
                    />
          </Card>
        )
      }))}
      </ScrollView>
    )
}