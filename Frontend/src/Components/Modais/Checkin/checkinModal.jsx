import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import Api from "../../../Services/api";
import { toast } from "react-toastify";

const CheckinModal = ({ show, handleClose, submit }) => {
    const [convidados, setConvidados] = useState([]);
    const [convidadoId, setConvidadoId] = useState("");

    const buscarConvidados = async () => {
        try {
            const res = await Api.get('/convidado');
            setConvidados(res.data.dados);
        } catch (err) {
            toast.error("Erro ao carregar convidados para check-in");
        }
    };

    useEffect(() => {
        if (show) {
            buscarConvidados();
            setConvidadoId("");
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!convidadoId) {
            toast.error("Selecione um convidado");
            return;
        }
        submit({ convidado_idconvidado: convidadoId });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Realizar Check-in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Convidado</Form.Label>
                        <Form.Select
                            value={convidadoId}
                            onChange={(e) => setConvidadoId(e.target.value)}
                            required
                        >
                            <option value="">Selecione o convidado...</option>
                            {convidados.map(c => (
                                <option key={c.id_convidado} value={c.id_convidado}>
                                    {c.nome} {c.sobrenome} - {c.cpf}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="success">Confirmar Check-in</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CheckinModal;
