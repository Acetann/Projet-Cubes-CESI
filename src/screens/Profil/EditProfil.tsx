import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RouteParams } from "../../navigations/AuthNavigator";
import { Profil } from "../../tabs/Profil/Profil";
import { Icon } from "react-native-elements";

export const Edit_profil = () => {
    const [currentUserDecoded, setCurrentUserDecoded] = useState()
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

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

    const getCurrentUser = async () => {
        try {
            const data = await AsyncStorage.getItem('currentUser')
            const data1 = await AsyncStorage.getItem('currentToken')
            console.log(data1)
            const currentUserDecoded = JSON.parse(data!)
            console.log(currentUserDecoded)
            if (currentUserDecoded !== null) {
                setCurrentUserDecoded(currentUserDecoded)
                console.log(currentUserDecoded)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);


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
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Modifier mon profil</Text>
                <TouchableOpacity>
                    <Icon name="check" style={{fontSize: 35, color: 'blue'}} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <Image
                source={{ uri: data[0].postImg }}
                style={{width: 80, height: 80, borderRadius: 100}}
                />
                <TouchableOpacity>
                    <Text
                    style={{
                        color: 'blue'
                    }}>
                    Modifier photo de profil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
                <Text>Nom</Text>
                <TextInput
                placeholder="nom"
                defaultValue={currentUserDecoded?.nom}
                style={{
                    fontSize : 16,
                    borderBottomWidth: 1,
                    borderColor: '#CDCDCD',
                }}
            />
            </View>
            <View style={{ padding: 10 }}>
                <Text>Prenom</Text>
                <TextInput
                    placeholder="nom"
                    defaultValue={currentUserDecoded?.prenom}
                    style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                    }}
                />
            </View>
            <View style={{ padding: 10 }}>
                <Text>Pseudo</Text>
                <TextInput
                    placeholder="nom"
                    defaultValue={currentUserDecoded?.pseudo}
                    style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                    }}
                />
            </View>

        </View>
    )
}