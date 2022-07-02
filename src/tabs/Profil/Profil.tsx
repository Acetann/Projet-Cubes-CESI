import React from "react";
import { Text, View } from "react-native";

interface ProfileProps{
  nom: string;
  prenom: string;
  id: number;
  mail: string;
  compte_actif: Boolean;
  image: string;
  pseudo: string;
}

export const Profil: React.FunctionComponent<ProfileProps> = () => {

    return (
        <View>
            <Text>{'Profil'}</Text>
        </View>
    )
}