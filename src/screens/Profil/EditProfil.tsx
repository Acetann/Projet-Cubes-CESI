import React, { useState } from "react"
import { View, Text, Image, Alert } from "react-native"

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RouteParams } from "../../navigations/AuthNavigator";

import { Icon } from "react-native-elements";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { CustomButton } from "../../components/common/Button";
import { PROFILE } from "../../constants/routesName";
import * as ImagePicker from 'expo-image-picker';

export const Edit_profil = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const route = useRoute<RouteProp<RouteParams>>();
    
    const [pseudo, setPseudo] = useState(route.params?.pseudo)
    const [description, setDescription] = useState(route.params?.description)
    const [mail, setMail] = useState(route.params?.mail)
    const [image, setImage] = useState(route.params?.image)


    const data = [
        {
            postImg: 'https://cdn.pixabay.com/photo/2022/05/18/17/09/hills-7205745_960_720.jpg'
        },
        {
            postImg: 'https://media.istockphoto.com/photos/solar-panels-fields-on-the-green-hills-picture-id1170098138?b=1&k=20&m=1170098138&s=170667a&w=0&h=RTURvFjZovBtNqborDPqmSR0PxatbZuusKJeUsKS3TM='
        },
        {
            postImg: 'https://media.istockphoto.com/photos/empty-quarter-desert-dunes-rub-al-khali-landscape-picture-id1221129797?b=1&k=20&m=1221129797&s=170667a&w=0&h=Ax8cvgGe9ynXDCtOywQuaR-Lg-4CEPSB_L_looJGt8E='
        },
    ]

    const updateCurrentUser = () => {
        axiosInstance.patch('utilisateur/update', { 
            description,
            pseudo,
            mail,
            image,
         })
            .then((res) => {
                console.log(res.data)
                navigation.navigate(PROFILE)
            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });  
    }


const pickImage = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
        setImage(result.uri);
        console.log(result.uri);
    }
}

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
        }
    }

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
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                marginTop: 32
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}>
                <Icon name="close" style={{fontSize: 35}} />            
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
                {image && <Image
                    source={{ uri: image }}
                    style={{width: 150, height: 150, borderRadius: 100}}
                />}
                <TouchableOpacity>
                    <Text
                    style={{
                        color: 'blue',
                        padding: 10,
                        fontSize: 14
                    }}
                    
                        onPress={selectChoose}>
                    Modifier photo de profil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
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
            <View style={{padding: 10}}>
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
            <View style={{ padding: 10 }}>
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
                title={'submit'}
                onPress={updateCurrentUser}
                secondary
                style={{marginTop: 50}}
            />

        </View>
    )
}