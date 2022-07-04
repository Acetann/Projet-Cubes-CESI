export default interface IPublicationsData {
    _id?: any | null,
    texte: string,
    titre: string,
    date_creation: Date,
    nb_reaction: Number,
    Image: Buffer,
    validation: Boolean,
    pseudo: string,
    utilisateur: {
        _id: string,
        mail:string,
        description: string,
        pseudo: string,
    }
}

export const defaultPublications: IPublicationsData[] = [];