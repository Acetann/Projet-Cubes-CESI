import React, { useState } from "react"
import { View, Text, Image, Alert } from "react-native"

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RouteParams } from "../../navigations/AuthNavigator";

import { axiosInstance } from "../../helpers/axios.interceptor";
import { CustomButton } from "../../components/common/Button";
import { PROFILE } from "../../constants/routesName";
import * as ImagePicker from 'expo-image-picker';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";

export const Edit_profil = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const route = useRoute<RouteProp<RouteParams>>();
    
    const [pseudo, setPseudo] = useState(route.params?.pseudo)
    const [description, setDescription] = useState(route.params?.description)
    const [mail, setMail] = useState(route.params?.mail)
    const [image, setImage] = useState(route.params?.image)

    const updateCurrentUser = () => {
        axiosInstance.patch('utilisateur/update', { 
            description,
            pseudo,
            mail,
            image,
         })
            .then((res) => {
                navigation.navigate(PROFILE)
            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });  
    }


    //Fonction qui renvoie l'URI d'une image qui sera enregistrée dans <image>
    const pickImage = async () => {
        // Message à l'utilisateur la permission d'accéder à ses photos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        //Si permission refusée display un msg
        if (permissionResult.granted === false) {
            alert("Vous avez refusé d'autoriser cette application à accéder à vos photos");
            return;
        }

        //
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true
        });

        // Si validé, l'image est enregistrée dans la variable d'état <image>
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const openCamera = async () => {
        // Message à l'utilisateur la permission d'accéder à son appareil photo
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        //Si permission refusée display un msg
        if (permissionResult.granted === false) {
            alert("Vous avez refusé d'autoriser cette application à accéder à votre caméra");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Si validé, l'image est enregistrée dans la variable d'état <image>
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    //Fonction qui donne à l'user le choix de la source de sa photo
    const selectChoose = () => {
        Alert.alert('', '', [
            {
                text: 'Annuler',
                onPress: () => { }
            },
            {
                text: 'Choisir une image de la bibliothèque',
                onPress: () => {
                    pickImage()
                }
            },
            {
                text: 'Prendre une nouvelle photo',
                onPress: () => {
                    openCamera()
                }
            },
        ]);
    }


    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <View style={{marginTop: responsiveWidth(5), marginHorizontal: responsiveWidth(5),alignItems: 'center'}}>
                {image && (
                        <TouchableOpacity  onPress={selectChoose}>
                            <Image
                                source={{ uri: image }}
                                style={{width: 150, height: 150, borderRadius: 150}}
                            />
                        </TouchableOpacity>
                )}
            </View>
            <View style={{marginHorizontal: responsiveWidth(5)}}>
                <View style={{marginVertical: responsiveWidth(2)}}>
                    <Text>pseudo</Text>
                    <TextInput
                        placeholder="pseudo"
                        onChangeText={(text: string) => setPseudo(text)}
                        defaultValue={pseudo}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD',
                        }}
                    />
                </View>
                <View style={{marginVertical: responsiveWidth(2)}}>
                    <Text>description</Text>
                    <TextInput
                        placeholder="description"
                        onChangeText={(text: string) => setDescription(text)}
                        defaultValue={description}
                    style={{
                        fontSize : 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                    }}
                />
                </View>
                <View style={{marginVertical: responsiveWidth(2)}}>
                    <Text>mail</Text>
                    <TextInput
                        placeholder="mail"
                        onChangeText={(text: string) => setMail(text)}
                        defaultValue={mail}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD',
                        }}
                    />
                </View>
            <CustomButton
                title={'Envoyer'}
                onPress={updateCurrentUser}
                secondary
                style={{marginTop: responsiveWidth(3)}}
            />
            </View>
        </View>
    )
}