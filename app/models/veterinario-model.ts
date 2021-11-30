import BaseModel from "./base-model"

export default class VeterinarioModel extends BaseModel {
    nome: string
    dataAtendimento: string // foi aproveitado o codigo para data de admissão//
    contato: string
    jornadaId: string
    email:string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            
            this.email= obj.email
            this.dataAtendimento = obj.dataAtendimento
            this.contato = obj.contato
            this.jornadaId = obj.jornadaId
        }
    }
}