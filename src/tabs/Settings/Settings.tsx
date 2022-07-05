import React, { useContext } from 'react';
import { Alert, View } from 'react-native';
import { CustomButton } from '../../components/common/Button';
import logout from '../../context/actions/auth/logout';
import { GlobalContext } from '../../context/globalContext';
import { axiosInstance } from '../../helpers/axios.interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveWidth } from 'react-native-responsive-dimensions';


interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = () => {
    const { authDispatch } = useContext(GlobalContext)

    const getDeconnected = () => {
        Alert.alert('Déconnexion!', 'Es-tu sûr de vouloir te déconnecter ?', [
            {
                text: 'Annuler',
                onPress: () => {}
            },
            {
                text: 'Oui',
                onPress: () => {
                    logout()(authDispatch)
                }
            },
        ]);
    }

    const getDeleted = () => {
        axiosInstance.delete('/utilisateur/delete')
            .then((res) => {
                console.log(res.data)
                AsyncStorage.removeItem('currentUser')
                console.log(res.data)
                logout()(authDispatch)
            })
            //gestion des erreur si fail
            .catch((err) => {
                console.log(err, 'error')
            });



    }

    const deleteAccount = () => {
        Alert.alert('Attention!', 'Es-tu sûr de vouloir te supprimer ton compte ?', [
            {
                text: 'Annuler',
                onPress: () => { }
            },
            {
                text: 'Supprimer définitivement',
                onPress: () => {
                   getDeleted()
                }
            },
        ]);
    }
    return (
            <View style={{flex:1,marginHorizontal:responsiveWidth(5), justifyContent:'flex-end'}}>
                <CustomButton
                    children={'Se déconnecter'}
                    onPress={getDeconnected}
                    title={'Déconnexion'}
                    secondary
                /> 
                <CustomButton
                    children={'Supprimer mon compte'}
                    onPress={deleteAccount} 
                    title={'Supprimer mon compte'}  
                    danger 
                    disabled={true}
                /> 
            </View>
    )
}