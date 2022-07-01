import { CLEAR_AUTH_STATE, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "../../constants/actionTypes";
import authState from "../initialStates/authState";


export const auth = (state: typeof authState, {type, payload}: any) => {
    switch(type){ 
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                isLoggedIn: true,
            };

        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case CLEAR_AUTH_STATE:
            return {
                ...state,
                loading: false,
                data: null,
                error: null
            };
            
        case LOGOUT:
            return {
                ...state,
                loading: false,
                data: null,
                isLoggedIn: false
            };
    
        default:
            return state;
    }
};
