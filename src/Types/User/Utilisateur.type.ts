export default interface IUtilisateursData {
    _id?: any | null,
    nom: string,
    prenom: string,
    date_creation: Date,
    nb_reaction: Number,
    image: string,
    compte_actif: Boolean,
    pseudo: string,
    abonnement: [],
    utilisateur: {
        nom: string,
        pseudo: string,
        prenom: string,
        image: string,
    }
}

export const defaultUtilisateurs: IUtilisateursData[] = [];