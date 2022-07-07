import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ABONNE, ABONNEMENT, ADDABONNE, ADDABONNEMENT, ADDPUBLICATION, ADD_COMMENTAIRE, ADD_REPONSE, COMMENTAIRE, EDIT_PROFILE, EDIT_PUBLICATION, MESSAGE, MYPUBLICATION, REPONSE, SETTINGS } from '../constants/routesName';
import TabBarNavigation from './TabBarNavigator';
import { Settings } from '../tabs/Settings/Settings';
import { Abonne } from '../screens/Social/Abonne';
import { Abonnement } from '../screens/Social/Abonnement';
import { Message } from '../components/Social/Message';
import { Edit_profil } from '../screens/Profil/EditProfil';
import { AddAbonne } from '../screens/Social/Ajouter/AddAbonne';
import { AddAbonnement } from '../screens/Social/Ajouter/AddAbonnement';
import { AddPublication } from '../screens/Publication/AddPublication/addPublication';
import { MyPublication } from '../screens/Publication/MyPublication';
import { EditPublication } from '../screens/Publication/EditPublication/EditPublication';
import { AddCommentaire } from '../screens/AddCommentaire/AddCommentaire'
import Commentaire from '../components/Commentaire/Commentaire';
import { AddReponse } from '../components/Commentaire/Reponse/AddReponse';
import Reponse from '../components/Commentaire/Reponse/Reponse';



export const HomeNavigator = () => {
    const HomeStack = createStackNavigator();
   
    return(
        <HomeStack.Navigator initialRouteName="Tabs">
            <HomeStack.Screen options={{headerShown: false}} name="Tabs" component={TabBarNavigation} />
            <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Mes abonnés'}} name={ABONNE} component={Abonne} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Ajouter un abonné'}} name={ADDABONNE} component={AddAbonne} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Mes abonnements'}} name={ABONNEMENT} component={Abonnement} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Ajouter un abonnement'}} name={ADDABONNEMENT} component={AddAbonnement} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Ajouter une publication' }} name={ADDPUBLICATION} component={AddPublication} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Modifier ma publication' }} name={EDIT_PUBLICATION} component={EditPublication} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Mes publications' }} name={MYPUBLICATION} component={MyPublication} ></HomeStack.Screen>
            <HomeStack.Screen name={COMMENTAIRE} component={Commentaire} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Ajouter un commentaire' }} name={ADD_COMMENTAIRE} component={AddCommentaire} ></HomeStack.Screen>
            <HomeStack.Screen name={REPONSE} component={Reponse} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Ajouter une réponse' }} name={ADD_REPONSE} component={AddReponse} ></HomeStack.Screen>
            <HomeStack.Screen options={{ headerTitle: 'Modifier mon profil' }} name={EDIT_PROFILE} component={Edit_profil} ></HomeStack.Screen>
            <HomeStack.Screen name={MESSAGE} component={Message} ></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}