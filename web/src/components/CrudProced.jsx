//Requisições de bibliotecas
import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

//Requisição de componentes
import { Input } from "./Input";

export function CrudProced(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editCrud(data) {
        await props.editCrud({ ...data, id: props.crud.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome do Procedimento: </strong>{props.crud.nomeprocedimento}</Card.Title>
                <Card.Text><strong>data do procedimento: </strong>{props.crud.data}</Card.Text>
                <Card.Text><strong>Descrição: </strong>{props.crud.descricao}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeProced}
                    >
                        Excluir
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar procedimento: {props.crud.nomeprocedimento}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editCrud)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.crud.nomeprocedimento}
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
                            defaultValue={props.crud.data}
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
                            defaultValue={props.crud.descricao}
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
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
