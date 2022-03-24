import { Button, Card } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { getUsers } from "../../api/Users";
import { image } from "../../assets";
import { RouteParams } from "../../navigation/RouteNavigator";
import { mainStyle } from "../../styles/styles";
import { text } from "../../words/words";
import { buttonStyle } from "../Button/ButtonStyle";
import * as ImagePicker from 'expo-image-picker';
import { imageUploaderStyles } from "./stylesProfile";
import { AntDesign } from '@expo/vector-icons';

interface ProfileProps{
nom: string;
  prenom: string;
  id: number;
  mail: string;
  compte_actif: Boolean;
  image: string;
  pseudo: string;
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

    useEffect(() => {
      getUsers(setUsers);
    }, []);
    return (
        <>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.contain}>
                {images === '' ? (
                    <View style={imageUploaderStyles.container}>
                        <Text style={{ marginHorizontal: 8, textAlign:'center' }}>{text.picture.imageProfile}</Text>
                    </View>
                ) : (
                    <View style={imageUploaderStyles.container}>
                        <Image source={{ uri: images }} style={{ width: '100%', height: '100%', borderRadius:150 }} />
                    </View>
                )}
            </TouchableOpacity>
        {users.map(((item: ProfileProps, index: number) => {
          return (
                <Card key={index} style={{margin:8}}>
                    <Card.Body key={item.id} >
                        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginVertical: responsiveWidth(5)}}>
                            <Text style={{ marginHorizontal: 8 }}>{item.mail}</Text>
                            <View style={[mainStyle.center,{marginRight: 8}]}>
                                <Button type="primary" onPress={() => {}} style={buttonStyle.Container}>{text.email.updateEmail}</Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginVertical: responsiveWidth(5)}}>
                            <Text style={{ marginHorizontal: 8 }}>{item.prenom}</Text>
                            <View style={[mainStyle.center,{marginRight: 8}]}>
                                <Button type="primary" onPress={() => {}} style={buttonStyle.Container}>{text.firstName.updateFirstName}</Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginVertical: responsiveWidth(5)}}>
                                <Text style={{ justifyContent:'center',marginHorizontal: 8 }}>{item.nom}</Text>
                            <View style={[mainStyle.center,{marginRight: 8}]}>
                                <Button type="primary" onPress={() => {}} style={buttonStyle.Container}>{text.lastName.updateLastName}</Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginVertical: responsiveWidth(5)}}>
                                <Text style={{ justifyContent:'center',marginHorizontal: 8 }}>{item.pseudo}</Text>
                            <View style={{marginRight: 8}}>
                                <Button type="primary" onPress={() => {}} style={buttonStyle.Container}>{text.pseudo.updatePseudo}</Button>
                            </View>
                        </View>
                    </Card.Body>
          </Card>
        )
      })).slice(0,1)}
        <View style={{margin: responsiveWidth(2)}}>
            <Button type="primary" onPress={() => navigation.navigate("MyFriend")} style={buttonStyle.Container}>{text.friend.allFriend}</Button>
        </View>
        <View style={{margin: responsiveWidth(2)}}>
            <Button type="primary" onPress={() => navigation.navigate("MyPublication")} style={buttonStyle.Container}>{text.publication.allPublication}</Button>
        </View>
      </>
    )
}