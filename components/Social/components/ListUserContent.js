import React, {useEffect, useState} from 'react';
import {FlatList, TextInput, View} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Cesi } from '../../../src/services';
import { Colors } from '../../../config/colors/colors';
import { SocialContent } from '../../../src/components/Social/SocialContent';

const ListUserContent = () => {

const [filterData, setFilterData] = useState([]);
const [usersData, setUsersData] = useState([]);
const [search, setSearch] = useState('');

const getUsers = () => {
    fetch(`http://${Cesi}:3000/api/utilisateur`)
    .then((response) => response.json())
    .then((responseJson) => {
        setFilterData(responseJson);
        setUsersData(responseJson);
    }).catch((error) => {
        console.error(error);
    })
  };

const onDelete = async (id) => {
    await fetch(`http://${Cesi}:3000/api/utilisateur/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async res => {
        try {
          if (res.status === 200) {
            getUsers();
          }
        } catch (err) {
          console.log(err,'erreur');
        };
      })
      .catch(err => {
        console.log(err);
      });
  };
const searchFilter = (text) => {
      if(text){
          const newData = usersData.filter((item) => {
          const itemData = item.prenom ? item.prenom.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
          });
          setFilterData(newData);
          setSearch(text);
      } else {
          setFilterData(usersData);
          setSearch(text);
      }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={{paddingHorizontal: responsiveWidth(5), paddingBottom: responsiveWidth(20), paddingTop: responsiveWidth(5)}}>
        <TextInput
            style={{height:40,borderWidth:1,paddingLeft:20,marginBottom:responsiveWidth(5),borderColor:search.length === 0 ? Colors.red : Colors.blue,backgroundColor: Colors.white}}
            value={search}
            placeholder="Rechercher un utilisateur"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
        />
        <FlatList showsVerticalScrollIndicator={false} keyExtractor={(item, index) => index.toString()} data={filterData} renderItem={({item}) => (
            <SocialContent
                nom={item.nom} 
                prenom={item.prenom} 
                _id={item._id} 
                img={item.image} 
                compte_actif={item.compte_actif}
                mail={item.mail}
                onDelete={onDelete}
            />
        )} 
        />
  </View>
  );
};

export default ListUserContent;