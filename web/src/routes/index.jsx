//Importação para criação de rotas
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Requisição das páginas
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import { Procedimentos } from '../pages/Procedimentos'
import { Tarefas } from '../pages/Tarefas'
import { Solicitacoes } from '../pages/Solicitacoes'
import { Dashboard } from '../pages/Dashboard'


//Criação das rotas bases da aplicação
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/cadastro' exact element={<Cadastro />} />
                <Route path='/procedimentos' exact element={<Procedimentos />} />
                <Route path='/tarefas' exact element={<Tarefas />} />
                <Route path='/solicitacoes' exact element={<Solicitacoes />} />
                <Route path='/dashboard' exact element={<Dashboard />} />

            </Routes>
        </BrowserRouter>
    )
}