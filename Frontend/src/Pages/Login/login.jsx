import { useState } from "react";
import { Button, Card, Container, Form, InputGroup, Stack } from "react-bootstrap";
import style from "./login.module.css"
import { TbLockPassword } from "react-icons/tb";
import { toast } from "react-toastify";
import Api from "../../Services/api";
import { useNavigate } from "react-router";


const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (!name) return;

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Api.post('/usuario/login', formData)

            if (res.status === 200) {
                toast.success('Usuário logado com sucesso')
                localStorage.setItem('token', res.data.token)
                if (onLoginSuccess) await onLoginSuccess()
                navigate('/')
            }
        } catch (err) {
            const erros = err.response?.data?.erros

            if (erros) {
                Object.values(erros).forEach((msg) => {
                    toast.error(msg)
                })
            } else {
                toast.error(err.response?.data?.mensagem || "Erro ao enviar dados")
            }
        }
    }
    return (
        <Container fluid className={style.ContainerLogin}>
            <Card className={style.CardLogin}>
                <Form onSubmit={handleSubmit}>

                    <Card.Header>
                        <Card.Title className={style.tituloCard}>
                            Login
                        </Card.Title>
                        <Card.Body>
                            <Stack>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Seu email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        name="senha"
                                        type="password"
                                        placeholder="Sua senha"
                                        value={formData.senha}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                            </Stack>
                            <Stack className="py-4">

                                <Button type="submit">Entrar</Button>
                            </Stack>
                        </Card.Body>
                    </Card.Header>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;