import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView, View} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../../../config/colors/colors';
import { axiosInstance } from '../../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../../Types/User/Utilisateur.type';
import { ListUser } from '../ListUser';

interface ListAbonneProps {
    abonne: Boolean;
}

export const ListAbonne: React.FunctionComponent<ListAbonneProps> = ({abonne}) => {

const [friend, setFriend]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);

    useEffect(() => {
      axiosInstance.get<IUtilisateursData[]>('/utilisateur')
                .then((res) => {
                  setFriend(res.data)
                })
                .catch((err) => {
                    console.log(err)

                });
        }, []);


  return (
    <ScrollView style={{backgroundColor:Colors.white, paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5)}}>
        {friend.map(((item: IUtilisateursData, index: number) => {
          return (
            <Fragment key={index}>
              <ListUser
                nom={item.nom} 
                prenom={item.prenom} 
                pseudo={item.pseudo}
                abonne={abonne}
            />
            </Fragment>
          )
        }))}
        <View style={{marginBottom: responsiveWidth(5)}} />
    </ScrollView>
  );
};

export default ListAbonne;