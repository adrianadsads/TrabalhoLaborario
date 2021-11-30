import TosadorModel from '../models/tosador-model'
import BaseService from './base-service'

export default class TosadorService extends BaseService<TosadorModel> {
    constructor() {
        super('Tosadores')
    }

    objectToModel(id: string, obj: any): TosadorModel {
        const tosador = new TosadorModel(obj);
        tosador.id = id
        return tosador
    }

    async getTosadores(): Promise<TosadorModel[]> {
        return await this.getCollection()
    }

    async getTosadorById(id: string): Promise<TosadorModel> {
        return await this.getDocumentById(id)
    }

    async saveTosador(tosador: TosadorModel) {
        return await this.saveDocument(tosador)
    }

    async updateTosador(id: string, tosador: TosadorModel) {
        return await this.updateDocument(id, tosador)
    }

    async removeTosador(id: string) {
        return await this.removeDocument(id)
    }
}