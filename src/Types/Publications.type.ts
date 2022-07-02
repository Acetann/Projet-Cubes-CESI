export default interface IPublicationsData {
    _id?: any | null,
    texte: string,
    titre: string,
    data_creation: Date,
    nb_reaction: Number,
    Image: Buffer,
    validation: Boolean,
}

export const defaultPublications: IPublicationsData[] = [];