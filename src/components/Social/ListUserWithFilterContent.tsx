import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView, TextInput, View} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../../config/colors/colors';
import { axiosInstance } from '../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../Types/User/Utilisateur.type';
import { SocialContent } from './SocialContent';

interface ListUserWithFilterContentProps {}

export const ListUserWithFilterContent: React.FunctionComponent<ListUserWithFilterContentProps> = () => {

const [filterData, setFilterData] = useState(defaultUtilisateurs);
const [search, setSearch] = useState('');
const [utilisateurs, setUtilisateurs]: [IUtilisateursData[], (publications: IUtilisateursData[]) => void] = useState(defaultUtilisateurs);

    useEffect(() => {
      axiosInstance.get<IUtilisateursData[]>('/utilisateur')
                .then((res) => {
                  setUtilisateurs(res.data)
                })
                .catch((err) => {
                    console.log(err)

                });
        }, []);


// const onDelete = async (id: number) => {
//     await fetch(`http://${Cesi}:3000/api/utilisateur/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//       .then(async res => {
//         try {
//           if (res.status === 200) {
//             getUsers();
//           }
//         } catch (err) {
//           console.log(err,'erreur');
//         };
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
const searchFilter = (text:string) => {
      if(text){
          const newData = utilisateurs.filter((item) => {
          const itemData = item.prenom ? item.prenom.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
          });
          setFilterData(newData);
          setSearch(text);
      } else {
          setFilterData(utilisateurs);
          setSearch(text);
      }
  }

  return (
    <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5)}}>
        <TextInput
            style={{height:40,borderWidth:1,paddingLeft:20,marginBottom:responsiveWidth(5),borderColor:search.length === 0 ? Colors.red : Colors.blue,backgroundColor: Colors.white}}
            value={search}
            placeholder="Rechercher un utilisateur"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
        />
        {filterData.map(((item: IUtilisateursData, index: number) => {
          return (
            <Fragment key={index}>
              <SocialContent
                nom={item.nom} 
                prenom={item.prenom} 
                _id={item._id} 
                img={item.Image} 
                compte_actif={item.compte_actif}
                mail={item.mail}
                onDelete={() => {}}
            />
            </Fragment>
          )
        }))}
        <View style={{marginBottom: responsiveWidth(5)}} />
    </ScrollView>
  );
};

export default ListUserWithFilterContent;