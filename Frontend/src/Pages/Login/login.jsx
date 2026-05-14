import { useState } from "react";
import { Button, Card, Container, Form, InputGroup, Stack } from "react-bootstrap";
import style from "./login.module.css"
import { TbLockPassword } from "react-icons/tb";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(!name) return;

        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault; 

        try{

        }catch(err){
            
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