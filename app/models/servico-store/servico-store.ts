import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import ServicoModel from "../servico-model";

export const ServicoStoreModel = types
  .model("ServicoStore")
  .props({
    servico: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setServicoId: (id: string) => {
      self.servico = id;
    },
  }))

type ServicoStoreType = Instance<typeof ServicoModel>
export interface ServicoStore extends ServicoStoreType {}
type ServicoStoreSnapshotType = SnapshotOut<typeof ServicoModel>
export interface ServicoStoreSnapshot extends ServicoStoreSnapshotType {}
export const createServicoStoreDefaultModel = () => new ServicoModel()
