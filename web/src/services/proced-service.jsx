//Importando backend
import { api } from "./api";

//Criando procedimento
export async function createProced(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.post(
        "/procedimentos",
        {
            nomeprocedimento: data.procedureName,
            data: data.procedureDate,
            descricao: data.procedureDescription,
            policial: data.procedureCop,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

//Pegando os procedimentos gestor
export async function getProced() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/procedimentos", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

//Atualizando procedimentos do gestor
export async function updateProced(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(

        `/procedimentos/${data.procedureId}`,
        {
            nomeprocedimento: data.procedureName,
            data: data.procedureDate,
            descricao: data.procedureDescription,
            policial: data.procedureCop,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

//Deletando procedimentos do gestor
export async function deleteProced(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.delete(`/procedimentos/${data.procedureId}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}
