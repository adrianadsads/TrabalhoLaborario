import BaseModel from "./base-model"

export default class PasseadorModel extends BaseModel {
    nome: string
    especialidade: string
    dataAtendimento: string // data de admissão//
    contato: string
    jornadaId: string
    email: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            this.especialidade = obj.especialidade
            this.dataAtendimento = obj.dataAtendimento
            this.email = obj.email
            this.contato = obj.contato
            this.jornadaId = obj.clientId
        }
    }
}