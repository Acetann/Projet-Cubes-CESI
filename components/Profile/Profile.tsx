import { Button, Card } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { getUsers } from "../../api/Users";
import { RouteParams } from "../../navigation/RouteNavigator";
import { mainStyle } from "../../styles/styles";
import { text } from "../../words/words";
import { buttonStyle } from "../Button/ButtonStyle";
import * as ImagePicker from 'expo-image-picker';
import { imageUploaderStyles } from "./stylesProfile";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../src/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [token, setToken] = useState('')

    const { data, error } = useSelector(
        (state: ApplicationState) => state.utilisateur
    );

    useEffect(() => {
    getToken()
    }, [data]);


    const getToken = () => {
        try{
            AsyncStorage.getItem('token')
            .then(value => {
                if(value !=  null){
                    setToken(value)
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    return (
        <ScrollView style={{ padding: responsiveWidth(5), paddingBottom: responsiveWidth(10) }}>
            <Text>Bienvenue {data.utilisateur.mail}</Text>
            <Text>Pseudo: {data.utilisateur.pseudo}</Text>
            <Text>Role: {data.utilisateur.role}</Text>
            <Text>Nb d'abonnés: {data.utilisateur.nbdabonne}</Text>
            <Text>Nb d'abonnements :{data.utilisateur.nbdabonnement}</Text>
            <Text>token : {token}</Text>
        
        </ScrollView>
    )
}