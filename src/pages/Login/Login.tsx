import { login } from 'api/auth';
import InputData from 'components/InputForm/InputForm';
import CustomContainer from 'layout/CustomContainer/CustomContainer';
import { useContext, useState } from 'react';
import { Alert, Button, Container, Form, Stack } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { authContext } from '../../context/auth/authContext';

const initialValues = { email: '', password: '' };
type FormData = typeof initialValues;

export default function Login() {
  const { onToken } = useContext(authContext);

  const navigate = useNavigate();
  const [values, setValues] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState({});
  const { mutate, isLoading, reset, error } = useMutation(login, {
    onSuccess({ token }) {
      onToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    },
  });

  const intl = useIntl();

  const handleChange = (data: Partial<FormData>) => {
    setErrors(
      Object.keys(data).reduce((acc, k) => ({ ...acc, [k]: null }), {
        ...errors,
      }),
    );
    setValues({ ...values, ...data });
    if (error) reset();
  };

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      const errText = 'This field is required';
      setErrors({
        email: !values.email && errText,
        password: !values.password && errText,
      });
      return;
    }
    mutate(values);
  };
  return (
    <CustomContainer>
      <Container className="p-5 mb-4 mt-4 rounded-3 bg-white">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">
            <FormattedMessage id="app.login.title" />
          </h1>
          <InputData
            required
            name="email"
            placeholder={intl.formatMessage({
              id: 'app.login.input.placeholder1',
            })}
            values={values}
            type="text"
            label={intl.formatMessage({ id: 'app.login.input.label1' })}
            errors={errors}
            onChange={handleChange}
          />
          <InputData
            required
            name="password"
            placeholder={intl.formatMessage({
              id: 'app.login.input.placeholder2',
            })}
            values={values}
            type="password"
            errors={errors}
            onChange={handleChange}
            label={intl.formatMessage({ id: 'app.login.input.label2' })}
          />
          {error ? <Alert variant="danger">{error.toString()}</Alert> : null}
          <p className="text-center">
            <FormattedMessage id="app.login.input.text" />{' '}
            <Link to="/register">
              {' '}
              <FormattedMessage id="app.login.input.link" />
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
              <FormattedMessage id="app.login.input.btn" />
            </Button>
          </Stack>
        </Form>
      </Container>
    </CustomContainer>
  );
}
