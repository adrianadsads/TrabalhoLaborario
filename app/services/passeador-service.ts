import PasseadorModel from '../models/passeador-model'
import BaseService from './base-service'

export default class PasseadorService extends BaseService<PasseadorModel> {
    constructor() {
        super('Passeadores')
    }

    objectToModel(id: string, obj: any): PasseadorModel {
        const passeador = new PasseadorModel(obj);
        passeador.id = id
        return passeador
    }

    async getPasseadores(): Promise<PasseadorModel[]> {
        return await this.getCollection()
    }

    async getPasseadorById(id: string): Promise<PasseadorModel> {
        return await this.getDocumentById(id)
    }

    async savePasseador(passeador: PasseadorModel) {
        return await this.saveDocument(passeador)
    }

    async updatePasseador(id: string, passeador: PasseadorModel) {
        return await this.updateDocument(id, passeador)
    }

    async removePasseador(id: string) {
        return await this.removeDocument(id)
    }
}