import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import VeterinarioModel from "../veterinario-model";

export const VeterinarioStoreModel = types
  .model("VeterinarioStore")
  .props({
    veterinario: types.optional(types.string, ''), 
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setVeterinarioId: (id: string) => {
      self.veterinario = id;
    },
  }))

type VeterinarioStoreType = Instance<typeof VeterinarioModel>
export interface VeterinarioStore extends VeterinarioStoreType {}
type VeterinarioStoreSnapshotType = SnapshotOut<typeof VeterinarioModel>
export interface VeterinarioStoreSnapshot extends VeterinarioStoreSnapshotType {}
export const createVeterinarioStoreDefaultModel = () => new VeterinarioModel()
