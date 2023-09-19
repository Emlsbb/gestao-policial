//Importando backend
import { api } from "./api";

//Criando procedimento 
export async function createProced(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/procedimentos', {
        nomeprocedimento: data.nameProced,
        data: data.date,
        descricao: data.description
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Pegando os procedimentos gestor
export async function getProced() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/procedimentos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Atualizando procedimentos do gestor
export async function updateProced(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/procedimentos/${datages.id}`, {
        nomeprocedimento: data.nameProced,
        data: data.date,
        descricao: data.description
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Deletando procedimentos do gestor
export async function deleteProced(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/procedimentos/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
