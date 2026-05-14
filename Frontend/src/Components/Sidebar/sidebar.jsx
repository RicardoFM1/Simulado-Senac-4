import { Button, Card, Offcanvas, Stack } from "react-bootstrap"
import style from './sidebar.module.css'

const Sidebar = ({setTelaAtiva, telaAtiva, show, setShow}) => {
    console.log(show)
    console.log(telaAtiva)
return (
    <Offcanvas className={style.sideBar} show={show} scroll={true} backdrop={false} >
        <Offcanvas.Body>
            <p className="text-mute">Navegação</p>
            <hr />
            <p>Admin</p>
            <Stack>
                <Button onClick={() => setTelaAtiva('dashboard')} className={telaAtiva === 'dashboard' ? style.botaoAtivo : ''}>
                    Dashboard
                </Button>
            </Stack>

            <hr />
            <p>Admin e ceremonialistas</p>
            <Stack gap={3}>
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

            
        </Offcanvas.Body>
    </Offcanvas>
)
}

export default Sidebar