import { useState } from "react"
import Input from "./Input"
import Client from "../core/Client"
import Button from "./Button"


 interface FormProps {
    client: Client
    changedClient?: (client:Client)=>void
    canceled?: ()=>void

}
export default function Form1(props: FormProps) {
    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)
    return (
        <div className="a">
            {id ? (
                <Input
                    Onlyready
                    text="Código"
                    value1={id}
                    className="mb-4"
                />
            ) : false}

            <Input
                text="Nome" 
                value1={name}
                ChangeValue={setName}
                className="mb-4"
            />

            <Input
                text="Idade" 
                type1="number" 
                value1={age}
                ChangeValue={setAge}
            />
            <div className="flex justify-end mt-2">
                <Button 
                onClick={()=>props.changedClient?.(new Client(name,+age, id))}
                 color="blue" className="mr-2">
                    {id ? 'Alterar': 'Salvar'}
                </Button>
                <Button onClick={props.canceled}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}