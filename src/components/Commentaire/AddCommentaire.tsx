import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosInstance } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import { CustomButton } from '../common/Button';
import { Input } from '../common/Input'

// définition des méthodes /propriétés de AddCommentaireComponent
interface commentaireProps {}

export const AddCommentaireComponent: FC<commentaireProps> = () => {

    //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    //Fonction qui donne accès à l'objet route et permet de récuperer les props de RouteParams
    const route = useRoute<RouteProp<RouteParams>>();

    //On défini une variable d'état <description> typé <string ou null> avec la valeur null par défaut
    const [description, setDescription] = useState<string | null>(null)


    //Ajoute un nouveau commentaire
    //<param name="id"> Id de la ressource sur laquelle on ajoute le commentaire
    //<param> récupéré dans le navigate de PublicationContent(l.126) grâce à l'objet Route 
    const addNewCommentaire = () => {
        axiosInstance.patch(`/ressource/${route?.params?.id}/commentaire`, { 
            description //variable concernée par la requête
        })
        .then((res) => {
            navigation.goBack()
        })
        .catch((err) => {
            console.log(err, 'error')
        });
    }

    return (
        <View style={{ margin: responsiveWidth(5) }}>
            <Input placeholder='Description' onChangeText={(text: string) => setDescription(text)} /> {/* enregistre la nouvelle valeur du field correspondant dans l'objet description */}
            <View style={{ padding: 20, alignItems: 'center' }}>
            </View>
            <CustomButton
                style={{ borderRadius: 16 }}
                title={'Envoyer'}
                onPress={addNewCommentaire}
                secondary
            />
        </View>
    )



};

