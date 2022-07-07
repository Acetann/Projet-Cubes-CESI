import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import color from '../../assets/theme/color';
import { ADDPUBLICATION, MYPUBLICATION } from '../../constants/routesName';
import { RouteParams } from '../../navigations/AuthNavigator';
import { PublicationContent } from './PublicationContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ant-design/react-native';
import { axiosInstance } from '../../helpers/axios.interceptor';

   // définition des méthodes /propriétés de MyPublicationContent
interface MyPublicationProps {
  isHome: Boolean;
}

export const MyPublicationContent: React.FunctionComponent<MyPublicationProps> = ({ isHome }) => {

    //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

   //Déclare une variable d'état
   //<boolean>
   //définie sur true car les données sont récupérées lors de l'ouverture de l'app
  const [refreshing, setRefreshing] = useState(true);

  //Déclare une variable d'état
  //de type <string> et vide par défault
  const [myprofil, setMyProfil] = useState("")

  //Fonction qui récupere les datas de l'utilisateur en cours (connécté)
  const getMyProfil = async () => {
    axiosInstance.get('/utilisateur/monprofil')
      .then((res) => {
        setMyProfil(res.data)
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err)
      });
  }

    //Fonction qui appelle la fonction getMyProfil au chargement de la page
    useEffect(() => {
      getMyProfil()
        }, []);
    
    return (
      <>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView
        //Rafraichit la page avec les nouvelles data au scrollDown
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getMyProfil} />
          }
        style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(10), paddingTop: responsiveWidth(5)}}>
          {myprofil?.ressources?.map(((item, index: number) => {
            return (
              <Fragment key={index}>
                <PublicationContent
                  pseudo={myprofil?.pseudo}
                  texte={item.texte}
                  titre={item.titre}
                  image={item.image}
                  date_creation={item.date_creation}
                  nb_reaction={item.nb_reaction}
                  myPublication
                  id={item?._id}
                  imageUser={myprofil?.image}
                  />
              </Fragment>
            )
          })).slice(0, isHome ? 2 : myprofil?.ressources?.length)}
          
          {isHome && (
            <Button
              style={{ marginHorizontal: responsiveWidth(5), borderRadius: 16 }}
              children={myprofil?.ressources?.length === 0 ? 'Ajouter une publication' : 'Voir toutes mes publications'}
              onPress={() => navigation.navigate(MYPUBLICATION)}
            />
          )}
        <View style={{ marginBottom: responsiveWidth(10) }} />
        </ScrollView>
        {!isHome && (
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