import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../../utils/AppConst';
import { ActionType } from './actionsType';

export interface UserModel {
        utilisateur: {
            _id: string;
            compte_actif: boolean;
            nom: string;
            prenom: string;
            pseudo: string;
            mail: string;
            mot_de_passe: string;
            nbdabonne: number;
            nbdabonnement: number
            role: string;
            ressources: [];
            },
        token: string   
}

export interface LoginAction {
    readonly type: ActionType.LOGIN;
    payload: UserModel
}

export interface RegisterAction {
    readonly type: ActionType.REGISTER;
    payload: UserModel
}

export interface ErrorAction{
    readonly type: ActionType.ERROR;
    payload: any
}

export type UserAction = LoginAction | RegisterAction | ErrorAction;

export const onLogin = (mail: string, mot_de_passe: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}connexion`, {
                mail,
                mot_de_passe,
            });

            if (!response) {
                dispatch({
                    type: ActionType.ERROR,
                    payload: 'Login issue with API',
                });
            } else {
                dispatch({
                    type: ActionType.LOGIN,
                    payload: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: ActionType.ERROR,
                payload: error,
            });
        }
    };
};

export const onRegister = (nom: string, prenom: string, pseudo: string, mail: string, mot_de_passe: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}inscription`, {
                nom,
                prenom,
                pseudo,
                mail,
                mot_de_passe,
            });

            if (!response) {
                dispatch({
                    type: ActionType.ERROR,
                    payload: 'Login issue with API',
                });
            } else {
                dispatch({
                    type: ActionType.REGISTER,
                    payload: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: ActionType.ERROR,
                payload: error,
            });
        }
    };
};