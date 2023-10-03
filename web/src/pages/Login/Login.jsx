//Requirindo Bibliotecas
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'

//Requirindo componentes
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { Button, Col, Container, Form } from "react-bootstrap";
import Background from "../../components/background"
import backgroundImage from "../../assets/backgroundII.jpg";
import './styles.css'

//Requirindo Service
import { loginUser } from "../../services/user-services";

export const Login = () => {

    //Auxiliares
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

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
            <Background imageUrl={backgroundImage} />
            <Container>
                <Modal
                    show={result}
                    title={result?.title}
                    message={result?.message}
                    handleClose={() => setResult(null)}
                />
                <div className="template d-flex justify-content-center align-items-center vh-80 mt-5">
                    <div className="form_container p-4 rounded bg-white mt-4">
                        <Form
                            noValidate
                            validated={!!errors}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h2 className="text-center text-primary mb-3">Login</h2>
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
                                            message: 'Senha é obrigatória'
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