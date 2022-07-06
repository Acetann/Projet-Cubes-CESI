import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { MYPUBLICATION } from "../../constants/routesName";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { RouteParams } from "../../navigations/AuthNavigator";
import { CustomButton } from "../common/Button";
import * as ImagePicker from 'expo-image-picker';

export const EditPublicationComponent = () => {
    const route = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const [texte, setTexte] = useState(route.params?.texte)
    const [titre, setTitre] = useState(route.params?.titre)
    const [image, setImage] = useState(route.params?.image)
console.log(route?.params?.image)

    const updateCurrentPublication = () => {
        axiosInstance.patch(`/ressource/${route.params?.id}/`, { 
            texte, 
            titre,
            image
            })
            .then((res) => {
                console.log(res.data)
                navigation.goBack()
            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true
        });
        if (!result.cancelled) {
            setImage(result?.uri);
        }
    };

    return(
        <View
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            paddingTop: 32
        }}>
        <View style={{padding: 10}}>
            <Text>description</Text>
            <TextInput
                placeholder="description"
                onChangeText={(text: string) => setTexte(text)}
                defaultValue={texte}
            style={{
                fontSize : 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
            }}
        />
        </View>
        <View style={{ padding: 10 }}>
            <Text>titre</Text>
            <TextInput
                placeholder="titre"
                onChangeText={(text: string) => setTitre(text)}
                defaultValue={titre}
                style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderColor: '#CDCDCD',
                }}
            />
        </View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                {image && <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: 300}}
                />}
                <TouchableOpacity>
                    <Text
                        style={{
                            color: 'blue',
                            padding: 10,
                            fontSize: 14
                        }}

                        onPress={pickImage}>
                        Modifier l'image
                    </Text>
                </TouchableOpacity>
            </View>
     
        <CustomButton
            title={'submit'}
            onPress={updateCurrentPublication}
            secondary
        />

    </View>
    )
}