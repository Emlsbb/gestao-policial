//Requisitando Backend
import { api } from "./api";

//Registrando usuário
export async function registerUser(data) {
    try {
        const result = await api.post("/gestores", data);
        sessionStorage.setItem("$gestao_policial$gestor", JSON.stringify(result.data.gestor));
        sessionStorage.setItem("token", JSON.stringify(result.data.accessToken));
      
    } catch (error) {
      throw error;
    }
  }

//Fazendo login do usuário
export async function loginUser(data) {
    const result = await api.post("/gestores/login", data);
    sessionStorage.setItem("token", JSON.stringify(result.data.accessToken));
    sessionStorage.setItem(
        "$gestao_policial$gestor",
        JSON.stringify(result.data.gestor)
    );
    return result;
}

export async function updateUser(data) {
    const result = await api.put("/gestores/update", data);
    sessionStorage.setItem(
        "$gestao_policial$gestor",
        JSON.stringify(result.data.gestor)
    );
    return result;
}
