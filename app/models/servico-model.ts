import BaseModel from "./base-model"

export default class ServicoModel extends BaseModel {
    nome: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
        }
    }
}