import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
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

              onPress={pickImage}>
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

