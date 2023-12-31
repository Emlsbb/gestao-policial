//Requisição de Bibliotecas
import { useState, useEffect } from "react";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//Requisição de compononentes
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Input";
import Background from "../../components/background";
import SearchBox from "../../components/SearchBox";
import Filter from "../../components/Filter";
import User from "../../components/User";
import backgroundImage from "../../assets/backgroundIII.jpg";
import { Container, EditButton, DeleteButton } from "./styles";

//Importando funções do service
import {
  createSolicit,
  getSolicit,
  updateSolicit,
  deleteSolicit,
} from "../../services/solicit-service";


//Auxiliares
const Solicitacoes = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestCop, setRequestCop] = useState("");
  const [selectedRequest, setSelectedRequest] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //Cria solicitação
  async function addRequest(data) {
    try {
      data = {
        ...data,
        requestCop,
      };
      await createSolicit(data);
      setIsCreated(false);
      await findRequests();

      setRequestName("");
      setRequestDate("");
      setRequestCop("");
      toast.success("Solicitação criada com sucesso");
    } catch (error) {
      toast.error("Erro ao criar solicitação");
      console.error(error);
    }
  }

  //Procura solicitação
  async function findRequests() {
    const result = await getSolicit();

    setRequests(result.data);
    setFilteredRequests(result.data);

    const filtered = result.data.filter((r) =>
      r.nomesolicitacao
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase()) ||
      r.policial.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    );

    setFilteredRequests(filtered);
    setCurrentPage(1);
  }

  //Edita solicitação
  async function editRequest() {
    try {
      const data = {
        requestId: selectedRequest.id,
        requestName: requestName || selectedRequest.nomesolicitacao,
        requestDate: requestDate || selectedRequest.data,
        requestDescription: requestDescription || selectedRequest.descricao,
        requestCop: requestCop || selectedRequest.policial,
      };
      await updateSolicit(data);
      setIsUpdated(false);
      await findRequests();

      setSelectedRequest({});
      setRequestName("");
      setRequestDate("");
      setRequestDescription("");
      setRequestCop("");
      toast.success("Solicitação salva com sucesso");
    } catch (error) {
      toast.error("Erro ao editar solicitação");
      console.error(error);
    }
  }

  //Deleta solicitação
  async function removeRequest(s) {
    try {
      const data = {
        requestId: s.id,
      };

      await deleteSolicit(data);
      await findRequests();
      toast.success("Solicitação removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover solicitação");
      console.log(error);
    }
  }

  //Lógica para confirmação do excluir
  const handleDeleteConfirmation = (request) => {
    setSelectedRequest(request);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await removeRequest(selectedRequest);
      setShowDeleteConfirmation(false);
      toast.success("Solicitação removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover solicitação");
      console.error(error);
    }
  };


  //Filtra por período
  function filter(initialDate, finalDate) {
    if (initialDate && finalDate) {
      var items = requests.filter((a) => {
        var date = new Date(a.data);
        return date >= new Date(initialDate) && date <= new Date(finalDate);
      });

      setFilteredRequests(items);
    }
  }

  // Função para calcular o índice inicial e final dos itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // Função para mudar a página atual
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Atualiza a lista
  useEffect(() => {
    findRequests();
  }, []);

  useEffect(() => {
    findRequests();
  }, [searchText]); // Execute findProceds sempre que o texto de pesquisa mudar

  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <Sidebar />
      <Background imageUrl={backgroundImage} />
      <Container>
        <h1 className="title">Solicitações</h1>
        <SearchBox
          value={searchText}
          setValue={setSearchText}
          setFilterVisible={setFilterVisible}
        />
        <table className="mb-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests
              ?.slice(startIndex, endIndex)
              .map((r) =>
                r.nomesolicitacao
                  .trim()
                  .toLowerCase()
                  .includes(searchText.trim().toLocaleLowerCase()) ||
                  r.policial
                    .trim()
                    .toLowerCase()
                    .includes(searchText.trim().toLowerCase()) ||
                  r.policial.trim().toLowerCase().includes(searchText.trim().toLowerCase()) ? (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.nomesolicitacao}</td>
                    <td>{new Date(r.data).toLocaleDateString()}</td>
                    <td>
                      <EditButton
                        onClick={() => {
                          setSelectedRequest(r);
                          setIsUpdated(true);
                        }}
                      >
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteConfirmation(r)}>
                        Deletar
                      </DeleteButton>
                    </td>
                  </tr>
                ) : null
              )}

            {filteredRequests
              ?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center no_requests">
                    Não existe nenhuma solicitação
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <div>
          <Pagination className="justify-content-end mb-2">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
        <Button
          className="create_button"
          onClick={() => {
            setRequestName("");
            setRequestDate("");
            setRequestCop("");
            setRequestDescription("");
            setSelectedRequest({});
            setIsCreated(true);
          }}
        >
          Criar nova solicitação
        </Button>
        <Modal show={isCreated} onHide={() => setIsCreated(false)}>
          <Modal.Header>
            <Modal.Title>Cadastrar nova solicitação</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            onSubmit={handleSubmit(addRequest)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome da solicitação"
                placeholder="Digite um nome para a solicitação"
                required={true}
                name="requestName"
                error={errors.nameProced}
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                validations={register("requestName", {
                  required: {
                    value: true,
                    message: "O nome da solicitação é obrigatório.",
                  },
                })}
              />
              <Input
                className="mb-3"
                type="date"
                label="Data da solicitação"
                placeholder="Preencha a data da solicitação"
                required={true}
                name="requestDate"
                error={errors.date}
                defaultValue={new Date().toString().split("T")[0]}
                onChange={(e) => setRequestDate(e.target.value)}
                validations={register("requestDate", {
                  required: {
                    value: true,
                    message: "A data da solicitação é obrigatória.",
                  },
                })}
              />

              <Input
                className="mb-3"
                type="text"
                label="Descrição da solicitação"
                placeholder="Preencha a descrição da solicitação"
                required={true}
                name="requestDescription"
                error={errors.date}
                defaultValue={selectedRequest.descricao?.split("T")[0]}
                onChange={(e) => setRequestDate(e.target.value)}
                validations={register("requestDescription", {
                  required: {
                    value: true,
                    message: "A descrição da solicitação é obrigatória.",
                  },
                })}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="requestCop"
                aria-label="Selecione o policial"
                value={requestCop}
                onChange={(e) => {
                  setRequestCop(e.target.value);
                }}
              >
                <option disabled>Selecione o policial</option>
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
            <Modal.Title>Editar solicitação: {selectedRequest?.id}</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            onSubmit={handleSubmit(editRequest)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome da solicitação"
                placeholder="Digite um nome para a solicitação"
                required={true}
                name="requestName"
                error={errors.nameProced}
                defaultValue={selectedRequest.nomesolicitacao}
                onChange={(e) => setRequestName(e.target.value)}
              />
              <Input
                className="mb-3"
                type="date"
                label="Data da solicitação"
                placeholder="Preencha a data da solicitação"
                required={true}
                name="requestDate"
                error={errors.date}
                defaultValue={selectedRequest.data?.split("T")[0]}
                onChange={(e) => setRequestDate(e.target.value)}
              />

              <Input
                className="mb-3"
                type="text"
                label="Descrição da solicitação"
                placeholder="Preencha a descrição da solicitação"
                required={true}
                name="requestDescription"
                error={errors.descricao}
                defaultValue={selectedRequest.descricao?.split("T")[0]}
                onChange={(e) => setRequestDescription(e.target.value)}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="requestCop"
                aria-label="Selecione o policial"
                defaultValue={selectedRequest.policial}
                onChange={(e) => {
                  setRequestCop(e.target.value);
                }}
              >
                <option disabled>Selecione o policial</option>
                <option>Marcos Júnior</option>
                <option>Pedro Fonseca</option>
                <option>João Albuquerque</option>
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={editRequest}>
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
        {/* Modal para confirmar delete */}
        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir o procedimento {selectedRequest?.id}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirmar Exclusão
            </Button>
          </Modal.Footer>
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

export default Solicitacoes;
