import { register } from 'api/auth';
import InputData from 'components/InputForm/InputForm';
import CustomContainer from 'layout/CustomContainer/CustomContainer';
import { useContext, useState } from 'react';
import { Alert, Button, Container, Form, Stack } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { authContext } from '../../context/auth/authContext';

const initialValues = { name: '', email: '', password: '', adminrole: false };
type FormData = typeof initialValues;

export default function Register() {
  const { onToken } = useContext(authContext);
  const navigate = useNavigate();
  const [values, setValues] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState({});
  const intl = useIntl();
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
          <h1 className="text-center mb-4">
            <FormattedMessage id="app.register.title" />
          </h1>
          <InputData
            name="name"
            placeholder={intl.formatMessage({
              id: 'app.register.input.placeholder1',
            })}
            values={values}
            type="text"
            label={intl.formatMessage({ id: 'app.register.input.label1' })}
            errors={errors}
            onChange={handleChange}
          />
          <InputData
            name="email"
            placeholder={intl.formatMessage({
              id: 'app.register.input.placeholder2',
            })}
            values={values}
            type="text"
            label={intl.formatMessage({ id: 'app.register.input.label2' })}
            errors={errors}
            onChange={handleChange}
          />
          <InputData
            name="password"
            placeholder={intl.formatMessage({
              id: 'app.register.input.placeholder3',
            })}
            values={values}
            type="password"
            errors={errors}
            onChange={handleChange}
            label={intl.formatMessage({ id: 'app.register.input.label3' })}
          />

          {error ? <Alert variant="danger">{error.toString()}</Alert> : null}
          <p className="text-center">
            <FormattedMessage id="app.register.input.text" />{' '}
            <Link to="/login">
              <FormattedMessage id="app.register.input.link" />
            </Link>
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
              <FormattedMessage id="app.register.input.btn" />
            </Button>
          </Stack>
          <Stack>
            <Form.Check
              className="mt-3 m-auto"
              onChange={(e) => handleChange({ adminrole: e.target.checked })}
              label={intl.formatMessage({ id: 'app.register.isAdmin' })}
            />
          </Stack>
        </Form>
      </Container>
    </CustomContainer>
  );
}
