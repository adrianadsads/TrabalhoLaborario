import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import JornadaModel from "../jornada-model";

export const JornadaStoreModel = types
  .model("JornadaStore")
  .props({
    jornada: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setJornadaId: (id: string) => {
      self.jornada = id;
    },
  }))

type JornadaStoreType = Instance<typeof JornadaModel>
export interface JornadaStore extends JornadaStoreType {}
type JornadaStoreSnapshotType = SnapshotOut<typeof JornadaModel>
export interface JornadaStoreSnapshot extends JornadaStoreSnapshotType {}
export const createJornadaStoreDefaultModel = () => new JornadaModel()
