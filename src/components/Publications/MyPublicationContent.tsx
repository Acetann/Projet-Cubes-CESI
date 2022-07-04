import { Button } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import color from '../../assets/theme/color';
import { ADDPUBLICATION } from '../../constants/routesName';
import { axiosWithoutToken } from '../../helpers/axios.interceptor';
import { RouteParams } from '../../navigations/AuthNavigator';
import IPublicationsData, { defaultPublications } from '../../Types/Publications.type';
import { PublicationContent } from './PublicationContent';

interface MyPublicationProps {}

export const MyPublicationContent: React.FunctionComponent<MyPublicationProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
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
      <>
        <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(10), paddingTop: responsiveWidth(5)}}>
          {publications.map(((item, index) => {
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
          }))}
          <View style={{marginBottom: responsiveWidth(5)}} />
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate(ADDPUBLICATION)} style={styles.floatingActionButton}>
          <Icon name="add" color={color.white} size={21} />
        </TouchableOpacity>
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