import { Col, Container, Row } from "react-bootstrap"
import Header from "../../Components/Header/header"
import Sidebar from "../../Components/Sidebar/sidebar"
import Dashboard from "../../Components/Dashboard/dashboard"
import Convidado from "../../Components/Convidado/convidado"
import Acompanhante from "../../Components/Acompanhante/acompanhante"
import Checkin from "../../Components/Checkin/checkin"
import Mesa from "../../Components/Mesa/mesa"
import { useEffect } from "react"


const Home = ({ setShow, show, setTelaAtiva, telaAtiva, usuario }) => {
    
    // Safety check: if user is not admin but somehow telaAtiva is dashboard, switch it.
    useEffect(() => {
        if (telaAtiva === 'dashboard' && usuario && usuario.cargo_usuario !== 'admin') {
            setTelaAtiva('convidados');
        }
    }, [telaAtiva, usuario, setTelaAtiva]);

    return (
        <>
            <Header setShow={setShow} show={show}></Header>

            <Container >
                <Row>
                    <Col lg={3}>
                        <Sidebar setShow={setShow} show={show} setTelaAtiva={setTelaAtiva} telaAtiva={telaAtiva} usuario={usuario} />
                    </Col>

                    <Col xs={12} lg={show ? 9 : 12}>
                        <main>
                            {/* Protection: only show Dashboard if user is admin */}
                            {telaAtiva === 'dashboard' && usuario?.cargo_usuario === 'admin' ? <Dashboard /> : ''}
                            
                            {telaAtiva === 'convidados' ? <Convidado /> : ''}
                            {telaAtiva === 'acompanhantes' ? <Acompanhante /> : ''}
                            {telaAtiva === 'checkin' ? <Checkin /> : ''}
                            {telaAtiva === 'mesas' ? <Mesa /> : ''}
                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home