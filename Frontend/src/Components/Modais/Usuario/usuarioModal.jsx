import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";

const UsuarioModal = ({ dados, show, handleClose, submit }) => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        cargo: ""
    });

    const [editando, setEditando] = useState(false);

    useEffect(() => {
        if (dados) {
            setEditando(true);
            setFormData({
                ...dados,
                senha: "" // Don't populate password
            });
        } else {
            setEditando(false);
            setFormData({
                nome: "",
                email: "",
                cpf: "",
                senha: "",
                cargo: ""
            });
        }
    }, [show, dados]);

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar Usuário' : 'Novo Usuário'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Senha {editando && "(deixe em branco para não alterar)"}</Form.Label>
                            <Form.Control
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cargo</Form.Label>
                            <Form.Select
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="admin">Administrador</option>
                                <option value="ceremonialista">Cerimonialista</option>
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="primary">{editando ? 'Salvar' : 'Criar'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UsuarioModal;
