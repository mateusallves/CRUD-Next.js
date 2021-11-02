import firebase from "../config";
import Client from "../../core/Client";
import ClientPackage from "../../core/ClientsPackage";

export default class ClientColection implements ClientPackage {
    conversor = {
        toFirestore(client: Client) {
            return {
                name: client.name
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot,
            options: firebase.firestore.SnapshotOptions): Client {
            const data = snapshot?.data(options)
            return new Client(data.name, data.age, snapshot?.id)
        }
    }


    async save(client: Client): Promise<Client> {
        if (client?.id) {
            await this.colection().doc(client.id).set(client)
            return client
        } else {
            const docRef = await this.colection().add(client)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async exclude(client: Client): Promise<void> {
        return this.colection().doc(client.id).delete()
    }

    async getAll(): Promise<Client[]> {
       const query = await this.colection().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colection() {
        return firebase.firestore().collection('clients').withConverter(this.conversor)
    }
}