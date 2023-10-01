//Requisitando bibliotecas
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

//Requisitando componentes
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
  createTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../../services/task-service";

//Auxiliares
const Tarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskCop, setTaskCop] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(useForm)
  console.log(errors)

  //Cria tarefa
  async function addTask(data) {
    try {
      data = {
        ...data,
        taskCop,
      };
      await createTasks(data);
      setIsCreated(false);
      await findTasks();

      setTaskName("");
      setTaskDate(null);
      setTaskCop("");
    } catch (error) {
      console.error(error);
    }
  }

  //Procura tarefa
  async function findTasks() {
    const result = await getTasks();

    setTasks(result.data);
    setFilteredTasks(result.data);
  }

  //Edita tarefa
  async function editTask() {
    try {
      const data = {
        taskId: selectedTask.id,
        taskName: taskName || selectedTask.nometarefa,
        taskDate: taskDate || selectedTask.prazo,
        taskCop: taskCop || selectedTask.policial,
      };
      await updateTasks(data);
      setIsUpdated(false);
      await findTasks();

      setSelectedTask({});
      setTaskName("");
      setTaskDate(null);
      setTaskCop("");
    } catch (error) {
      console.error(error);
    }
  }

  //Deleta tarefa
  async function removeTask(s) {
    try {
      const data = {
        taskId: s.id,
      };

      await deleteTasks(data);
      await findTasks();
    } catch (error) {
      console.log(error);
    }
  }

  function filter(initialDate, finalDate) {
    if (initialDate && finalDate) {
      var items = tasks.filter((a) => {
        var date = new Date(a.prazo);
        return date >= new Date(initialDate) && date <= new Date(finalDate);
      });

      setFilteredTasks(items);
    }
  }

  //Atualiza a lista de tarefas
  useEffect(() => {
    findTasks();
  }, []);

  return (
    <>
      <Sidebar />
      <Background imageUrl={backgroundImage} />
      <Container>
        <h1 className="title">Tarefas</h1>
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
              <th>Prazo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks &&
              filteredTasks?.map(
                (s) =>
                  (s.nometarefa
                    .trim()
                    .toLowerCase()
                    .includes(searchText.trim().toLocaleLowerCase()) ||
                    s.policial
                      .trim()
                      .toLowerCase()
                      .includes(searchText.trim().toLowerCase())) && (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.nometarefa}</td>
                      <td>{new Date(s.prazo).toLocaleDateString()}</td>
                      <td>
                        <EditButton
                          onClick={() => {
                            setSelectedTask(s);
                            setIsUpdated(true);
                          }}
                        >
                          Editar
                        </EditButton>
                        <DeleteButton
                          onClick={() => {
                            removeTask(s);
                          }}
                        >
                          Deletar
                        </DeleteButton>
                      </td>
                    </tr>
                  )
              )}
            {filteredTasks && filteredTasks.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center no_requests">
                  Não existe nenhuma tarefa
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Button
          className="create_button"
          onClick={() => {
            setTaskName("");
            setTaskDate(null);
            setTaskCop("");
            setSelectedTask({});
            setIsCreated(true);
          }}
        >
          Criar nova tarefa
        </Button>
        <Modal show={isCreated} onHide={() => setIsCreated(false)}>
          <Modal.Header>
            <Modal.Title>Cadastrar nova tarefa</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            onSubmit={handleSubmit(addTask)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome da tarefa"
                placeholder="Digite um nome para a tarefa"
                required={true}
                name="taskName"
                error={errors.nameProced}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                validations={register("taskName", {
                  required: {
                    value: true,
                    message: "O nome da tarefa é obrigatório.",
                  },
                })}
              />
              <Input
                className="mb-3"
                type="date"
                label="Prazo da tarefa"
                placeholder="Preencha o prazo da tarefa"
                required={true}
                name="taskDate"
                error={errors.date}
                defaultValue={new Date().toString().split("T")[0]}
                onChange={(e) => setTaskDate(e.target.value)}
                validations={register("taskDate", {
                  required: {
                    value: true,
                    message: "O prazo da tarefa é obrigatório.",
                  },
                })}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="taskCop"
                aria-label="Selecione o policial"
                value={taskCop}
                onChange={(e) => {
                  setTaskCop(e.target.value);
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
            <Modal.Title>Editar tarefa: {selectedTask?.nometarefa}</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            onSubmit={handleSubmit(editTask)}
            validated={!!errors}
          >
            <Modal.Body>
              <Input
                className="mb-3"
                type="text"
                label="Nome da tarefa"
                placeholder="Digite um nome para a tarefa"
                required={true}
                name="taskName"
                error={errors.nameProced}
                defaultValue={selectedTask.nometarefa}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <Input
                className="mb-3"
                type="date"
                label="Prazo da tarefa"
                placeholder="Preencha o prazo da tarefa"
                required={true}
                name="taskDate"
                error={errors.date}
                defaultValue={selectedTask.prazo?.split("T")[0]}
                onChange={(e) => setTaskDate(e.target.value)}
              />

              <Form.Select
                className="mb-3"
                title="Selecione o policial"
                required={true}
                name="taskCop"
                aria-label="Selecione o policial"
                defaultValue={selectedTask.policial}
                onChange={(e) => {
                  setTaskCop(e.target.value);
                }}
              >
                <option>Selecione o policial</option>
                <option>Marcos Júnior</option>
                <option>Pedro Fonseca</option>
                <option>João Albuquerque</option>
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={editTask}>
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

export default Tarefas;
