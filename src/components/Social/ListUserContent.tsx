import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { axiosInstance } from '../../helpers/axios.interceptor';
import IUtilisateursData, { defaultUtilisateurs } from '../../Types/User/Utilisateur.type';
import { SocialContent } from './SocialContent';

interface ListUserContentProps {}

export const ListUserContent: React.FunctionComponent<ListUserContentProps> = () => {

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

  return (
    <ScrollView style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(2), paddingTop: responsiveWidth(5)}}>
        {utilisateurs.filter((user,index) => index < 3).map(((item: IUtilisateursData, index: number) => {
          return (
            <Fragment key={index}>
              <SocialContent
                nom={item.nom} 
                prenom={item.prenom} 
                _id={item._id} 
                img={item.Image} 
                compte_actif={item.compte_actif}
                mail={item.pseudo}
                onDelete={() => {}}
                isFriend={item.compte_actif}
            />
            </Fragment>
          )
        }))}
    </ScrollView>
  );
};

export default ListUserContent;