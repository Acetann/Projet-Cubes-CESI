import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { MYPUBLICATION } from '../../constants/routesName';
import { axiosInstance } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import { CustomButton } from '../common/Button';
import { Input } from '../common/Input'
import * as ImagePicker from 'expo-image-picker';


export const AddPublicationComponent: FC = (props) => {
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const [titre, setTitre] = useState<string | null>(null)
  const [texte, setTexte] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)

const addNewPublication = () => {
      axiosInstance.post('ressource', { titre, texte, image })
          .then((res) => {
            console.log(res.data)
            navigation.goBack()
              
          })
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

return (
    <View style={{margin: responsiveWidth(5)}}>
        <Input placeholder= 'Titre' onChangeText={(text: string) => setTitre(text)} />
        <Input placeholder='Texte' onChangeText={(text: string) => setTexte(text)} />
        <View style={{ padding: 20, alignItems: 'center' }}>
          {image && <Image
            source={{ uri: image }}
            style={{ width: '100%', height: 300 }}
          /* defaultSource={{ uri: defaultImage}} */
          />}
          <TouchableOpacity>
            <Text
              style={{
                color: 'blue',
                padding: 10,
                fontSize: 14
              }}

            onPress={selectChoose}>
              Ajouter une image
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton 
            style={{borderRadius: 16}}
            title={'Envoyer'}
            onPress={addNewPublication}
            secondary
        />
    </View>
    )


  
};

