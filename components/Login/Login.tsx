import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { TextField } from '../Form/TextField';
import { Button } from '../Form/Button'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, onLogin, UserAction } from '../../src/redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import * as Yup from "yup";
import { text } from '../../words/words';

export const Login = () => {
  const [mail, setMail] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('')
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const dispatch = useDispatch();

  const { utilisateur, error } = useSelector(
    (state: ApplicationState) => state.userReducer 
  );

  const { token, body } = utilisateur;

    useEffect(() => {
    if (token !== undefined) {
      console.log('_id: ' + body._id)
      navigation.navigate("Tabs");
    }
  }, [utilisateur]);

  const onTapLogin = () => {
    dispatch<any>(onLogin(mail, mot_de_passe))
  };
  
  const validationSchema = Yup.object
    ({
      mail: Yup
        .string()
        .email(text.email.validate)
        .required(text.email.required),
      mot_de_passe: Yup
        .string()
        .required(text.password.required),
    });

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <View style={styles.loginView}>
        <TextField 
          placeholder="mail" 
          onChangeText={setMail}
          />
        <TextField 
          placeholder="mot de passe"
          onChangeText={setMot_de_passe} 
          isSecure={true}/>
          <Button title="Login" onTap={onTapLogin} />
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