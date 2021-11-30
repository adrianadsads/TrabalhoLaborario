import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import PasseadorModel from "../passeador-model";

export const PasseadorStoreModel = types
  .model("PasseadorStore")
  .props({
    passeador: types.optional(types.string, ""), 
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setPasseadorId: (id: string) => {
      self.passeador = id;
    },
  }))

type PasseadorStoreType = Instance<typeof PasseadorModel>
export interface PasseadorStore extends PasseadorStoreType {}
type PasseadorStoreSnapshotType = SnapshotOut<typeof PasseadorModel>
export interface PasseadorStoreSnapshot extends PasseadorStoreSnapshotType {}
export const createPasseadorStoreDefaultModel = () => new PasseadorModel()
