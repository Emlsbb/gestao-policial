import { FloatingLabel, Form } from "react-bootstrap";

export function Input(props) {
    return (
        <div className="">
        <Form.Group className={props.className}>
            <FloatingLabel label={props.label}>
                <Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    isInvalid={props.error}
                    required={props.required}
                    id={props.name} // trocar para id se necessário #####
                    name={props.name}
                    defaultValue={props.defaultValue}
                    {...props.validations}
                />
                {props.error && (
                    <Form.Control.Feedback type="invalid">
                        {props.error.message}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>
        </Form.Group>
        </div>
    );
}
