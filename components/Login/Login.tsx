import React, { useState } from 'react';
import * as Yup from "yup";
import {TouchableOpacity, View } from 'react-native';

import { text } from "../../words/words";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Icon } from 'react-native-elements';
import { Cesi, Maison, Alex} from '../../api';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AppForm from '../Form/AppForm';
import { Field } from 'formik';
import AppFormField from '../Form/AppFormField';
import AppFormSubmitButton from '../Form/AppFormSubmitButton';

interface LoginProps {}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [visiblePassword, setVisiblePassword] = useState(Boolean(true))

  const validationSchema = Yup.object
  ({
    mail: Yup.string().email(text.email.validate).required(text.email.required),
    mot_de_passe: Yup.string().required(text.password.required),
  });

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
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <View>
            <Field
              component={AppFormField}
              name="mot_de_passe"
              placeholder="Mot de passe"
              secureTextEntry={visiblePassword}
              textContentType="password"
            />
          </View>
          <TouchableOpacity style={{marginBottom: responsiveWidth(6), right: responsiveWidth(10)}} activeOpacity={0.5} 
            onPress={() => {
              !visiblePassword && setVisiblePassword(true),
              visiblePassword && setVisiblePassword(false)
            }}
            >
            <Icon name={visiblePassword ? "visibility-off" : "visibility"} />
          </TouchableOpacity>
        </View>
        <AppFormSubmitButton title="Se connecter" />
      </AppForm>
    </>
  )
}