import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { axiosInstance, axiosWithoutToken } from '../../helpers/axios.interceptor';
import IPublicationsData, { defaultPublications } from '../../Types/Publications.type';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

    const [publications, setPublications]: [IPublicationsData[], (publications: IPublicationsData[]) => void] = useState(defaultPublications);

    useEffect(() => {
        axiosWithoutToken.get<IPublicationsData[]>('/ressource')
                .then((res) => {
                    setPublications(res.data)
                })
                .catch((err) => {
                    console.log(err)

                });
        }, []);


    return (
        <View>
            {publications.map((publication) => (
                <Text key={publication._id}>
                    <Text>{publication.nb_reaction}</Text>
                </Text>
            ))}
        </View>
    )
}