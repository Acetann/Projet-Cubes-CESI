import { useAsyncStorage } from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import color from '../../assets/theme/color';
import { ADDPUBLICATION, MYPUBLICATION } from '../../constants/routesName';
import { axiosWithoutToken } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import IPublicationsData, { defaultPublications } from '../../Types/Publications.type';
import { PublicationContent } from './PublicationContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ant-design/react-native';

interface MyPublicationProps {
  isHome: Boolean;
}

export const MyPublicationContent: React.FunctionComponent<MyPublicationProps> = ({ isHome }) => {
  const [currentUserDecoded, setCurrentUserDecoded] = useState()
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();


  const getCurrentUser = async () => {
    try {
      const data = await AsyncStorage.getItem('currentUser')
      const currentUserDecoded = JSON.parse(data!)
      console.log(currentUserDecoded)
      if (currentUserDecoded !== null) {
        setCurrentUserDecoded(currentUserDecoded)
        console.log(currentUserDecoded)
      }
    } catch (e) {
      console.log(e)
    }
  }
    useEffect(() => {
       getCurrentUser()
        }, []);
    
    return (
      <>
        <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(10), paddingTop: responsiveWidth(5)}}>
          {currentUserDecoded?.ressources.map(((item, index) => {
            return (
              <Fragment key={index}>
                <PublicationContent
                  pseudo={item?.utilisateur?.pseudo} 
                  texte={item.texte} 
                  titre={item.titre} 
                  img={item.Image} 
                  date_creation={item.date_creation}
                  nb_reaction={item.nb_reaction}
                  myPublication
                />
              </Fragment>
            )
          })).slice(0, isHome?2: currentUserDecoded?.ressources.length)}
          
          {isHome && (
            <Button
              style={{ marginHorizontal: responsiveWidth(5), borderRadius: 16 }}
              children={'Voir toutes mes publications'}
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