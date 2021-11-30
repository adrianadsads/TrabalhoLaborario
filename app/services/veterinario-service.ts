import VeterinarioModel from '../models/veterinario-model'
import BaseService from './base-service'

export default class VeterinarioService extends BaseService<VeterinarioModel> {
    constructor() {
        super('Veterinarios')
    }

    objectToModel(id: string, obj: any): VeterinarioModel {
        const veterinario = new VeterinarioModel();
        veterinario.id = id
        veterinario.nome = obj.nome
        veterinario.especialidade = obj.especialidade
        veterinario.status = obj.status
        veterinario.dataAtendimento = obj.dataAtendimento
        veterinario.imagem = obj.imagem
        veterinario.petId = obj.petId
        return veterinario
    }

    async getVeterinarios(): Promise<VeterinarioModel[]> {
        return await this.getCollection()
    }

    async getVeterinarioById(id: string): Promise<VeterinarioModel> {
        return await this.getDocumentById(id)
    }

    async saveVeterinario(veterinario: VeterinarioModel) {
        return await this.saveDocument(veterinario)
    }

    async updateVeterinario(id: string, veterinario: VeterinarioModel) {
        return await this.updateDocument(id, veterinario)
    }

    async removeVeterinario(id: string) {
        return await this.removeDocument(id)
    }
}