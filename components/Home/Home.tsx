import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { getPublication } from '../../api/Publications';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { PublicationContent } from '../../src/components/Publication/PublicationContent';

interface HomeProps {
  texte: string;
  titre: string;
  image: string;
  date_creation: Date;
  utilisateur: string;
  pseudo: string;
  nb_reaction: number;
}

export const Home: React.FunctionComponent<HomeProps> = () => {

  const [publication, setPublication] = useState([]);

    useEffect(() => {
        getPublication(setPublication);
    }, []);
    
    return (
      <ScrollView style={{padding: responsiveWidth(5), paddingBottom: responsiveWidth(10)}}>
        {publication.map(((item: HomeProps, index: number) => {
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
        }))}
        <View style={{marginBottom: responsiveWidth(5)}} />
      </ScrollView>
    )
}