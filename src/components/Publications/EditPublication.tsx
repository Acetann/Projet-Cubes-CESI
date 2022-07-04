import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react"
import { View, Text, TextInput } from "react-native"
import { MYPUBLICATION } from "../../constants/routesName";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { RouteParams } from "../../navigations/AuthNavigator";
import { CustomButton } from "../common/Button";

export const EditPublicationComponent = () => {
    const route = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const [texte, setTexte] = useState(route.params?.texte)
    const [titre, setTitre] = useState(route.params?.titre)

    const updateCurrentPublication = () => {
        axiosInstance.patch(`/ressource/${route.params?.id}/`, { 
            texte, 
            titre,
            })
            .then((res) => {
                console.log(res.data)
                navigation.navigate(MYPUBLICATION)
            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });
       
    }
    return(
        <View
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            marginTop: 32
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
     
        <CustomButton
            title={'submit'}
            onPress={updateCurrentPublication}
            secondary
        />

    </View>
    )
}