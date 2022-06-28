import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';

export const rootReducer = combineReducers({
    utilisateur: UserReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>
