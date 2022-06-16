import React, { useState } from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Input } from "../../utils/Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Icon } from 'react-native-elements';
import { buttonStyle } from '../Button/ButtonStyle';
import { Button } from '@ant-design/react-native';
import { Cesi, Maison, Alex} from '../../api';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AppForm from '../Form/AppForm';
import { Field } from 'formik';
import AppFormField from '../Form/AppFormField';
import AppFormSubmitButton from '../Form/AppFormSubmitButton';


interface LoginProps {}

const validationSchema = Yup.object
  ({
    mail: Yup.string().email(text.email.validate).required(text.email.required),
    mot_de_passe: Yup.string().required(text.password.required),
  });


export const Login: React.FunctionComponent<LoginProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  return (
    <>
      <AppForm
        initialValues={{ mail: '', mot_de_passe: '' }}
        validationSchema={validationSchema}
        onSubmit={(values: {mail: any; mot_de_passe: any; }) => fetch(`http://${Cesi}:3000/api/connexion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mail: values.mail,
            mot_de_passe: values.mot_de_passe
          })
        })
          .then(async res => {
            try {
              if (res.status === 200) {
                console.log(values)
                navigation.navigate("Tabs")
              }
            } catch (err) {
              console.log(err, 'erreur');
            };
          })
          .catch(err => {
            console.log(err);
        })
    }>
        <Field
          component={AppFormField}
          name="mail"
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <Field
          component={AppFormField}
          name="mot_de_passe"
          placeholder="Mot de passe"
          secureTextEntry
          textContentType="password"
        />
        <AppFormSubmitButton title="Se connecter" />
      </AppForm>
    </>
  )
}