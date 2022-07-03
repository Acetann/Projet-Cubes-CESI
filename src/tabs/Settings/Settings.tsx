import { Button } from '@ant-design/react-native';
import React, { useContext } from 'react';
import { Alert, View } from 'react-native';
import logout from '../../context/actions/auth/logout';
import { GlobalContext } from '../../context/globalContext';

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
    return (
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <Button
                    children={'Se déconnecter'}
                    onPress={getDeconnected}
                /> 
            </View>
    )
}