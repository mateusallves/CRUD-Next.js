import Client from "./Client";

export default interface ClientPackage {
    save(client: Client): Promise<Client>
    exclude(client: Client): Promise<void>
    getAll(): Promise<Client[]>
}