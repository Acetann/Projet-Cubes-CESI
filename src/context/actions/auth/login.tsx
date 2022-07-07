import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance, axiosWithoutToken } from "../../../helpers/axios.interceptor";
import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from '../../../constants/actionTypes';
import { useChatContext } from 'stream-chat-expo';

//Fonction de login
export default ({ mail, mot_de_passe }) => (dispatch: any) => {
    dispatch({
        type: LOGIN_LOADING
    });
    //requete avec l'instance d'axios interceptor
    axiosWithoutToken
        .post('connexion', {
            mail,
            mot_de_passe,
        })
        //enregistrement et stockage du current user et du currentToken si success
        .then((res) => {
            AsyncStorage.setItem('currentToken', res.data.token)
            AsyncStorage.setItem('currentUser', JSON.stringify(res.data.utilisateur))
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        //gestion des erreur si fail
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response
                    ? err.response.data
                    : { error: 'Something went wront, try again' },
            });
        });
};