import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { getPublication } from '../../../api/Publications';
import { PublicationContent } from '../../../src/components/Publication/PublicationContent';

export const AllPublicationContent = ({isPublicationHome}) => {

  const [publication, setPublication] = useState([]);

    useEffect(() => {
        getPublication(setPublication);
    }, []);
    
    return (
      <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(isPublicationHome ? 0 : 10), paddingTop: responsiveWidth(5)}}>
        {publication.map(((item, index) => {
          return (
            <Fragment key={index}>
              <PublicationContent
                pseudo={item.pseudo} 
                texte={item.texte} 
                titre={item.titre} 
                img={item.image} 
                date_creation={item.date_creation}
                nb_reaction={item.nb_reaction}
              />
            </Fragment>
          )
        })).slice(0,isPublicationHome ? 1 : publication.length)}
        <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}