import { ActionType } from '../actions/actionsType'
import { UserAction, UserModel } from '../actions/userActions'

type UserState = {
    data: UserModel
    error: string | undefined
}

const initialState= {
    data: {} as UserModel,
    error: undefined
}

export const UserReducer = (state: UserState = initialState, action: UserAction) => {
    switch(action.type){

        case ActionType.LOGIN:
            return {
                ...state,
                data: action.payload
            }
        case ActionType.REGISTER:
            return {
                ...state,
                data: action.payload
            }    
        case ActionType.ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};