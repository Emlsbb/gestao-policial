//Importação para criação de rotas
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//Requisição das páginas
import { Login } from '../pages/Login/Login'
import { Cadastro } from '../pages/Cadastro/Cadastro'
import { Procedimentos } from '../pages/Procedimentos/Procedimentos'
import { Tarefas } from '../pages/Tarefas'
import { Solicitacoes } from '../pages/Solicitacoes'
import { Dashboard } from '../pages/Dashboard'

//Requisitando autenticação
import { Authentication } from '../utils/Authentication'

//Função para navegação, somente com usuário autenticado
export function PrivateRoute({ children }) {
    if (!Authentication()) {
        return <Navigate to="/" replace />
    }
    return children;
}

//Criação das rotas bases da aplicação
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/cadastro' exact element={<Cadastro />} />
                <Route
                    path='/procedimentos'
                    exact element={(
                        <PrivateRoute>
                            <Procedimentos />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path='/tarefas'
                    exact element={(
                        <PrivateRoute>
                            <Tarefas />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path='/solicitacoes'
                    exact element={(
                        <PrivateRoute>
                            <Solicitacoes />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path='/dashboard'
                    exact element={(
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    )}
                />
            </Routes>
        </BrowserRouter>
    )
}