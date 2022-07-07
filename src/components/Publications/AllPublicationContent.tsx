import { Button } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import color from '../../assets/theme/color';
import { ADDPUBLICATION, MYPUBLICATION } from '../../constants/routesName';
import { axiosInstance, axiosWithoutToken } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import IPublicationsData, { defaultPublications } from '../../Types/Publications.type';
import { PublicationContent } from './PublicationContent';

// définition des méthodes /propriétés de AllPublicationContent
interface AllPublicationProps {
  isHome: Boolean;
}
export const AllPublicationContent: React.FunctionComponent<AllPublicationProps> = ({isHome}) => {

  //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  //Déclare une variable d'état
  //typé selon le modèle de l'interface <IPulicationsData>
  //définie comme Array vide par défault
  const [publications, setPublications]: [IPublicationsData[], (publications: IPublicationsData[]) => void] = useState(defaultPublications);

   //Déclare une variable d'état
   //<boolean>
   //définie sur true car les données sont récupérées lors de l'ouverture de l'app
  const [refreshing, setRefreshing] = useState(true);

  //Déclare une variable d'état
  //de type <string> et vide par défault
  const [myprofil, setMyProfil] = useState("")

  //Fonction qui va récupéré les datas de l'utilisateur connecté
  const getMyProfil = async () => {
    axiosInstance.get('/utilisateur/monprofil')
      .then((res) => {
        setMyProfil(res.data) /* enregistre les données récupérées */
      })
      .catch((err) => {
        console.log(err)
      });
  }

  //Fonction qui va récupéré les datas de toutes les publications de tous les users
  const getAllPublications = () => {
    axiosWithoutToken.get<IPublicationsData[]>('/ressource')
      .then((res) => {
        setPublications(res.data)
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err)

      });
    getMyProfil()
  }

    //Fonction qui va appelé la fonction getAllPublications au chargement de la page
    useEffect(() => {
      getAllPublications()
        }, []);
    

    return (
      <>
        <ScrollView 
        style={{
          paddingHorizontal: responsiveWidth(5), 
          paddingBottom: responsiveWidth(10), 
          paddingTop: responsiveWidth(5)
          }}
          //Rafraichit la page avec les nouvelles data au scrollDown
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllPublications} />
          }
          >
          {/* Mapage du tableau publications pour récuperer chaque donnée contenue dedans individuellement */}
          {publications.filter((itm,index) => Boolean(isHome) ? publications.length : index < 2).map(((item, index) => {
            return (
              <Fragment key={index}>
                <PublicationContent
                  id={item?._id}
                  pseudo={item?.utilisateur?.pseudo}
                  texte={item.texte}
                  titre={item.titre}
                  image={item.image}
                  imageUser={item?.utilisateur?.image}
                  date_creation={item.date_creation}
                  nb_reaction={item.nb_reaction} 
                  utilisateur={item?.utilisateur?._id}
                  _id={myprofil?._id}
                  commentaires={item?.commentaires}
                />
              </Fragment>
            )
          }))}
          <View style={{marginBottom: responsiveWidth(5)}} />
          {!isHome && ( 
            <Button
              style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
              children={'Voir toutes mes publications'}
              onPress={() => navigation.navigate(MYPUBLICATION)}
            />
        )}
        </ScrollView>
        {isHome && ( 
        <TouchableOpacity onPress={() => navigation.navigate(ADDPUBLICATION)} style={styles.floatingActionButton}>
          <Icon name="add" color={color.white} size={21} />
        </TouchableOpacity>
        )}
      </>
    )
}

const styles = StyleSheet.create({
  floatingActionButton: {
    backgroundColor: '#253570',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})