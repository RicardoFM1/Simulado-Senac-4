import { Button, Offcanvas, Stack, Card } from "react-bootstrap"
import style from './sidebar.module.css'
import { useNavigate } from "react-router"
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ setTelaAtiva, telaAtiva, show, setShow, usuario }) => {
    const isAdmin = usuario?.cargo_usuario === 'admin';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Offcanvas className={style.sideBar} show={show} scroll={true} backdrop={false} >
            <Offcanvas.Body className="d-flex flex-column h-100">
                <div className="flex-grow-1">
                    <p className="text-muted small text-uppercase fw-bold">Navegação</p>
                    <hr />
                    {isAdmin && (
                        <>
                            <p className="fw-bold mb-2">Gestão</p>
                            <Stack>
                                <Button onClick={() => setTelaAtiva('dashboard')} className={telaAtiva === 'dashboard' ? style.botaoAtivo : ''}>
                                    Dashboard / Usuários
                                </Button>
                            </Stack>
                            <hr />
                        </>
                    )}

                    <p className="fw-bold mb-2">Operacional</p>
                    <Stack gap={2}>
                        <Button onClick={() => setTelaAtiva('convidados')} className={telaAtiva === 'convidados' ? style.botaoAtivo : ''}>
                            Convidados
                        </Button>
                        <Button onClick={() => setTelaAtiva('acompanhantes')} className={telaAtiva === 'acompanhantes' ? style.botaoAtivo : ''}>
                            Acompanhantes
                        </Button>
                        <Button onClick={() => setTelaAtiva('checkin')} className={telaAtiva === 'checkin' ? style.botaoAtivo : ''}>
                            Checkin
                        </Button>
                        <Button onClick={() => setTelaAtiva('mesas')} className={telaAtiva === 'mesas' ? style.botaoAtivo : ''}>
                            Mesas
                        </Button>
                    </Stack>
                </div>

                <div className="mt-auto pt-3">
                    <Card className="bg-light border-0 shadow-sm mb-3">
                        <Card.Body className="p-3">
                            <div className="d-flex align-items-center mb-1">
                                <div className="bg-primary rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                                <span className="text-muted small text-uppercase fw-bold">Sessão Ativa</span>
                            </div>
                            <p className="mb-0 fw-bold text-truncate" title={usuario?.email_usuario}>
                                {usuario?.email_usuario || 'Usuário'}
                            </p>
                            <p className="mb-0 text-muted small text-capitalize">
                                Cargo: {usuario?.cargo_usuario || 'Não definido'}
                            </p>
                        </Card.Body>
                    </Card>
                    
                    <Button 
                        variant="outline-danger" 
                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleLogout}
                    >
                        <IoLogOutOutline size={20} />
                        Sair do Sistema
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar