import React, { useReducer } from 'react';
import { GlobalContext} from "./globalContext"
import authInitialState from './initialStates/authState';
import { auth } from './reducers/auth';


interface props {
    children: JSX.Element | JSX.Element[]
}

export const GlobalProvider = ({ children }: props ) =>{

    const [authState, authDispatch] = useReducer(auth, authInitialState);
    

    return(
      <GlobalContext.Provider value={({authState, authDispatch})}>
        {children}
      </GlobalContext.Provider>
    )
};

