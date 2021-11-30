import JornadaModel from '../models/jornada-model'
import BaseService from './base-service'

export default class JornadaService extends BaseService<JornadaModel> {
    constructor() {
        super('jornadas')
    }

    objectToModel(id: string, obj: any): JornadaModel {
        const jornada = new JornadaModel(obj);
        jornada.id = id
        return jornada
    }

    async getJornadas(): Promise<JornadaModel[]> {
        return await this.getCollection()
    }

    async getJornadaById(id: string): Promise<JornadaModel> {
        return await this.getDocumentById(id)
    }

    async saveJornada(jornada: JornadaModel) {
        return await this.saveDocument(jornada)
    }

    async updateJornada(id: string, jornada: JornadaModel) {
        return await this.updateDocument(id, jornada)
    }

    async removeJornada(id: string) {
        return await this.removeDocument(id)
    }
}