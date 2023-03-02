import { register } from 'api/auth';
import InputData from 'components/InputForm/InputForm';
import CustomContainer from 'layout/CustomContainer/CustomContainer';
import { useContext, useState } from 'react';
import { Alert, Button, Container, Form, Stack } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { authContext } from '../../context/auth/authContext';

const initialValues = { name: '', email: '', password: '' };
type FormData = typeof initialValues;

export default function Register() {
  const { onToken } = useContext(authContext);
  const navigate = useNavigate();
  const [values, setValues] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState({});
  const { mutate, isLoading, error, reset } = useMutation(register, {
    onSuccess({ token }) {
      onToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    },
  });

  const handleChange = (data: Partial<FormData>) => {
    setErrors(
      Object.keys(data).reduce((acc, k) => ({ ...acc, [k]: null }), {
        ...errors,
      }),
    );
    setValues({ ...values, ...data });
    if (error) reset();
  };

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.password) {
      const errText = 'This field is required';
      setErrors({
        name: !values.name && errText,
        email: !values.email && errText,
        password: !values.password && errText,
      });
      return;
    }
    mutate(values);
  }

  return (
    <CustomContainer>
      <Container className="p-5 mb-4 mt-4 rounded-3 bg-white">
        <Form>
          <h1 className="text-center mb-4">Create account</h1>
          <InputData
            name="name"
            placeholder="Name"
            values={values}
            type="text"
            label="Name"
            errors={errors}
            onChange={handleChange}
          />
          <InputData
            name="email"
            placeholder="email@example.com"
            values={values}
            type="text"
            label="Email"
            errors={errors}
            onChange={handleChange}
          />
          <InputData
            name="password"
            placeholder="Password"
            values={values}
            type="password"
            errors={errors}
            onChange={handleChange}
            label="Password"
          />
          {error ? <Alert variant="danger">{error.toString()}</Alert> : null}
          <p className="text-center">
            Already have an account? Sign in <Link to="/login">here</Link>
          </p>
          <Stack
            className="col-md-3 mx-auto justify-content-center"
            direction="horizontal"
            gap={{ xs: 5 }}
          >
            <Button
              className="justify-content-md-center"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </Form>
      </Container>
    </CustomContainer>
  );
}
