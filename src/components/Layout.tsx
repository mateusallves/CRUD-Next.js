import Title from "./Title";


interface LayoutProps {
    titulo: string
    children: any
}
export default function Layout(props : LayoutProps) {
    return (
        <div className={`
        flex flex-col w-2/3 bg-white text-gray-700
        `}>
            <Title>{props.titulo}</Title>
            <div className="p-5">
            {props.children}

            </div>
        </div>
    )
}