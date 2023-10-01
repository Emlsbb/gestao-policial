//Requisição de Bibliotecas
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//Requisição de compononentes
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Input";
import Background from "../../components/background";
import SearchBox from "../../components/SearchBox";
import Filter from "../../components/Filter";
import User from "../../components/User";
import backgroundImage from "../../assets/background.jpg";
import { Container, EditButton, DeleteButton } from "./styles";

//Importando funções do service
import {
    createProced,
    getProced,
    updateProced,
    deleteProced
} from "../../services/proced-service";


//Auxiliares
const Procedimentos = () => {
  const [proceds, setProceds] = useState([]);
  const [filteredProceds,  setFilteredProceds] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState({});
  const [procedureName, setProcedureName] = useState("");
  const [procedureDate, setProcedureDate] = useState("");
  const [procedureDescription, setProcedureDescription] = useState("");
  const [procedureCop, setProcedureCop] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //Cria procedimento
  async function addProced(data) {
    try {
      data = {
        ...data,
        procedureCop,
      };
      await createProced(data);
      setIsCreated(false);
      await findProceds();

      setProcedureName("");
      setProcedureDate("");
      setProcedureCop("");
      toast.success("Procedimento criado com sucesso");
    } catch (error) {
      toast.error("Erro ao criar procedimento");
      console.error(error);
    }
  }

  //Procura procedimento
  async function findProceds() {
    const result = await getProced();

    setProceds(result.data);
    setFilteredProceds(result.data);
  }

  //Edita procedimento
  async function editProceds() {
    try {
      const data = {
        procedureId: selectedProcedure.id,
        procedureName: procedureName || selectedProcedure.nomeprocedimento,
        procedureDate: procedureDate || selectedProcedure.data,
        procedureDescription: procedureDescription || selectedProcedure.descricao,
        procedureCop: procedureCop || selectedProcedure.policial,
      };
      await updateProced(data);
      setIsUpdated(false);
      await findProceds();

      setSelectedProcedure({});
      setProcedureName("");
      setProcedureDate("");
      setProcedureDescription("");
      setProcedureCop("");
      toast.success("Procedimento salvo com sucesso");
    } catch (error) {
      toast.error("Erro ao editar procedimento");
      console.error(error);
    }
  }

  //Deleta procedimento
  async function removeProced(s) {
    try {
      const data = {
        procedureId: s.id,
      };

      await deleteProced(data);
      await findProceds();
      toast.success("Procedimento removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover procedimento");
      console.log(error);
    }
  }

  //Filtra por período
  function filter(initialDate, finalDate) {
    if (initialDate && finalDate) {
      var items = proceds.filter((a) => {
        var date = new Date(a.data);
        return date >= new Date(initialDate) && date <= new Date(finalDate);
      });

       setFilteredProceds(items);
    }
  }

  //Atualiza a lista
  useEffect(() => {
    findProceds();
  }, []);

  return (
    <>
      <Sidebar />
      <Background imageUrl={backgroundImage} />
      <Container>
        <h1 className="title">Procedimentos</h1>
        <SearchBox
          value={searchText}
          setValue={setSearchText}
          setFilterVisible={setFilterVisible}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProceds &&
              filteredProceds?.map(
                (r) =>
                  (r.nomeprocedimento
                    .trim()
                    .toLowerCase()
                    .includes(searchText.trim().toLocaleLowerCase()) ||
                    r.policial
                      .trim()
                      .toLowerCase()
                      .includes(searchText.trim().toLowerCase())) && (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.nomeprocedimento}</td>
                      <td>{new Date(r.data).toLocaleDateString()}</td>
                      <td>
                        <EditButton
                          onClick={() => {
                            setSelectedProcedure(r);
                            setIsUpdated(true);
                          }}
                        >
                          Editar
                        </EditButton>
                        <DeleteButton
                          onClick={() => {
                            removeProced(r);
                          }}
                        >
                          Deletar
                        </DeleteButton>
                      </td>
                    </tr>
                  )
              )}
            {filteredProceds && filteredProceds.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center no_requests">
                  Não existe nenhum procedimento
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Button
          className="create_button"
          onClick={() => {
            setProcedureName("");
            setProcedureDate("");
            setProcedureCop("");
            setProcedureDescription("");
            setSelectedProcedure({});
            setIsCreated(true);
          }}
        >
          Criar novo procedimento
        </Button>
        <Modal show={isCreated} onHide={() => setIsCreated(false)}>
          <Modal.Header>
            <Modal.Title>Cadastrar novo procedimento</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            onSubmit={handleSubmit(addProced)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome do procedimento"
                placeholder="Digite um nome para o procedimento"
                required={true}
                name="procedureName"
                error={errors.nameProced}
                value={procedureName}
                onChange={(e) => setProcedureName(e.target.value)}
                validations={register("procedureName", {
                  required: {
                    value: true,
                    message: "O nome do procedimento é obrigatório.",
                  },
                })}
              />
              <Input
                className="mb-3"
                type="date"
                label="Data do procedimento"
                placeholder="Preencha a data do procedimento"
                required={true}
                name="procedureDate"
                error={errors.date}
                defaultValue={new Date().toString().split("T")[0]}
                onChange={(e) => setProcedureDate(e.target.value)}
                validations={register("procedureDate", {
                  required: {
                    value: true,
                    message: "A data do procedimento é obrigatória.",
                  },
                })}
              />

              <Input
                className="mb-3"
                type="text"
                label="Descrição do procedimento"
                placeholder="Preencha a descrição do procedimento"
                required={true}
                name="procedureDescription"
                error={errors.date}
                defaultValue={selectedProcedure.descricao?.split("T")[0]}
                onChange={(e) => setProcedureDate(e.target.value)}
                validations={register("procedureDescription", {
                  required: {
                    value: true,
                    message: "A descrição do procedimento é obrigatória.",
                  },
                })}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="procedureCop"
                aria-label="Selecione o policial"
                value={procedureCop}
                onChange={(e) => {
                  setProcedureCop(e.target.value);
                }}
              >
                <option>Selecione o policial</option>
                <option>Marcos Júnior</option>
                <option>Pedro Fonseca</option>
                <option>João Albuquerque</option>
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Criar
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsCreated(false)}
              >
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
          <Modal.Header> 
            <Modal.Title>Editar procedimento: {selectedProcedure?.id}</Modal.Title>
          </Modal.Header>
          {/* se der erro mudar .id para .nomeprocedimento  */}
          <Form
            noValidate
            onSubmit={handleSubmit(editProceds)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome do procedimento"
                placeholder="Digite um nome para o procedimento"
                required={true}
                name="procedureName"
                error={errors.nameProced}
                defaultValue={selectedProcedure.nomeprocedimento}
                onChange={(e) => setProcedureName(e.target.value)}
              />
              <Input
                className="mb-3"
                type="date"
                label="Data da procedimento"
                placeholder="Preencha a data da procedimento"
                required={true}
                name="procedureDate"
                error={errors.date}
                defaultValue={selectedProcedure.data?.split("T")[0]}
                onChange={(e) => setProcedureDate(e.target.value)}
              />

              <Input
                className="mb-3"
                type="text"
                label="Descrição do procedimento"
                placeholder="Preencha a descrição do procedimento"
                required={true}
                name="procedureDescription"
                error={errors.date}
                defaultValue={selectedProcedure.descricao?.split("T")[0]}
                onChange={(e) => setProcedureDate(e.target.value)}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="procedureCop"
                aria-label="Selecione o policial"
                defaultValue={selectedProcedure.policial}
                onChange={(e) => {
                  setProcedureCop(e.target.value);
                }}
              >
                <option>Selecione o policial</option>
                <option>Marcos Júnior</option>
                <option>Pedro Fonseca</option>
                <option>João Albuquerque</option>
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={editProceds}>
                Editar
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsUpdated(false)}
              >
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Filter
          visible={filterVisible}
          setVisible={setFilterVisible}
          filterFunction={filter}
        />
        <User />
      </Container>
    </>
  );
};

export default Procedimentos;
