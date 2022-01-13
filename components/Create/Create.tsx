import React from 'react';
import {ScrollView, Text, View } from 'react-native';
import { titleStyle } from '../../styles/styles';
import { Button } from '../Button/Button';
import { Input } from "./Input";


interface CreateProps {}

export const Create: React.FunctionComponent<CreateProps> = () => {
    const signup = () => {
        console.log("Create account here...");
      };
  
      const [firstName, setFirstName] = React.useState("");
    return (
        <ScrollView >
        <Text >
          Création de compte
        </Text>
        <Input
          label="Préom"
          value={firstName}
          placeholder="Marie"
          onChangeText={setFirstName}
        />
        <Input
          label="Nom"
          value={firstName}
          placeholder="Berry"
          onChangeText={setFirstName}
        />
        <Input
          label="Email"
          value={firstName}
          placeholder="marie.berry@mail.com"
          onChangeText={setFirstName}
          type="email-address"
        />
        <Input
          label="Mot de passe"
          value={firstName}
          onChangeText={setFirstName}
          password
        />
        <Input
          label="Confirmation de mot de passe"
          value={firstName}
          onChangeText={setFirstName}
          password
        />
        <Button onPress={signup}>Créer mon compte</Button>
      </ScrollView>
    )
}