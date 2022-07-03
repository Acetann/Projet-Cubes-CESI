import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosWithoutToken } from '../../helpers/axios.interceptor';
import IPublicationsData, { defaultPublications } from '../../Types/Publications.type';
import { PublicationContent } from './PublicationContent';

interface AllPublicationProps {
  isHome: Boolean,
}

export const AllPublicationContent: React.FunctionComponent<AllPublicationProps> = ({isHome}) => {

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
      <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(isHome ? 0 : 10), paddingTop: responsiveWidth(5)}}>
        {publications.map(((item, index) => {
          return (
            <Fragment key={index}>
              <PublicationContent
                pseudo={item.utilisateur.pseudo} 
                texte={item.texte} 
                titre={item.titre} 
                img={item.Image} 
                date_creation={item.date_creation}
                nb_reaction={item.nb_reaction}
              />
            </Fragment>
          )
        }))}
        <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}