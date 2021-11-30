import BaseModel from "./base-model"

export default class JornadaModel extends BaseModel {
    horario: string
    clienteId: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.horario = obj.horario
            this.clienteId = obj.clientId
        }
    }
}