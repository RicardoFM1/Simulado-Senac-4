import { Col, Container, Row } from "react-bootstrap"
import Header from "../../Components/Header/header"
import Sidebar from "../../Components/Sidebar/sidebar"
import Dashboard from "../../Components/Dashboard/dashboard"
import Convidado from "../../Components/Convidado/convidado"
import Acompanhante from "../../Components/Acompanhante/acompanhante"
import Checkin from "../../Components/Checkin/checkin"
import Mesa from "../../Components/Mesa/mesa"


const Home = ({setShow, show, setTelaAtiva, telaAtiva}) => {
    return (
        <>
        <Header setShow={setShow} show={show}></Header>

        <Container >
            <Row>
                <Col lg={3}>
                <Sidebar setShow={setShow} show={show} setTelaAtiva={setTelaAtiva} telaAtiva={telaAtiva} />
                </Col>

                <Col xs={12} lg={show ? 9 : 12}>
                <main>
                   {telaAtiva === 'dashboard' ? <Dashboard /> : ''}
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