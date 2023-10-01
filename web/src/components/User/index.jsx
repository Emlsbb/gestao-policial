import { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BiUserCircle } from "react-icons/bi";
import { Input } from "../Input";
import { updateUser } from "../../services/user-services";
import { Container } from "./styles";

// Auxiliares
const User = () => {
  const [user, setUser] = useState({});
  const [nome, setNome] = useState();
  const [senha, setSenha] = useState();
  const [sexo, setSexo] = useState();
  const [dataNasc, setDataNasc] = useState();
  const [endereco, setEndereco] = useState();
  const [email, setEmail] = useState();
  const [organizacao, setOrganizacao] = useState();
  const [visible, setVisible] = useState(false);
  const [orgChangeCount, setOrgChangeCount] = useState(0); // Contador de mudanças de organização
  const { handleSubmit } = useForm();

  // Pega usuário
  function getUser() {
    const data = JSON.parse(sessionStorage.getItem("$gestao_policial$gestor"));
    setUser(data);
  }

  // Edita as informações do usuário
  async function saveUser() {
    try {
      await updateUser({
        id: user.id,
        nome: nome || user.nome,
        senha: senha || user.senha,
        sexo: sexo || user.sexo,
        data_nasc: dataNasc || user.data_nasc,
        endereco: endereco || user.endereco,
        email: email || user.email,
        organizacao: organizacao || user.organizacao,
      });
      getUser();
      setVisible(false);
      toast.success("Usuário salvo com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao salvar usuário");
    }
  }

  // Fecha o modal
  function close() {
    setVisible(false);
  }

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  // Função para lidar com a mudança na organização
  async function handleOrgChange(e) {
    try {
      if (orgChangeCount < 3) {
        setOrganizacao(e.target.value);
        setOrgChangeCount(orgChangeCount + 1);
      }
      toast.error("Você atingiu o limite de mudanças de organização");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao salvar usuário");
    }
  }

  async function saveUser() {
    try {
      await updateUser({
        id: user.id,
        nome: nome || user.nome,
        senha: senha || user.senha,
        sexo: sexo || user.sexo,
        data_nasc: dataNasc || user.data_nasc,
        endereco: endereco || user.endereco,
        email: email || user.email,
        organizacao: organizacao || user.organizacao,
      });
      getUser();
      setVisible(false);
      toast.success("Usuário salvo com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao salvar usuário");
    }
  }

  return (
    <Container>
      <BiUserCircle
        style={{
          width: "100%",
          height: "100%",
          padding: "0.5rem",
        }}
        color="white"
        onClick={() => setVisible(true)}
      />

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header>
          <Modal.Title>Editar usuário</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(saveUser)}>
          <Modal.Body>
            <Col>
              <Input
                className="mb-2"
                label="Nome"
                type="text"
                placeholder="Insira seu nome"
                required={true}
                name="nome"
                defaultValue={user.nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Form.Select
                className="mb-3"
                title="Selecione seu sexo"
                required={true}
                name="sexo"
                aria-label="Selecione seu sexo"
                onChange={(e) => {
                  setSexo(e.target.value);
                }}
              >
                <option>Selecione seu sexo</option>
                <option selected={user.sexo === "Masculino"}>Masculino</option>
                <option selected={user.sexo === "Feminino"}>Feminino</option>
              </Form.Select>
              <Input
                className="mb-2"
                label="Data de nascimento"
                type="date"
                required={true}
                name="data_nasc"
                defaultValue={user?.data_nasc?.split("T")[0]}
                onChange={(e) => setDataNasc(e.target.value)}
              />
              <Input
                className="mb-2"
                label="Endereço"
                type="text"
                placeholder="Insira seu endereço"
                required={true}
                name="endereco"
                defaultValue={user.endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Form.Select
                className="mb-3"
                title="Selecione sua organização"
                required={true}
                name="organizacao"
                aria-label="Selecione sua organização"
                onChange={handleOrgChange}
                value={organizacao}
              >
                <option>Selecione sua organização</option>
                <option selected={user.organizacao === "Policial militar"}>
                  Policial militar
                </option>
                <option selected={user.organizacao === "Policial civil"}>
                  Policial civil
                </option>
                <option selected={user.organizacao === "Politec"}>
                  Politec
                </option>
              </Form.Select>
              <Input
                className="mb-2"
                label="E-mail"
                type="email"
                placeholder="Insira seu e-mail"
                required={true}
                name="email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="mb-2"
                label="Senha"
                type="password"
                placeholder="Insira sua senha"
                required={true}
                name="senha"
                defaultValue={user.senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={saveUser}>
              Salvar
            </Button>
            <Button variant="secondary" type="button" onClick={close}>
              Fechar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default User;
