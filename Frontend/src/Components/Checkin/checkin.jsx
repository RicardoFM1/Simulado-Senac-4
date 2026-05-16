import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import Tabela from "../Tabela/tabela"
import Api from "../../Services/api"
import CheckinModal from "../Modais/Checkin/checkinModal"


const Checkin = () => {
    const [checkins, setCheckins] = useState([])
    const [show, setShow] = useState(false)


    const buscarCheckins = async () => {
        try {
            const res = await Api.get('/checkin');

            if (res.status === 200) {
                setCheckins(res.data?.dados)
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem || "Erro ao buscar check-ins");
        }
    }

    useEffect(() => {
        buscarCheckins();
    }, [])

    const handleNovo = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        buscarCheckins()
    }

    const realizarCheckin = async (dados) => {
        try {
            const res = await Api.post('/checkin', dados);
            if (res.status === 201) {
                toast.success(res.data.mensagem);
                handleClose();
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem || "Erro ao realizar check-in");
        }
    }

    const columns = [
        { header: 'Id', accessor: 'id_checkin' },
        { header: 'Usuário', accessor: 'usuario' },
        { header: 'Convidado', accessor: 'convidado' },
        { header: 'Data e hora', accessor: 'data_e_hora' },
    ]

    return (
        <>
            <h1 className="mx-3 my-3">Check-in</h1>
            <Button className="mx-3 my-3" onClick={handleNovo}>Realizar Novo Check-in</Button>
            <Tabela columns={columns} rows={checkins} chave={'id_checkin'} />
            <CheckinModal show={show} handleClose={() => setShow(false)} submit={realizarCheckin} />
        </>
    )
}

export default Checkin