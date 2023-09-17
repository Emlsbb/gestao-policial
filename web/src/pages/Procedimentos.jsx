import { Sidebar } from '../components/Sidebar'
import Background from '../components/background'
import React from 'react'


export const Procedimentos = () => {
    const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

    return (
        <>
            <Sidebar />
            <Background imageUrl={imageUrl} />
        </>
    )

}