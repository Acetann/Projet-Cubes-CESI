import { axiosInstance } from "../helpers/axios.interceptor";
import IPublicationsData from "../Types/Publications.type";

export class PublicationDataService {

static getAllPublications () {
    return axiosInstance
        .get<Array<IPublicationsData>>('/ressource')
    }

}