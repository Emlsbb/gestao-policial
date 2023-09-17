import Background from "../components/background"
import { Sidebar } from '../components/Sidebar'

export const Tarefas = () => {
    const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

    return (
        <>
            <Sidebar />
            <Background imageUrl={imageUrl} />
        </>
    )
}