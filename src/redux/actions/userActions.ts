import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../../utils/AppConst';

export interface UserModel {
    body: {
    _id: string;
    mail: string
    }
    token: string;
}

export interface LoginAction {
    readonly type: 'ON_LOGIN';
    payload: UserModel
}

export interface ErrorAction{
    readonly type: 'ON_ERROR';
    payload: any
}

export type UserAction = LoginAction | ErrorAction;

export const onLogin = (mail: string, mot_de_passe: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}connexion`, {
                mail,
                mot_de_passe,
            });

            if (!response) {
                dispatch({
                    type: 'ON_ERROR',
                    payload: 'Login issue with API',
                });
            } else {
                dispatch({
                    type: 'ON_LOGIN',
                    payload: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: 'ON_ERROR',
                payload: error,
            });
        }
    };
};