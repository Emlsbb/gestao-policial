//Requisição de bibliotecas
import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

//Importação de componentes
import { CrudProced } from "../../components/CrudProced";
import { Input } from "../../components/Input";
import Background from "../../components/background";
import { Sidebar } from "../../components/Sidebar";

//Importando funções do service
import { createProced, getProced, updateProced, deleteProced } from "../../services/proced-service";

//Criando auxiliares
export function Procedimentos() {
    const [proceds, setProceds] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

    //Atualiza a lista
    useEffect(() => {
        findProceds();
    }, []);

    //Criar procedimento
    async function addProced(data) {
        try {
            await createProced(data);
            setIsCreated(false);
            await findProceds();
        } catch (error) {
            console.error(error);
        }
    }

    //Buscar procedimentos
    async function findProceds() {
        try {
            const result = await getProced();
            setProceds(result.data);
        } catch (error) {
            console.error(error);
            navigate('/procedimentos');
        }
    }

    //Editar procedimento
    async function editProced(data) {
        try {
            await updateProced({
                id: data.id,
                nameProced: data.nameProced,
                date: data.date,
                description: data.description
            });
            await findProceds();
        } catch (error) {
            console.error(error);
        }
    }

    //Deletar procedimento
    async function removeProced(id) {
        try {
            await deleteProced(id);
            await findProceds();
        } catch (error) {
            console.error(error);
        }
    }

    //Return da função
    return (
        <>
            <Background imageUrl={imageUrl} />
            <Sidebar/>
            <Container fluid>
                <p></p>
                <h1 className="text-center text-dark"> Procedimentos </h1>
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='10'>
                        <Button onClick={() => setIsCreated(true)}>Criar novo procedimento</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-secondary" onClick={() => {
                            sessionStorage.removeItem('token');
                            navigate('/');
                        }}>Sair</Button>
                    </Col>
                </Row>
                <Col className="w-50 m-auto">
                    {proceds && proceds.length > 0
                        ? proceds.map((crud, index) => (
                            <CrudProced
                                key={index}
                                crud={crud}
                                removeProced={async () => await removeProced(crud.id)}
                                editProced={editProced}
                            />
                        ))
                        : <p className="text-center">Não existe nenhum procedimento</p>}
                </Col>
                <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                    <Modal.Header>
                        <Modal.Title>Cadastrar novo procedimento</Modal.Title>
                    </Modal.Header>
                    <Form noValidate onSubmit={handleSubmit(addProced)} validated={!!errors}>
                        <Modal.Body>
                            <Input
                                className="mb-3"
                                type='text'
                                label='Nome do procedimento'
                                placeholder='Digite um nome para o procedimento'
                                required={true}
                                name='nameProced'
                                error={errors.nameProced}
                                validations={register('nameProced', {
                                    required: {
                                        value: true,
                                        message: 'O nome do procedimento é obrigatório.'
                                    }
                                })}
                            />
                            <Input
                                className="mb-3"
                                type='date'
                                label='Data do procedimento'
                                placeholder='Preencha a data do procedimento'
                                required={true}
                                name='date'
                                error={errors.date}
                                validations={register('date', {
                                    required: {
                                        value: true,
                                        message: 'A data do procedimento é obrigatória.'
                                    }
                                })}
                            />
                            <Input
                                className="mb-3"
                                type='text'
                                label='Descricao do procedimento'
                                placeholder='Digite aqui a descrição do procedimento'
                                required={true}
                                name='description'
                                error={errors.description}
                                validations={register('description', {
                                    required: {
                                        value: true,
                                        message: 'A descrição do procedimento é obrigatória.'
                                    }
                                })}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Criar
                            </Button>
                            <Button variant="secondary" onClick={() => setIsCreated(false)}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </>
    );
}
