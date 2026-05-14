import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import Tabela from "../Tabela/tabela"
import Api from "../../Api/api"


const Checkin = () => {
    const [checkins, setCheckins] = useState([])
    const [show, setShow] = useState(false)


    const buscarCheckins = async () => {
        try {
            const res = await Api.get('/checkin');

            if (res.status === 200) {
                setCheckins(res.data.dados)
                console.log(res.data.dados)
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem);
        }
    }

    useEffect(() => {
        buscarCheckins();
    }, [])

   
    const handleNovo = () => {

    }

    const handleClose = () => {

    }

    const columns = [
        { header: 'Id do checkin', accessor: 'id_checkin' },
        { header: 'Id do usuário', accessor: 'usuario_idusuario' },
        // Colocar listagem melhor depois
        { header: 'Id do convidado', accessor: 'convidado_idconvidado' },
        { header: 'Data e hora', accessor: 'data_e_hora' },
       
    

    ]
    return (
        <>
        <h1 className="mx-3 my-3">Checkin</h1>
         <Button className="mx-3 my-3">Adicionar novo</Button>
        <Tabela columns={columns} rows={checkins} key={'id_checkin'} />
        </>
    )
}

export default Checkin