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
    const [isVisible, setVisible] = useState(false);
    const [userAbonnement, setUserAbonnement]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
        setVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setVisible(false);
    };

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
        <ScrollView style={{ paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5)}}>
            {userAbonnement?.filter(user => user.utilisateur !== null).map(((item: IUtilisateursData, index: number) => {
                return (
                    <Fragment key={index}>
                        <ListUser
                            nom={item?.utilisateur?.nom}
                            prenom={item?.utilisateur?.prenom}
                            pseudo={item?.utilisateur?.pseudo}
                            image={item?.utilisateur?.image}
                            utilisateur={item?.abonnement?._id}
                        />
                    </Fragment>
                )
            }))}
            <View style={{ marginBottom: responsiveWidth(5) }} />
        </ScrollView>
    );
};