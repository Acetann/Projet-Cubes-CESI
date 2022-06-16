import React from 'react';
import { Text, View } from 'react-native';
import { Field } from 'formik';
import * as Yup from 'yup';
import AppForm from '../Form/AppForm';
import AppFormField from '../Form/AppFormField';
import AppFormSubmitButton from '../Form/AppFormSubmitButton';
import { Cesi } from '../../api';


interface CreateProps { }

const validationSchema = Yup.object().shape({
  nom: Yup.string().required('Name is required').label('Name'),
  prenom: Yup.string().required('Name is required').label('Name'),
  pseudo: Yup.string().required('Pseudo is required').label('Name'),
  mail: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  mot_de_passe: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('mot_de_passe')], 'Passwords do not match')
    .required('Confirm password is required')
    .label('Confirm Password'),
});

export const Create: React.FunctionComponent<CreateProps> = () => {
  return (
    <>
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

        <Field
          component={AppFormField}
          name="mot_de_passe"
          placeholder="Mot de passe"
          secureTextEntry
          textContentType="password"
        />

        <Field
          component={AppFormField}
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          textContentType="password"
        />
        
        <AppFormSubmitButton title="Créer un compte" />
      </AppForm>
    </>
  );
};

export default Create;