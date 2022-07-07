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

//Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  //Déclare trois variables d'état
  //qui seront typés comme  string ou null
  //et définit à null par défaut
  const [titre, setTitre] = useState<string | null>(null)
  const [texte, setTexte] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)


   //Ajoute une nouvelle publication
   //requete patch car la publication fait partie de l'objet user et donc modifie l'user en lui ajoutant une publication
  const addNewPublication = () => {
    axiosInstance.patch('ressource', { titre, texte, image }) /* variables concernées par l'ajout d'une publication */
      .then((res) => {
        navigation.goBack()         
      })
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

