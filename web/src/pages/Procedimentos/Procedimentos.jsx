//Requisição de bibliotecas
import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";

//Importação de componentes
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Input";
import Background from "../../components/background";
import SearchBox from "../../components/SearchBox";
import Filter from "../../components/Filter";
import User from "../../components/User";
import backgroundImage from "../../assets/background.jpg";

//Importando funções do service
import {
    createProced,
    getProced,
    updateProced,
    deleteProced
} from "../../services/proced-service";

//Criando auxiliares
export function Procedimentos() {
    const [proceds, setProceds] = useState([]);
    const [filteredProceds, setFilteredProceds] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedProcedure, setSelectedProcedure] = useState({});
    const [procedureName, setProcedureName] = useState("");
    const [procedureDate, setProcedureDate] = useState("");
    const [procedureDescription, setProcedureDescription] = useState("");
    const [filterVisible, setFilterVisible] = useState(false);
    const navigate = useNavigate();
  

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    //Criar procedimento
    async function addProced(data) {
        try {
            await createProced(data);
            setIsCreated(false);
            await findProceds();
            toast.success("Procedimento criado com sucesso");
        } catch (error) {
            toast.error("Falha ao criar procedimento");
            console.error(error);
        }
    }

    //Buscar procedimentos
    async function findProceds() {
        try {
            const result = await getProced();
            setProceds(result.data);
            setFilteredProceds(result.data);
        } catch (error) {
            toast.error("Falha buscar procedimentos");
            console.error(error);
            navigate("/procedimentos");
        }
    }

    //Editar procedimentos
    async function editProced() {
        try {
            const data = {
                procedureId: selectedProcedure.id,
                procedureName: procedureName || selectedProcedure.nomeprocedimento,
                procedureDate: procedureDate || selectedProcedure.data,
                procedureDescription:
                    procedureDescription || selectedProcedure.descricao,
            };
            console.log(data);
            await updateProced(data);
            setIsUpdated(false);
            await findProceds();
            toast.success("Procedimento salvo com sucesso");
        } catch (error) {
            toast.error("Erro ao salvar procedimento");
            console.log(error);
        }
    }

    //Deletar procedimento
    async function removeProced(procedure) {
        try {
            await deleteProced({
                procedureId: procedure.id,
            });
            await findProceds();
            toast.success("Procedimento removido com sucesso");
        } catch (error) {
            toast.error("Falha ao remover procedimento");
            console.error(error);
        }
    }

    //Filtrar por período
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

    //Return da função
    return (
        <>
            <Background imageUrl={backgroundImage} />
            <Sidebar />
            <Container className="proceds_container">
                <h1 className="title">Procedimentos</h1>
                <SearchBox
                    value={searchText}
                    setValue={setSearchText}
                    setFilterVisible={setFilterVisible}
                />
                <Col className="list">
                    {filteredProceds &&
                        filteredProceds.map(
                            (crud) =>
                                (crud.nomeprocedimento
                                    .trim()
                                    .toLowerCase()
                                    .includes(searchText.trim().toLocaleLowerCase()) ||
                                    crud.descricao
                                        .trim()
                                        .toLowerCase()
                                        .includes(searchText.trim().toLowerCase())) && (
                                    <Card key={crud.id} className="mb-3 p-3 bg-light">
                                        <Card.Title>
                                            <strong>Nome do Procedimento: </strong>
                                            {crud.nomeprocedimento}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>data do procedimento: </strong>
                                            {crud.data}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Descrição: </strong>
                                            {crud.descricao}
                                        </Card.Text>
                                        <Row xs="auto" className="d-flex justify-content-end">
                                            <Button
                                                variant="secondary"
                                                type="button"
                                                onClick={() => {
                                                    setSelectedProcedure(crud);
                                                    setIsUpdated(true);
                                                }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                className="ms-3"
                                                onClick={() => {
                                                    removeProced(crud);
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </Row>
                                    </Card>
                                )
                        )}

                    {filteredProceds &&
                        filteredProceds.filter(
                            (crud) =>
                                crud.nomeprocedimento
                                    .trim()
                                    .toLowerCase()
                                    .includes(searchText.trim().toLocaleLowerCase()) ||
                                crud.descricao
                                    .trim()
                                    .toLowerCase()
                                    .includes(searchText.trim().toLowerCase())
                        ).length === 0 && (
                            <p className="text-center text-light">
                                Não existe nenhum procedimento
                            </p>
                        )}
                </Col>
                <Button className="create_button" onClick={() => setIsCreated(true)}>
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
                                label="Descricao do procedimento"
                                placeholder="Digite aqui a descrição do procedimento"
                                required={true}
                                name="procedureDescription"
                                error={errors.description}
                                validations={register("procedureDescription", {
                                    required: {
                                        value: true,
                                        message: "A descrição do procedimento é obrigatória.",
                                    },
                                })}
                            />
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
                        <Modal.Title>
                            Editar procedimento: {selectedProcedure?.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Form
                        noValidate
                        onSubmit={handleSubmit(editProced)}
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
                                defaultValue={selectedProcedure?.nomeprocedimento}
                                onChange={(e) => setProcedureName(e.target.value)}
                                error={errors.nameProced}
                            />
                            <Input
                                className="mb-3"
                                type="date"
                                label="Data do procedimento"
                                placeholder="Preencha a data do procedimento"
                                required={true}
                                name="procedureDate"
                                error={errors.date}
                                defaultValue={selectedProcedure?.data?.split("T")[0]}
                                onChange={(e) => setProcedureDate(e.target.value)}
                            />
                            <Input
                                className="mb-3"
                                type="text"
                                label="Descricao do procedimento"
                                placeholder="Digite aqui a descrição do procedimento"
                                required={true}
                                name="procedureDescription"
                                error={errors.description}
                                defaultValue={selectedProcedure?.descricao}
                                onChange={(e) => setProcedureDescription(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={editProced}>
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
}
