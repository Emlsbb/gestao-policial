//Requirindo Bibliotecas
import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import Background from "../../components/background"
import './styles.css'

//Requirindo service para cadastro
import { registerUser } from "../../services/user-services"

export const Cadastro = () => {
  //Criando auxiliares
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const imageUrl = 'https://www.saojosedoxingu.mt.gov.br/fotos_bancoimagens/1910.jpg'

  //Redirecionamento no cadastro
  const onSubmit = async (data) => {
    try {
      const user = await registerUser(data);
      setResult(user);
      navigate('/procedimentos');
    } catch (error) {
      setResult({
        title: 'Houve um erro no cadastro!',
        message: error.response.data.error
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
        <div className="template d-flex justify-content-center align-items-center 100-w vh-80">
          <div className="form_container p-5 rounded bg-white">
            <Form
              noValidate
              validated={!!errors}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-center"> Cadastro </h3>
              <Col>
                <Input
                  className="mb-2"
                  label="nome"
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
                  label="sexo"
                  type="text"
                  placeholder="Insira seu sexo"
                  error={errors.sexo}
                  required={true}
                  name="sexo"
                  validations={register('sexo', {
                    required: {
                      value: true,
                      message: 'O sexo é obrigatório'
                    },
                  })}
                />
                <Input
                  className="mb-2"
                  label="data de nascimento"
                  type="date"
                  error={errors.data_nasc}
                  required={true}
                  name="data_nasc"
                  validations={register('data_nasc', {
                    required: {
                      value: true,
                      message: 'Sua data de nascimento é obrigatória'
                    },
                  })}
                />
                <Input
                  className="mb-2"
                  label="endereco"
                  type="text"
                  placeholder="Insira seu endereço"
                  error={errors.endereco}
                  required={true}
                  name="endereco"
                  validations={register('endereco', {
                    required: {
                      value: true,
                      message: 'Seu endereço é obrigatório'
                    },
                  })}
                />
                <Input
                  className="mb-2"
                  label="Organização"
                  type="text"
                  placeholder="Insira sua organização"
                  error={errors.organizacao}
                  required={true}
                  name="organizacao"
                  validations={register('organizacao', {
                    required: {
                      value: true,
                      message: 'Sua organizacao é obrigatória'
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
                      message: 'E-mail é obrigatório'
                    },
                    pattern: {
                      value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                      message: 'E-mail inválido!'
                    }
                  })}
                />
                <Input
                  className="mb-2"
                  label="Senha"
                  type="password"
                  placeholder="Insira sua senha"
                  error={errors.password}
                  required={true}
                  name="senha"
                  validations={register('senha', {
                    required: {
                      value: true,
                      message: 'A senha é obrigatória'
                    }
                  })}
                />
                <div className="d-grid mt-3">
                  <Button className="btn btn-primary"type="submit">Criar</Button>
                </div>
                <div className="text-center mt-1">
                  <Link to="/">Já tenho uma conta</Link>
                </div>
              </Col>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}