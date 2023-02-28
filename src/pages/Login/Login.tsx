import CustomContainer from "../CustomContainer/CustomContainer";
import {Container, Form} from "react-bootstrap";
import InputData from "./InputData";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {post} from "../helpers/http";

const initialValues = {email: '', password: ''}

export default function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialValues);
    const [err, setErr] = useState('');
    const [errors, setErrors] = useState({})

    const handleChange = (data: any) => {
        if (err) setErr('')
        setErrors(Object.keys(data).reduce((acc, k) => ({...acc, [k]: null}), {...errors}))
        setValues({...values, ...data})
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            const errText = 'This field is required'
            setErrors({email: !values.email && errText, password: !values.password && errText})
            return;
        }
        post('/login', values).then(function ({token}) {
            localStorage.setItem("token", token)
            navigate('/users')
        }).catch(err => setErr(err))
    }
    return <CustomContainer>
        <Container>
            <Form>
                <h1 className="text-center">Sign in</h1>
                <InputData
                    required
                    name="email"
                    placeholder="email@example.com"
                    values={values}
                    type="text"
                    label="Email"
                    errors={errors}
                    onChange={handleChange}
                />
                <InputData
                    required
                    name="password"
                    placeholder="Password"
                    values={values}
                    type="password"
                    errors={errors}
                    onChange={handleChange}
                    label="Password"
                />
            </Form>
        </Container>
    </CustomContainer>
}