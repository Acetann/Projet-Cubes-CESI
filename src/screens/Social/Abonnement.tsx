import React from "react";
import ListAbonne from "../../components/Social/Liste/ListAbonne";

interface AbonnementProps{}

export const Abonnement: React.FunctionComponent<AbonnementProps> = () => {

    return (
        <ListAbonne abonne={false} />
    )
}