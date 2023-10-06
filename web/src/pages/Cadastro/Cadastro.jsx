//Requirindo Bibliotecas
import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import Background from "../../components/background"
import backgroundImage from "../../assets/backgroundII.jpg";
import './styles.css'

//Requirindo service para cadastro
import { registerUser } from "../../services/user-services"

export const Cadastro = () => {

  //Criando auxiliares
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [sexo, setSexo] = useState("");
  const [org, setOrg] = useState("");

  //Redirecionamento no cadastro
  const onSubmit = async (data) => {
    try {
      const user = await registerUser({
        ...data,
        sexo,
        organizacao: org,
      });
      

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
      <Background imageUrl={backgroundImage} />
      <Container>
        <Modal
          show={result}
          title={result?.title}
          message={result?.message}
          handleClose={() => setResult(null)}
        />
        <div className="template d-flex justify-content-center align-items-center 100-w vh-80">
          <div className="form_container p-4 rounded bg-white mt-3">
            <Form
              noValidate
              validated={!!errors}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-center text-primary mb-3"> Cadastro </h2>
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
                 <Form.Select
                  className="mb-2"
                  title="Selecione seu sexo"
                  required={true}
                  error={errors.sexo}
                  name="sexo"
                  aria-label="Selecione seu sexo"
                  onChange={(e) => {
                    setSexo(e.target.value);
                  }}
                >
                  <option selected disabled>Selecione seu sexo</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </Form.Select>
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
                    pattern: {
                      value: /^([\p{L}0-9\s]+), (\d+)(?:, (.*?)), ([\p{L}0-9\s]+), ([\p{L}\s]+), (\d{5}-\d{3})$/u,
                      message: "Siga este padrão: Rua João Nascimento, 10, quadra 08, Parque Cuiabá, Cuiabá, 12345-678"
                    }
                  })}
                />
             <Form.Select
                  className="mb-2"
                  title="Selecione sua organização"
                  required={true}
                  error={errors.organizacao}
                  name="organizacao"
                  aria-label="Selecione sua organização"
                  onChange={(e) => {
                    setOrg(e.target.value);
                  }}
                >
                  <option selected disabled>Selecione sua organização</option>
                  <option>Policia-Militar</option>
                  <option>Policia-Civil</option>
                  <option>Politec</option>
                </Form.Select>
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
                  <Button className="btn btn-primary" type="submit">Criar</Button>
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