export const auth = (state: any, {type, payload}: any) => {
    switch( type){
        
        case 'REGISTER_LOADING':
        case 'LOGIN_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                data: payload,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                data: payload,
                isLoggedIn: true,
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case 'CLEAR_AUTH_STATE':
            return {
                ...state,
                loading: false,
                daata: null,
                error: null
            };
    
        default:
            return state;
    }
};
