import ServicoModel from '../models/servico-model'
import BaseService from './base-service'

export default class ServicoService extends BaseService<ServicoModel> {
    constructor() {
        super('Servicos')
    }

    objectToModel(id: string, obj: any): ServicoModel {
        const servico = new ServicoModel(obj);
        servico.id = id
        return servico
    }

    async getServicos(): Promise<ServicoModel[]> {
        return await this.getCollection()
    }

    async getServicoById(id: string): Promise<ServicoModel> {
        return await this.getDocumentById(id)
    }

    async saveServico(servico: ServicoModel) {
        return await this.saveDocument(servico)
    }

    async updateServico(id: string, servico: ServicoModel) {
        return await this.updateDocument(id, servico)
    }

    async removeServico(id: string) {
        return await this.removeDocument(id)
    }

}