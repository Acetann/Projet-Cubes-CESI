import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { MYPUBLICATION } from '../../constants/routesName';
import { axiosInstance } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import { CustomButton } from '../common/Button';
import { Input } from '../common/Input'



export const AddPublicationComponent: FC = (props) => {
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const [titre, setTitre] = useState<string | null>(null)
  const [texte, setTexte] = useState<string | null>(null)

const addNewPublication = () => {
      axiosInstance.post('ressource', { titre, texte })
          .then((res) => {
            console.log(res.data)
            navigation.navigate(MYPUBLICATION) 
            return res.data
              
          })
          .catch((err) => {
           console.log(err, 'error')
          });
}

return (
    <View style={{margin: responsiveWidth(5)}}>
        <Input placeholder= 'Titre' onChangeText={(text: string) => setTitre(text)} />
        <Input placeholder='Texte' onChangeText={(text: string) => setTexte(text)} />
        <CustomButton 
            style={{borderRadius: 16}}
            title={'Envoyer'}
            onPress={addNewPublication}
            secondary
        />
    </View>
    )


  
};

