import React, { useEffect, useRef, useState } from "react"
import { View, Text, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RouteParams } from "../../navigations/AuthNavigator";
import { Profil } from "../../tabs/Profil/Profil";
import { Icon } from "react-native-elements";
import { axiosInstance } from "../../helpers/axios.interceptor";
import { CustomButton } from "../../components/common/Button";
import { PROFILE } from "../../constants/routesName";
import * as ImagePicker from 'expo-image-picker';

export const Edit_profil = () => {
    const [currentUserDecoded, setCurrentUserDecoded] = useState()
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const [pseudo, setPseudo] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [mail, setMail] = useState<string | null>(null)
    const [image, setImage] = useState('');

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
            const currentUserDecoded = JSON.parse(data!)

            if (currentUserDecoded !== null) {
                setCurrentUserDecoded(currentUserDecoded)

            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateCurrentUser = () => {
        axiosInstance.patch('utilisateur/update', { 
            description,
            pseudo,
            mail,
         })
            .then((res) => {
                console.log(res.data)
                const updateUser = JSON.stringify(res.data)
                AsyncStorage.setItem('currentUser', updateUser)
                navigation.navigate(PROFILE)

            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });  
    }

    const pickImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(_image);

        if (!_image.cancelled) {
            setImage(_image.uri);
        }
        return _image
    };



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
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <Image
                    source={{ uri: image }}
                    style={{width: 150, height: 150, borderRadius: 100}}
                    /* defaultSource={{ uri: defaultImage}} */
                />
                <TouchableOpacity>
                    <Text
                    style={{
                        color: 'blue',
                        padding: 10,
                        fontSize: 14
                    }}
                    
                        onPress={pickImage}>
                    Modifier photo de profil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <Text>pseudo</Text>
                <TextInput
                    placeholder="pseudo"
                    onChangeText={(text: string) => setPseudo(text)}
                    defaultValue={currentUserDecoded?.pseudo}
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
                    defaultValue={currentUserDecoded?.description}
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
                    defaultValue={currentUserDecoded?.mail}
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