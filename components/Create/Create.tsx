import React, { useEffect, useState } from 'react';
import {StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, onRegister } from '../../src/redux';
import { TextField } from '../Form/TextField';
import { Button } from '../Form/Button'


export const Create = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [mail, setMail] = useState('');
  const [confirmMdp, setConfirmMdp] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('')

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const dispatch = useDispatch();

  const { data, error } = useSelector(
    (state: ApplicationState) => state.utilisateur
  );



  useEffect(() => {
    if (data.token !== undefined) {
      
  /*  navigation.navigate("Tabs");  */
    }
  }, [data]);

  const onTapRegister = () => {
    dispatch<any>(onRegister(nom, prenom, pseudo, mail, mot_de_passe))
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <View style={styles.loginView}>
          <TextField
            placeholder="nom"
            onChangeText={setNom}
          />
          <TextField
            placeholder="prenom"
            onChangeText={setPrenom}
          />
          <TextField
            placeholder="pseudo"
            onChangeText={setPseudo}
          />
          <TextField
            placeholder="mail"
            onChangeText={setMail}
          />
          <TextField
            placeholder="mot de passe"
            onChangeText={setMot_de_passe}
            isSecure={true} />
          <TextField
            placeholder="confirm mot de passe"
            onChangeText={setConfirmMdp}
            isSecure={true}
          />
          <Button title="Login" onTap={onTapRegister} />
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
  },
  loginView: {
    marginLeft: 20,
    marginRight: 20,
    height: 400,
  },
  footer: {
    flex: 1,
  },
});