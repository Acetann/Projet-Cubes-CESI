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
    const [texte, setDescription] = useState(route.params?.texte)
    const [title, setTitle] = useState(route.params?.title)

    const updateCurrentPublication = () => {
        axiosInstance.patch(`/ressource/${route.params?.id}/`, { 
            texte: texte, 
            title: title,
            })
            .then((res) => {
                console.log(res?.data,'tomate',route.params?.id, title)
                setTitle(title)
                setDescription(texte)
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
                onChangeText={(text: string) => setDescription(text)}
                defaultValue={texte}
            style={{
                fontSize : 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
            }}
        />
        </View>
        <View style={{ padding: 10 }}>
            <Text>title</Text>
            <TextInput
                placeholder="title"
                onChangeText={(text: string) => setTitle(text)}
                defaultValue={title}
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