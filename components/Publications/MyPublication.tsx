import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FriendContainer } from "../Friends/FriendContainer";

interface MyPublicationProps{}

export const MyPublication: React.FunctionComponent<MyPublicationProps> = () => {
    const data = [
        {name: "Olivier", pseudo: "Copao", id:"1", source:'https://reactnative.dev/img/tiny_logo.png'},
        {name: "Alexandre", pseudo: "Kinae", id:"2"},
        {name: "Patrick", pseudo: "Ricardo", id:"3"},
        {name: "Thomas", pseudo: "Rafallgar", id:"4"},
        {name: "Paul", pseudo: "Acetannhauser", id:"5"},
    ]
    const [fruit, setFruit] = useState(data)
    useEffect(() => setFruit(data),[])
    return (
        <View>
            <FlatList data={fruit} renderItem={({item}) => (
                <FriendContainer name={item.name} pseudo={item.pseudo} source={item.source} />
            )} />
        </View>
    )
}