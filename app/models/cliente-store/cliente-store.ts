import { Instance, SnapshotOut, types } from "mobx-state-tree"
import ClienteModel from "../cliente-model";
import { withEnvironment } from "../extensions/with-environment"

export const ClienteStoreModel = types
  .model("ClienteStore")
  .props({
    cliente: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setClienteId: (id: string) => {
      self.cliente = id;
    },
  }))

type ClienteStoreType = Instance<typeof ClienteModel>
export interface ClienteStore extends ClienteStoreType {}
type ClienteStoreSnapshotType = SnapshotOut<typeof ClienteModel>
export interface ClienteStoreSnapshot extends ClienteStoreSnapshotType {}
export const createClienteStoreDefaultModel = () => new ClienteModel()
