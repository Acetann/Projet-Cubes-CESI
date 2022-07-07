import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native"
import { MYPUBLICATION } from "../../constants/routesName";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { RouteParams } from "../../navigations/AuthNavigator";
import { CustomButton } from "../common/Button";
import * as ImagePicker from 'expo-image-picker';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";
import { Icon } from "react-native-elements";

export const EditPublicationComponent = () => {

    //Fonction qui donne accès l'objet route et permet de récuperer ses props
    const route = useRoute<RouteProp<RouteParams>>();
    
   //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    
    //Déclaration des 3 variables nécéssaire à l'update d'une publication
    //On récupère les valeurs de la publication grâce à l'objet route et ses props
    const [texte, setTexte] = useState(route.params?.texte)
    const [titre, setTitre] = useState(route.params?.titre)
    const [image, setImage] = useState(route.params?.image)

    //Fonction qui met à jour les publications
    //le params<id> est récupéré grâce à l'objet route et ses props
    //depuis la page PublicationContent
    const updateCurrentPublication = () => {
        axiosInstance.patch(`/ressource/${route.params?.id}/`, { 
            texte, 
            titre,
            image
            })
            .then((res) => {
                navigation.goBack()
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
                {!image && (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        {image && <Image
                            source={{ uri: image }}
                            style={{ width: '100%', height: 300 }}
                        />}
                        <TouchableOpacity onPress={selectChoose}>
                            <Icon
                            reverse
                            name='image'/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={{marginHorizontal: responsiveWidth(5)}}>
                <View style={{marginVertical: responsiveWidth(2)}}>
                    <Text>{'Titre'}</Text>
                    <TextInput
                        placeholder="Titre"
                        onChangeText={(text: string) => setTitre(text)}
                        defaultValue={titre}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD',
                        }}
                    />
                </View>
                <View style={{marginVertical: responsiveWidth(2)}}>
                    <Text>{'Description'}</Text>
                    <TextInput
                        placeholder="Description"
                        onChangeText={(text: string) => setTexte(text)}
                        defaultValue={texte}
                    style={{
                        fontSize : 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                    }}
                />
                </View>
            <CustomButton
                title={'Envoyer'}
                onPress={updateCurrentPublication}
                secondary
                style={{marginTop: responsiveWidth(3)}}
            />
            </View>
        </View>
    )
}