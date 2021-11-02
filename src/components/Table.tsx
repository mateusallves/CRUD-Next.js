import Client from "../core/Client";
import { IconEdit, IconTrash } from "./Incons";

interface TableProps {
    clientes: Client[]
    SelectClient?: (client: Client) => void
    DeleteClient?: (client: Client) => void
}

export default function Table(props: TableProps) {

    const ShowAction = props.DeleteClient || props.SelectClient

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {ShowAction ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }


    function renderData() {
        return props.clientes?.map((client, i) => {
            return (
                <tr key={client.id}
                    className={`${i % 2 === 0 ? 'bg-purple-300' : 'bg-purple-200'}`}
                >
                    <td className="text-left p-4">{client.id}</td>
                    <td className="text-left p-4">{client.name}</td>
                    <td className="text-left p-4">{client.age}</td>
                    {renderAction(client)}
                </tr>
            )
        })
    }

    function renderAction(client: Client) {
        return (
            <td className="flex justify-center">
                {props.SelectClient ? (
                <button onClick={()=>props.SelectClient?.(client)} className={`flex justify-center 
                items-center
                text-green-600 rounded-full
                hover:bg-purple-50`}>
                    {IconEdit}
                </button>) : false}

                {props.DeleteClient ? (
                     <button onClick={()=>props.DeleteClient?.(client)} className={`flex justify-center items-center
                     text-red-500 rounded-full p-2 m-1
                     hover:bg-purple-50`}>
                         {IconTrash}
                     </button>
                ) : false}
               
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}