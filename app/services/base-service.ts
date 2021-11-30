import firebase from '../../src/firebaseConnection'

export default abstract class BaseService<BaseModel> {

    collectionName: string

    constructor(collectionName: string) {
        this.collectionName = collectionName
    }

    abstract objectToModel(id: string, obj: any): BaseModel

    protected async getCollection(): Promise<BaseModel[]> {
        const collection = await firebase.firestore().collection(this.collectionName).get()
        let models: BaseModel[] = [];
        collection.forEach(documentSnapshot => {
            const doc = this.objectToModel(documentSnapshot.id, documentSnapshot.data())
            models.push(doc)
        })
        return models;
    }

    protected async getDocumentById(id: string): Promise<BaseModel> {
        const doc = await firebase.firestore().collection(this.collectionName).doc(id).get()
        let model: BaseModel = null
        if (doc.exists) {
            model = this.objectToModel(doc.id, doc.data())
        }
        return model
    }

    protected async saveDocument(doc: BaseModel) {
        return await firebase.firestore().collection(this.collectionName).add({...doc})
    }

    protected async updateDocument(id: string, doc: BaseModel) {
        return await firebase.firestore()
            .collection(this.collectionName)
            .doc(id)
            .update({...doc})
    }

    protected async removeDocument(id: string) {
        return await firebase.firestore().collection(this.collectionName).doc(id).delete()
    }

}