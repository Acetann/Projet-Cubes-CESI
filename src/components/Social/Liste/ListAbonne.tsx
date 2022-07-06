import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView, View} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosInstance } from '../../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../../Types/User/Utilisateur.type';
import { ListUser } from '../ListUser';

interface ListAbonneProps {
    abonne: Boolean;
}

export const ListAbonne: React.FunctionComponent<ListAbonneProps> = ({abonne}) => {
  const [abonneToUser, setAbonneToUser]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);

    useEffect(() => {
      axiosInstance.get<IUtilisateursData[]>('/utilisateur/abonne')
                .then((res) => {
                  /* console.log('console importante', res) */
                  setAbonneToUser(res.data)
                })
                .catch((err) => {
                    console.log(err)

                });
        }, []);
        
  return (
    <ScrollView style={{ paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5)}}>
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