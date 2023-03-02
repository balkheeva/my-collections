import { useCallback } from 'react';
import { Form } from 'react-bootstrap';

type InputProps = {
  type?: string;
  name: string;
  placeholder: string;
  onChange: any;
  values: any;
  label?: string;
  errors: any;
  as?: any;
  required?: boolean;
};

export default function InputForm(props: InputProps) {
  const { type, name, placeholder, onChange, values, label, errors, as } =
    props;
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [name]: e.target.value });
    },
    [name, onChange],
  );

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        isInvalid={Boolean(errors[name])}
        type={type}
        as={as}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[name]}
      />
      {errors[name] && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
