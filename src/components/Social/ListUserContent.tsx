import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosInstance } from '../../helpers/axios.interceptor';

interface ListUserContentProps {}

export const ListUserContent: React.FunctionComponent<ListUserContentProps> = () => {

const [abonnes, setAbonnes] = useState();

    useEffect(() => {
      axiosInstance.get('/utilisateur/abonne')
                .then((res) => {
                  setAbonnes(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        }, []);


  return (
    <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(2), paddingTop: responsiveWidth(5)}}>
     {/*    {abonnes.map(((item, index: number) => {
          return (
            <Fragment key={index}>
              <SocialContent
                nom={item.nom} 
                prenom={item.prenom} 
                _id={item._id} 
                img={item.Image} 
                mail={item.pseudo}
                onDelete={() => {}}
                isFriend={item.compte_actif}
            />
            </Fragment>
          )
        }))} */}
    </ScrollView>
  );
};

export default ListUserContent;