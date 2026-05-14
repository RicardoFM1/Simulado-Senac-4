import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";


const MesaModal = ({ dados, show, handleClose, submit }) => {
    const [formData, setFormData] = useState({
        capacidade: "",
        restricao: ""
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
                capacidade: "",
                restricao: ""
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
                    <Modal.Title>{editando ? 'Editar mesa' : 'Adicionar mesa'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>

                        <Form.Group>

                            <Form.Label>Capacidade (*)</Form.Label>
                            <Form.Control type="number"
                                value={formData.capacidade}
                                name="capacidade"
                                onChange={handleChange}
                                placeholder="Capacidade da mesa"
                                required={!editando}
                            />

                        </Form.Group>
                        <Form.Group>

                            <Form.Label>Restrição</Form.Label>
                            <Form.Control type="text"
                                value={formData.restricao}
                                name="restricao"
                                onChange={handleChange}
                                placeholder="Restrição da mesa"
                               

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

export default MesaModal;