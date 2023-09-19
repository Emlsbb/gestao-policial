//Importando backend
import { api } from "./api";


//Criando solicitacoes
export async function createSolicit(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/solicitacoes', {
        nomesolicitacao: data.nomesolicitacao,
        data: data.data,
        descricao: data.descricao,
        policial: data.policial
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Pegando as solicitacoes 
export async function getSolicit() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/solicitacoes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Atualizando as solicitacoes 
export async function updateSolicit(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/solicitacoes/${datages.id}`, {
        nomeprocedimento: data.nomeProced,
        data: data.data,
        descricao: data.descricao,
        policial: data.policial
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Deletando as solicitacoes
export async function deleteProced(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/solicitacoes/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



