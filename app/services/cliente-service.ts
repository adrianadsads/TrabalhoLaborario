import ClienteModel from '../models/cliente-model'
import BaseService from './base-service'

export default class ClienteService extends BaseService<ClienteModel> {
    constructor() {
        super('Clientes')
    }

    objectToModel(id: string, obj: any): ClienteModel {
        const cliente = new ClienteModel(obj);
        cliente.id = id
        return cliente
    }

    async getClientes(): Promise<ClienteModel[]> {
        return await this.getCollection()
    }

    async getClienteById(id: string): Promise<ClienteModel> {
        return await this.getDocumentById(id)
    }

    async saveCliente(cliente: ClienteModel) {
        return await this.saveDocument(cliente)
    }

    async updateCliente(id: string, cliente: ClienteModel) {
        return await this.updateDocument(id, cliente)
    }

    async removeCliente(id: string) {
        return await this.removeDocument(id)
    }
}