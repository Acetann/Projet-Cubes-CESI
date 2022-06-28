import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { TextField } from '../Form/TextField';
import { Button } from '../Form/Button'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, onLogin } from '../../src/redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
  const [mail, setMail] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('')

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const dispatch = useDispatch();


  const { data, error } = useSelector((state: ApplicationState) => state.utilisateur
  );

    useEffect(() => {
    if (data.token !== undefined) { 
      setToken();
      console.log(data)
      
/*     navigation.navigate("Tabs"); */
    }
  }, [data]);

  const setToken = async () => {
    if (!data.token) {
      console.log('pas de token trouvé')
    } else {
      try {
        await AsyncStorage.setItem('token', data.token)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onTapLogin = () => {
    dispatch<any>(onLogin(mail, mot_de_passe))
  };
  
  

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