//Importando backend
import { api } from "./api";

//Criando solicitacoes
export async function createSolicit(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.post(
        "/solicitacoes",
        {
            nomesolicitacao: data.requestName,
            data: data.requestDate,
            descricao: data.requestDescription,
            policial: data.requestCop,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

//Pegando as solicitacoes
export async function getSolicit() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/solicitacoes", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

//Atualizando as solicitacoes
export async function updateSolicit(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(
        `/solicitacoes/${data.requestId}`,
        {
            nomesolicitacao: data.requestName,
            data: data.requestDate,
            descricao: data.requestDescription,
            policial: data.requestCop,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

//Deletando as solicitacoes
export async function deleteSolicit(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.delete(`/solicitacoes/${data.requestId}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}
