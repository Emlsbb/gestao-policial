//Requisições de bibliotecas
import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

//Requisição de componentes
import { Input } from "./Input";

export function CrudProced(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    // async function editProced(data) {
    //     try {
    //         await updateProced({
    //             id: data.id,
    //             nameProced: data.nomeprocedimento,
    //             date: data.data,
    //             description: data.description
    //         });
    //         await props.findProceds();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // } só substituir e alterar o botão que chama o editcrud

    async function editCrud(data) {
        console.log(data)
        console.log(props.crud)
        const accessToken = sessionStorage.getItem("token")
        const response = await fetch(('http://localhost:8080/procedimentos/' + props.crud.id), {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `bearer ${JSON.parse(accessToken)}`
            },
            body: JSON.stringify({
                ...data,
                id: props.crud.id
            })
        })


        await props.findProceds();


        const responseJson = await response.json()
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
                            validations={register('nomeprocedimento', {
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
                            validations={register('data', {
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
                            validations={register('descricao', {
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
