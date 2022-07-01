import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from "../../../helpers/axios.interceptor";
import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from '../../../constants/actionTypes';

export default ({ mail, mot_de_passe }) => (dispatch: any) => {
    dispatch({
        type: LOGIN_LOADING
    });
    //requete avec l'instance d'axios interceptor (+ token)
    axiosInstance
        .post('connexion', {
            mail,
            mot_de_passe,
        })
        //stockage du current user si success
        .then((res) => {
            console.log("currentUser", res.data)
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