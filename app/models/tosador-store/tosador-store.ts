import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import TosadorModel from "../tosador-model";

export const TosadorStoreModel = types
  .model("TosadorStore")
  .props({
    tosador: types.optional(types.string, ""), 
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setTosadorId: (id: string) => {
      self.tosador = id;
    },
  }))

type TosadorStoreType = Instance<typeof TosadorModel>
export interface TosadorStore extends TosadorStoreType {}
type TosadorStoreSnapshotType = SnapshotOut<typeof TosadorModel>
export interface TosadorStoreSnapshot extends TosadorStoreSnapshotType {}
export const createTosadorStoreDefaultModel = () => new TosadorModel()
