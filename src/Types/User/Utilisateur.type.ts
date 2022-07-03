export default interface IUtilisateursData {
    _id?: any | null,
    nom: string,
    prenom: string,
    date_creation: Date,
    nb_reaction: Number,
    Image: Buffer,
    compte_actif: Boolean,
    mail: string,
    utilisateur: {
        mail:string,
        description: string,
        pseudo: string,
    }
}

export const defaultUtilisateurs: IUtilisateursData[] = [];