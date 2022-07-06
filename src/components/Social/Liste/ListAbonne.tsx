import React, {Fragment, useEffect, useState} from 'react';
import { RefreshControl, ScrollView, View} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosInstance } from '../../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../../Types/User/Utilisateur.type';
import { ListUser } from '../ListUser';

interface ListAbonneProps {
    abonne: Boolean;
}

export const ListAbonne: React.FunctionComponent<ListAbonneProps> = ({abonne}) => {
  const [abonneToUser, setAbonneToUser]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);
  const [refreshing, setRefreshing] = useState(true);


  const getAbonnes = () => {
    axiosInstance.get<IUtilisateursData[]>('/utilisateur/abonne')
      .then((res) => {
        /* console.log('console importante', res) */
        setAbonneToUser(res.data)
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err)
      });
  }

    useEffect(() => {
      getAbonnes()
        }, []);
        
  return (
    <ScrollView 
    style={{ 
      paddingBottom: responsiveWidth(20), 
      paddingTop: responsiveWidth(5)
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getAbonnes} />
      }
      >
      {abonneToUser?.map(((item: IUtilisateursData, index: number) => {
          return (
                <Fragment key={index}>
                  <ListUser
                    nom={item?.abonnement?.nom}
                    prenom={item?.abonnement?.prenom}
                    pseudo={item?.abonnement?.pseudo}
                    abonne={abonne}
                    image={item?.abonnement?.image}
                    utilisateur={item?.abonnement?._id}
                  />
                </Fragment>
              )
              }))}          
        <View style={{marginBottom: responsiveWidth(5)}} />
    </ScrollView>
  );
};

export default ListAbonne;