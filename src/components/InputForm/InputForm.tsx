import {useCallback} from "react";
import { Form } from "react-bootstrap";

export default function InputData(props: any) {
    const {type, name, placeholder, onChange, values, label, errors = {}} = props
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({[name]: e.target.value})
    }, [name, onChange])

    return <Form.Group className="mb-3" controlId={name}>
        <Form.Label>
            {label}
        </Form.Label>
            <Form.Control
                required
                isInvalid={Boolean(errors[name])}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                value={values[name]}
            />
            {errors[name] && <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                {errors[name]}
            </Form.Control.Feedback>}
    </Form.Group>
}
