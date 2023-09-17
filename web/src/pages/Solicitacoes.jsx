import Background from "../components/background"
import { Sidebar } from '../components/Sidebar'

export const Solicitacoes = () => {
    const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

    return (
        <>
            <Sidebar />
            <Background imageUrl={imageUrl} />
        </>
    )
}