import { Button, Card } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { getCurrentUser, getUsers } from "../../api/Users";
import { RouteParams } from "../../navigation/RouteNavigator";
import { mainStyle } from "../../styles/styles";
import { text } from "../../words/words";
import { buttonStyle } from "../Button/ButtonStyle";
import * as ImagePicker from 'expo-image-picker';
import { imageUploaderStyles } from "./stylesProfile";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../src/redux";

interface ProfileProps{
    nom: string;
    prenom: string;
    id: number;
    mail: string;
    compte_actif: Boolean;
    image: string;
    pseudo: string;
    _id: string;
}

export const Profile: React.FunctionComponent<ProfileProps> = () => {

    const [users, setUsers] = useState([]);
    const [images, setImage] = useState('');
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        });
    if (!_image.cancelled) {
        setImage(_image.uri);
    };
    return _image;
  }
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const { utilisateur, error } = useSelector(
        (state: ApplicationState) => state.userReducer
    );
    
    const { token, body } = utilisateur;

    useEffect(() => {
      getUsers(setUsers);
    }, [utilisateur]);
    return (
        <ScrollView style={{ padding: responsiveWidth(5), paddingBottom: responsiveWidth(10) }}>
            {users.filter(currentUser => currentUser._id === body._id).map(((item: ProfileProps, index: number) => {
                return (
                    <Card key={index} style={{ margin: 8 }}>
                        <Card.Body key={item.id} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: responsiveWidth(5) }}>
                                <Text style={{ marginHorizontal: 8 }}>{item.mail}</Text>
                                <View style={[mainStyle.center, { marginRight: 8 }]}>
                                    <Button type="primary" onPress={() => navigation.navigate("Mail", { mail: item.mail })} style={buttonStyle.Container}>{text.email.updateEmail}</Button>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: responsiveWidth(5) }}>
                                <Text style={{ marginHorizontal: 8 }}>{item.prenom}</Text>
                                <View style={[mainStyle.center, { marginRight: 8 }]}>
                                    <Button type="primary" onPress={() => navigation.navigate("Prenom", { prenom: item.prenom })} style={buttonStyle.Container}>{text.firstName.updateFirstName}</Button>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: responsiveWidth(5) }}>
                                <Text style={{ justifyContent: 'center', marginHorizontal: 8 }}>{item.nom}</Text>
                                <View style={[mainStyle.center, { marginRight: 8 }]}>
                                    <Button type="primary" onPress={() => navigation.navigate("Nom", { nom: item.nom })} style={buttonStyle.Container}>{text.lastName.updateLastName}</Button>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: responsiveWidth(5) }}>
                                <Text style={{ justifyContent: 'center', marginHorizontal: 8 }}>{item.pseudo}</Text>
                                <View style={{ marginRight: 8 }}>
                                    <Button type="primary" onPress={() => navigation.navigate("Pseudo", { pseudo: item.pseudo })} style={buttonStyle.Container}>{text.pseudo.updatePseudo}</Button>
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                )
            }))}
        </ScrollView>
    )
}