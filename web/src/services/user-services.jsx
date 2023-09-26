//Requisitando Backend
import { api } from './api'

//Registrando usuário 
export async function registerUser(data) {
    const result = await api.post('/gestores', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

//Fazendo login do usuário
export async function loginUser(data) {
    const result = await api.post('/gestores/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    return result
}
