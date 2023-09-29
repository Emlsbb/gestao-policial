/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../Input";

const Filter = ({ visible, setVisible, filterFunction }) => {
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();

  const { handleSubmit } = useForm();

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header>
        <Modal.Title>Filtrar</Modal.Title>
      </Modal.Header>

      <Form
        noValidate
        onSubmit={handleSubmit(() => {
          filterFunction(initialDate, finalDate);
        })}
      >
        <Modal.Body
          style={{
            display: "flex",
          }}
        >
          <Input
            type="date"
            className="mb-3"
            label="Data inicial"
            required={true}
            name="initialDate"
            onChange={(e) =>
              setInitialDate(new Date(e.target.value).toISOString())
            }
            style={{
              width: "13rem",
              marginRight: "3rem",
            }}
          />
          <Input
            type="date"
            className="mb-3"
            label="Data final"
            required={true}
            name="finalDate"
            onChange={(e) =>
              setFinalDate(new Date(e.target.value).toISOString())
            }
            style={{
              width: "13rem",
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              filterFunction(initialDate, finalDate);
              setVisible(false);
            }}
          >
            Filtrar
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setVisible(false);
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Filter;
