export default interface IPublicationsData {
    _id?: any | null,
    texte: string,
    titre: string,
    date_creation: Date,
    nb_reaction: Number,
    image: string,
    validation: Boolean,
    pseudo: string,
    utilisateur: {
        _id: string,
        mail:string,
        description: string,
        pseudo: string,
        image:string,
    }
    commentaires: []
}

export const defaultPublications: IPublicationsData[] = [];