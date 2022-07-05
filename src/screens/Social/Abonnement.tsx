import React from "react";
import { ListAbonnement } from "../../components/Social/Liste/ListeAbonnement";


interface AbonnementProps{}

export const Abonnement: React.FunctionComponent<AbonnementProps> = () => {

    return (
        <ListAbonnement abonne />
    )
}