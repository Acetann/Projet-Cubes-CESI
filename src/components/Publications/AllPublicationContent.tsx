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

interface AllPublicationProps {
  isHome: Boolean;
}

export const AllPublicationContent: React.FunctionComponent<AllPublicationProps> = ({isHome}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [publications, setPublications]: [IPublicationsData[], (publications: IPublicationsData[]) => void] = useState(defaultPublications);
  const [refreshing, setRefreshing] = useState(true);
  const [myprofil, setMyProfil] = useState("")


  const getMyProfil = async () => {
    axiosInstance.get('/utilisateur/monprofil')
      .then((res) => {
        setMyProfil(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }


  const getAllPublications = () => {
     axiosWithoutToken.get<IPublicationsData[]>('/ressource')
                .then((res) => {
                    setPublications(res.data)
                    setRefreshing(false);
                })
                .catch((err) => {
                    console.log(err)

                });
  }

    useEffect(() => {
        axiosWithoutToken.get<IPublicationsData[]>('/ressource')
                .then((res) => {
                    setPublications(res.data)
                    setRefreshing(false);
                })
                .catch((err) => {
                    console.log(err)

                });
                getMyProfil()
        }, []);
    
    return (
      <>
        <ScrollView 
        style={{
          paddingHorizontal: responsiveWidth(5), 
          paddingBottom: responsiveWidth(10), 
          paddingTop: responsiveWidth(5)
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllPublications} />
          }
          >
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