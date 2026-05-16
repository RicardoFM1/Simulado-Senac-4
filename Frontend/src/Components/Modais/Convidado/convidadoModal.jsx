import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";


const ConvidadoModal = ({ dados, show, handleClose, submit }) => {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        cpf: "",
        categoria: "",
        confirmacao: "",
        mesa_idmesa: "",
        telefone: ""


    })

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        if (dados) {
            setEditando(true)
            setFormData(dados)
            console.log(editando)
        } else {
            setEditando(false)
            setFormData({
                nome: "",
                sobrenome: "",
                email: "",
                cpf: "",
                categoria: "",
                confirmacao: "",
                mesa_idmesa: "",
                telefone: ""
            })
        }
    }, [show, dados])

    const handleSubmit = (e) => {
        e.preventDefault();

        submit(formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (!name) return

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Modal show={show} onHide={handleClose}>

            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar convidado' : 'Adicionar convidado'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>

                        <Form.Group>

                            <Form.Label>Nome (*)</Form.Label>
                            <Form.Control type="text"
                                value={formData.nome}
                                name="nome"
                                onChange={handleChange}
                                placeholder="Nome do convidado"
                                required={!editando}
                            />

                        </Form.Group>
                        <Form.Group>

                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type="text"
                                value={formData.sobrenome}
                                name="sobrenome"
                                onChange={handleChange}
                                placeholder="Sobrenome do convidado"
                                required={!editando}

                            />
                        </Form.Group>

                        <Form.Group>

                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                value={formData.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="Email do convidado"
                                required={!editando}

                            />
                        </Form.Group>

                        <Form.Group>

                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text"
                                value={formData.cpf}
                                name="cpf"
                                onChange={handleChange}
                                placeholder="CPF do convidado"
                                required={!editando}

                            />
                        </Form.Group>
                        <Form.Group>

                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text"
                                value={formData.categoria}
                                name="categoria"
                                onChange={handleChange}
                                placeholder="Categoria do convidado"
                                required={!editando}

                            />
                        </Form.Group>
                        {editando ? (

                            <Form.Group>

                                <Form.Label>Confirmacao</Form.Label>
                                <Form.Select
                                    value={formData.confirmacao}
                                    name="confirmacao"
                                    onChange={handleChange}
                                    placeholder="Confirmacao do convidado"
                                    required={!editando}

                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="cancelado">Cancelado</option>


                                </Form.Select>
                            </Form.Group>
                        ) : ("")}

                        <Form.Group>

                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text"
                                value={formData.telefone}
                                name="telefone"
                                onChange={handleChange}
                                placeholder="Telefone do convidado"
                                required={!editando}

                            />
                        </Form.Group>

                        <Form.Group>

                            <Form.Label>Nº da mesa</Form.Label>
                            <Form.Control type="number"
                                value={formData.mesa_idmesa}
                                name="mesa_idmesa"
                                onChange={handleChange}
                                placeholder="Mesa do convidado"
                               

                            />
                        </Form.Group>

                    </Stack>
                    <Stack gap={3} className="my-3 d-flex justify-content-end" direction="horizontal" >
                        <Button variant="secondary" type="button" className="ignorar-css-btn" onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button type="submit" onClick={() => handleClose}>
                            {editando ? 'Salvar alterações' : 'Criar'}
                        </Button>
                    </Stack>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default ConvidadoModal;