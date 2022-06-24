import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import { UserAction, UserModel } from '../actions/userActions'

type UserState = {
    utilisateur: UserModel
    error: string | undefined
}

const initialState= {
    utilisateur: {} as UserModel,
    error: undefined
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    switch(action.type){

        case 'ON_LOGIN':
            return {
                ...state,
                utilisateur: action.payload
            }
        case 'ON_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export { UserReducer };