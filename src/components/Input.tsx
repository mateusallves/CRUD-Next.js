interface InputProps {
    text: string
    type1?: 'text' | 'number'
    value1: any
    className?: string
    Onlyready?: boolean 
    ChangeValue?:(valor: any)=> void
}
export default function Input1(props : InputProps){
    return(
        <div className={`flex flex-col ${props.className}`}>
            <label className="mb-1 mr-1">
                {props.text}
            </label>
            <input 
            type={props.type1 ?? 'text'}
            value={props.value1}
            readOnly={props.Onlyready}
            onChange={e=> props.ChangeValue?.(e.target.value)}
            className={`
            border border-purple-500 rounded-lg
            focus:outline-none bg-gray-100
            ${props.Onlyready ? '' : 'focus:bg-gray-50'}
            `}
            />
        </div>
    )
}