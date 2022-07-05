import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../../../config/colors/colors';
import { axiosInstance } from '../../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../../Types/User/Utilisateur.type';
import { ListUser } from '../ListUser';

interface ListAbonnementProps {
    abonne: Boolean;
}

export const ListAbonnement: React.FunctionComponent<ListAbonnementProps> = ({ abonne }) => {

    const [userAbonnement, setUserAbonnement]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);

    useEffect(() => {
        axiosInstance.get<IUtilisateursData[]>('/utilisateur/abonnement')
            .then((res) => {
                console.log(res.data)
                setUserAbonnement(res.data)
            })
            .catch((err) => {
                console.log(err)

            });
    }, []);

    return (
        <ScrollView style={{ backgroundColor: Colors.white, paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5) }}>
            {userAbonnement.map(((item: IUtilisateursData, index: number) => {
                console.log(item)
                return (
                    <Fragment key={index}>
                        <ListUser
                            nom={item?.utilisateur.nom}
                            prenom={item?.utilisateur.prenom}
                            pseudo={item?.utilisateur.pseudo}
                            abonne={abonne}
                            image={item?.utilisateur.image}
                        />
                    </Fragment>
                )
            }))}
            <View style={{ marginBottom: responsiveWidth(5) }} />
        </ScrollView>
    );
};
