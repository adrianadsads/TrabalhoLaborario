import BaseModel from "./base-model"

export default class TosadorModel extends BaseModel {
    nome: string
    especialidade: string // foi retirado //
    dataAtendimento: string 
    contato: string
    jornadaId: string
    email:string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            this.especialidade = obj.especialidade // foi retirado //
            this.dataAtendimento = obj.dataAtendimento
            this.email = obj.email
            this.contato = obj.contato
            this.jornadaId = obj.clientId
        }
    }
}