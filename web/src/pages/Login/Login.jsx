//Requirindo Bibliotecas
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form } from "react-bootstrap";
import Background from "../../components/background"
import './styles.css'

//Requirindo componentes
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";

//Requirindo Service
import { loginUser } from "../../services/user-services";

export const Login = () => {

    //Auxiliares
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            setResult(user);
            navigate('/procedimentos');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <>
            <Background imageUrl={imageUrl} />
            <Container>
                <Modal
                    show={result}
                    title={result?.title}
                    message={result?.message}
                    handleClose={() => setResult(null)}
                />
                <p></p>
                <h2 className="text-center text-primary"> Login </h2>

                <div className="template d-flex justify-content-center align-items-center vh-80 ">
                    <div className="form_container p-5 rounded bg-white">
                        <Form
                            noValidate
                            validated={!!errors}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Col>
                                <Input
                                    className="mb-2"
                                    label="Nome"
                                    type="text"
                                    placeholder="Insira seu nome"
                                    error={errors.nome}
                                    required={true}
                                    name="nome"
                                    validations={register('nome', {
                                        required: {
                                            value: true,
                                            message: 'O nome é obrigatório'
                                        },
                                    })}
                                />
                                <Input
                                    className="mb-2"
                                    label="E-mail"
                                    type="text"
                                    placeholder="Insira seu e-mail"
                                    error={errors.email}
                                    required={true}
                                    name="email"
                                    validations={register('email', {
                                        required: {
                                            value: true,
                                            message: 'O email é obrigatório'
                                        },
                                        pattern: {
                                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                            message: 'Email inválido!'
                                        }
                                    })}
                                />
                                <Input
                                    className="mb-2"
                                    label="Senha"
                                    type="password"
                                    placeholder="Insira sua senha"
                                    error={errors.senha}
                                    required={true}
                                    name="senha"
                                    validations={register('senha', {
                                        required: {
                                            value: true,
                                            message: 'Senha é obrigatório'
                                        }
                                    })}
                                />
                                <div className="d-grid mt-3">
                                    <Button className="btn btn-primary" type="submit">Entrar</Button>
                                </div>
                                <div className="text-center mt-1">
                                    <Link to="/cadastro">Criar conta</Link>
                                </div>
                            </Col>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}