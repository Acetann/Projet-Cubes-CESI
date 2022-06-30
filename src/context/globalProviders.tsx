import React, { useReducer } from 'react';
import { GlobalContext} from "./globalContext"
import authInitialState from './initialStates/authInitialState';
import contactsInitialState from './initialStates/contactsInitialState';
import { auth } from './reducers/auth';
import { contacts } from './reducers/contacts';

interface props {
    children: JSX.Element | JSX.Element[]
}

export const GlobalProvider = ({ children }: props ) =>{

    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [contactsState, contactsDispatch] = useReducer(
      contacts, 
      contactsInitialState
      );

    return(
      <GlobalContext.Provider value={({authState, contactsState, authDispatch, contactsDispatch})}>
        {children}
      </GlobalContext.Provider>
    )
};

