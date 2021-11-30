import PetModel from '../models/pet-model'
import BaseService from './base-service'

export default class PetService extends BaseService<PetModel> {
    constructor() {
        super('Pets')
    }

    objectToModel(id: string, obj: any): PetModel {
        const pet = new PetModel(obj);
        pet.id = id
        return pet
    }

    async getPets(): Promise<PetModel[]> {
        return await this.getCollection()
    }

    async getPetById(id: string): Promise<PetModel> {
        return await this.getDocumentById(id)
    }

    async savePet(pet: PetModel) {
        return await this.saveDocument(pet)
    }

    async updatePet(id: string, pet: PetModel) {
        return await this.updateDocument(id, pet)
    }

    async removePet(id: string) {
        return await this.removeDocument(id)
    }
}