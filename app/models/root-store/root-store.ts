import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { VeterinarioStoreModel } from "../veterianario-store/veterinario-store"
import { ClienteStoreModel } from "../cliente-store/cliente-store"
import { PetStoreModel } from "../pet-store/pet-store"
import { ServicoStoreModel } from "../servico-store/servico-store"
import { TosadorStoreModel } from "../tosador-store/tosador-store"
import { PasseadorStoreModel } from "../passeador-store/passeador-store"
import { JornadaStoreModel } from "../jornada-store/jornada-store"



/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  veterinarioStore: types.optional(VeterinarioStoreModel, {} as any),
  clienteStore: types.optional(ClienteStoreModel, {} as any),
  petStore: types.optional(PetStoreModel, {} as any),
  servicoStore: types.optional(ServicoStoreModel, {} as any),
  tosadorStore: types.optional(TosadorStoreModel, {} as any),
  passeadorStore: types.optional(PasseadorStoreModel, {} as any),
  jornadaStore: types.optional(JornadaStoreModel, {} as any),
  
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
