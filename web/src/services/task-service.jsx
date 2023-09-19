//Importando backend
import { api } from "./api";


//Criando tarefas
export async function createTasks(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/tarefas', {
        nometarefa: data.nometarefa,
        prazo: data.prazo,
        policial: data.policial
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Pegando os tarefas 
export async function getTasks() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/tarefas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Atualizando tarefas 
export async function updateTasks(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/tarefas/${datages.id}`, {
        nometarefa: data.nometarefa,
        prazo: data.prazo,
        policial: data.policial
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

//Deletando tarefas 
export async function deleteTasks(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/tarefas/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



