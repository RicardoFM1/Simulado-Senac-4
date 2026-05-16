import { useEffect, useState } from "react";
import { Card, Col, Row, Container, Button, Stack } from "react-bootstrap";
import Api from "../../Services/api";
import { toast } from "react-toastify";
import Tabela from "../Tabela/tabela";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import UsuarioModal from "../Modais/Usuario/usuarioModal";
import DeleteModal from "../Modais/DeleteModal";

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const buscarDados = async () => {
        try {
            const [resSummary, resUsers] = await Promise.all([
                Api.get('/dashboard'),
                Api.get('/usuario')
            ]);
            setSummary(resSummary.data.convidados);
            setUsuarios(resUsers.data.dados);
        } catch (err) {
            toast.error("Erro ao carregar dados do dashboard");
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    const handleEdit = (user) => {
        setUsuarioSelecionado(user);
        setShowModal(true);
    };

    const handleDelete = (user) => {
        setUsuarioSelecionado(user);
        setShowDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await Api.delete(`/usuario?email_usuario=${usuarioSelecionado.email}`);
            if (res.status === 200) {
                toast.success(res.data.mensagem);
                setShowDelete(false);
                buscarDados();
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem || "Erro ao deletar usuário");
        }
    };

    const handleSubmitUser = async (dados) => {
        try {
            let res;
            if (usuarioSelecionado) {
                res = await Api.put(`/usuario?email_usuario=${usuarioSelecionado.email}`, dados);
            } else {
                res = await Api.post('/usuario', dados);
            }

            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.mensagem);
                setShowModal(false);
                buscarDados();
            }
        } catch (err) {
            const erros = err.response?.data?.erros;
            if (erros) {
                Object.values(erros).forEach(msg => toast.error(msg));
            } else {
                toast.error(err.response?.data?.mensagem || "Erro ao salvar usuário");
            }
        }
    };

    const columns = [
        { header: 'Nome', accessor: 'nome' },
        { header: 'Email', accessor: 'email' },
        { header: 'CPF', accessor: 'cpf' },
        { header: 'Cargo', accessor: 'cargo' },
        {
            header: 'Ações', accessor: 'acoes', render: (row) => (
                <Stack gap={2} direction="horizontal">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(row)}><CiEdit /></Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row)}><MdDelete /></Button>
                </Stack>
            )
        }
    ];

    if (!summary) return <div className="p-4">Carregando...</div>;

    return (
        <Container className="py-4">
            <h1 className="mb-4">Dashboard Administrativo</h1>

            <Row className="g-4 mb-5">
                <Col md={3}>
                    <Card className="text-center bg-primary text-white h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="opacity-75">Total de Convidados</Card.Title>
                            <Card.Text className="display-4 fw-bold">{summary.total}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-success text-white h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="opacity-75">Confirmados</Card.Title>
                            <Card.Text className="display-4 fw-bold">{summary.confirmados || 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-warning text-white h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="opacity-75">Não Confirmados</Card.Title>
                            <Card.Text className="display-4 fw-bold">{summary.nao_confirmados || 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-danger text-white h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title className="opacity-75">Cancelados</Card.Title>
                            <Card.Text className="display-4 fw-bold">{summary.cancelados || 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Gerenciamento de Usuários</h3>
                <Button variant="primary" onClick={() => { setUsuarioSelecionado(null); setShowModal(true); }}>
                    Novo Usuário
                </Button>
            </div>

            <Tabela columns={columns} rows={usuarios} chave={'id_usuario'} />

            <UsuarioModal
                show={showModal}
                dados={usuarioSelecionado}
                handleClose={() => setShowModal(false)}
                submit={handleSubmitUser}
            />

            <DeleteModal
                show={showDelete}
                handleClose={() => setShowDelete(false)}
                handleConfirm={handleConfirmDelete}
                title="Excluir Usuário"
                message={`Tem certeza que deseja excluir o usuário ${usuarioSelecionado?.nome}?`}
            />
        </Container>
    );
};

export default Dashboard;