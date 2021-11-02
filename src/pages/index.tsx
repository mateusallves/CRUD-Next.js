import Layout from "../components/Layout"
import Table from "../components/Table"
import Client from "../core/Client"
import Button from "../components/Button"
import Form from "../components/Form_1"
import { useEffect, useState } from "react"
import ClientPackage from "../core/ClientsPackage"
import ClientColection from "../Firebase/Db/ClientColection"


export default function Home() {
 
  const rep: ClientPackage = new ClientColection

  const [ client, setClient] = useState<Client>(Client.empty())
 
  const [ clients, setClients] = useState<Client[]>([])
  
  const [visible, setVisible] = useState<'table' | 'form'>('table')
 
  useEffect(getiAll, [])

  function getiAll(){
    rep.getAll().then(clients=>{
      setClients(clients)
      setVisible('table')
    })
  }

  function SelectClient(client: Client) {
    setClient(client)
    setVisible('form')
  }
  async function DeleteClient(client: Client) {
    await rep.exclude(client)
    getiAll()
  }
  function newClient() {
    setClient(Client.empty())
    setVisible('form')
  }

  async function saveNewClient(client:Client){
   await rep.save(client)
    getiAll()
  }

  

  return (
    <div className={`flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-400
    text-white rounded-md`}>

      <Layout titulo="Cadastro Simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">

              <Button
              color ='green'className="mb-4"
              onClick={newClient}
               >
                Novo Usuário
              </Button>

            </div>

            <Table clientes={clients}
              SelectClient={SelectClient}
              DeleteClient={DeleteClient} />
          </>
        ) : (
          <Form 
          client={client}
          changedClient={saveNewClient}
          canceled={()=>setVisible('table')}
          />
        )}
      </Layout>
    </div>
  )
}
