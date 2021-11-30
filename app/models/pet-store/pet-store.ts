import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import PetModel from "../pet-model";

export const PetStoreModel = types
  .model("PetStore")
  .props({
    pet: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setPetId: (id: string) => {
      self.pet = id;
    },
  }))

type PetStoreType = Instance<typeof PetModel>
export interface PetStore extends PetStoreType {}
type PetStoreSnapshotType = SnapshotOut<typeof PetModel>
export interface PetStoreSnapshot extends PetStoreSnapshotType {}
export const createPetStoreDefaultModel = () => new PetModel()
