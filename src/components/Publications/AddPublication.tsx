import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { MYPUBLICATION } from '../../constants/routesName';
import { axiosInstance } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import { CustomButton } from '../common/Button';
import { Input } from '../common/Input'



export const AddPublicationComponent: FC = (props) => {
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const [titre, setTitre] = useState<string | null>(null)
  const [texte, setTexte] = useState<string | null>(null)

const addNewPublication = async () => {
      axiosInstance.post('ressource', { titre, texte })
          //stockage du current user et du currentToken si success
          .then((res) => {
              navigation.navigate(MYPUBLICATION)
          })
          //gestion des erreur si fail
          .catch((err) => {
           console.log(err, 'error')
          });
}

return (
    <View>
        <Text>Hello from component</Text>
        <Input placeholder= 'Titre' onChangeText={(text: string) => setTitre(text)} />
        <Input placeholder='Texte' onChangeText={(text: string) => setTexte(text)} />
        <CustomButton 
            title={'submit'}
            onPress={addNewPublication}
            secondary
        />
    </View>
    )


  
};

