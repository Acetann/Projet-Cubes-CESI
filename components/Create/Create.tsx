import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Field } from 'formik';
import * as Yup from 'yup';
import AppForm from '../Form/AppForm';
import AppFormField from '../Form/AppFormField';
import AppFormSubmitButton from '../Form/AppFormSubmitButton';
import { Cesi } from '../../api';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import { text } from '../../words/words';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';


interface CreateProps { }

export const Create: React.FunctionComponent<CreateProps> = () => {

  const [visiblePassword, setVisiblePassword] = useState(Boolean(true))
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(Boolean(true))
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required(text.lastName.validate).label('Name'),
    prenom: Yup.string().required(text.firstName.validate).label('Name'),
    pseudo: Yup.string().required(text.pseudo.validate).label('Name'),
    mail: Yup.string()
      .email(text.email.validate)
      .required(text.email.required)
      .label(text.email.content),
    mot_de_passe: Yup.string()
      .matches(/\w*[a-z]\w*/, 'Le mot de passe doit avoir une minuscule')
      .matches(/\w*[A-Z]\w*/, 'Le mot de passe doit avoir une majuscule')
      .matches(/\d/, 'Le mot de passe doit avoir un nombre')
      .min(8, ({ min }) => `Le mot de passe doit avoir au minimum ${min} caractères`)
      .required(text.password.required)
      .label(text.password.content),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('mot_de_passe')], 'Les mots de passe ne correspondent pas')
      .required('Veuillez confirmer le mot de passe')
      .label(text.password.confirmPassword),
  });

  return (
    <ScrollView>
      <AppForm
        initialValues={{ nom: '',prenom: '', pseudo: '', mail: '', mot_de_passe: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values: { nom: any; prenom: any; pseudo: any; mail: any; mot_de_passe: any; }) => fetch(`http://${Cesi}:3000/api/utilisateur`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nom: values.nom,
            prenom: values.prenom,
            pseudo: values.pseudo,
            mail: values.mail,
            mot_de_passe: values.mot_de_passe,
          })
        })
          .then(async res => {
            try {
              if (res.status === 200) {
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
          <Field
          component={AppFormField} 
          name="nom" 
          placeholder="Nom" 
          />
          </View>
          <View style={{ width: "50%" }}>
          <Field
            component={AppFormField}
            name="prenom"
            placeholder="Prenom"
          />
          </View>
        </View>
        <Field
          component={AppFormField}
          name="pseudo"
          placeholder="Pseudo"
        />
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
          <TouchableOpacity style={{bottom: responsiveWidth(2), right: responsiveWidth(10)}} activeOpacity={0.5} 
            onPress={() => {
              !visiblePassword && setVisiblePassword(true),
              visiblePassword && setVisiblePassword(false)
            }}
            >
            <Icon name={visiblePassword ? "visibility-off" : "visibility"} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <View>
            <Field
            component={AppFormField}
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            secureTextEntry={visibleConfirmPassword}
            textContentType="password"
          />
          </View>
          <TouchableOpacity style={{bottom: responsiveWidth(2), right: responsiveWidth(10)}} activeOpacity={0.5} 
            onPress={() => {
              !visibleConfirmPassword && setVisibleConfirmPassword(true),
              visibleConfirmPassword && setVisibleConfirmPassword(false)
            }}
            >
            <Icon name={visibleConfirmPassword ? "visibility-off" : "visibility"} />
          </TouchableOpacity>
        </View>
        <AppFormSubmitButton title="Créer un compte" />
      </AppForm>
      <View style={{marginBottom: responsiveWidth(5)}} />
    </ScrollView>
  );
};

export default Create;