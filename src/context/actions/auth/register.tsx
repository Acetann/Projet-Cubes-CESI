import { REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, CLEAR_AUTH_STATE } from "../../../constants/actionTypes";
import { axiosInstance } from "../../../helpers/axios.interceptor";

export const clearAuthState = () => (dispatch: any) => {
    dispatch({
        type: CLEAR_AUTH_STATE,
    })
}

export default ({ nom, prenom, pseudo, mail, mot_de_passe }) => (dispatch: any) => (onSuccess: any) => {
    dispatch({
        type: REGISTER_LOADING
    });
    axiosInstance
        .post('inscription', {
            nom,
            prenom,
            pseudo,
            mail,
            mot_de_passe,
        })
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            onSuccess(res.data);
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response ? err.response.data : { error: 'Something went wront, try again'}
            }); 
        });
    };