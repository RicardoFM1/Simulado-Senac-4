import { useEffect, useState } from "react"
import { Button, Stack } from "react-bootstrap"
import { toast } from "react-toastify"
import Tabela from "../Tabela/tabela"
import Api from "../../Api/api"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import MesaModal from "../Modais/Mesa/mesaModal"


const Mesa = () => {
    const [mesas, setMesas] = useState([])
    const [mesaSelecionada, setMesaSelecionada] = useState(null)
    const [show, setShow] = useState(false)


    const buscarMesas = async () => {
        try {
            const res = await Api.get('/mesa');

            if (res.status === 200) {
                setMesas(res.data.dados)
                console.log(res.data.dados)
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem);
        }
    }

    useEffect(() => {
        buscarMesas();
    }, [])

    const handleEdit = (row) => {
        setShow(true)
        setMesaSelecionada(row)
        console.log(row)
    }

    const handleDelete = (row) => {

    }

    const handleNovo = () => {
        setMesaSelecionada(null)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        buscarMesas()
    }



    const enviarDados = async (dados) => {
        try {
            let res;
            if (mesaSelecionada) {
                res = await Api.put(`/mesa?id_mesa=${mesaSelecionada.id_mesa}`, dados)

                if (res.status === 200) {
                    toast.success(res.data?.mensagem)
                    handleClose()
                }
            } else {
                res = await Api.post('/mesa', dados)

                if (res.status === 201) {
                    toast.success(res.data?.mensagem)
                    handleClose()
                }
            }
        } catch (err) {
            const erros = err.response?.data?.erros

            if (erros) {
                Object.values(erros).forEach((msg) => {
                    toast.error(msg)
                })
            } else {
                toast.error(err.response?.data?.mensagem || "Erro ao enviar dados")
            }
        }
    }

    const columns = [
        { header: 'Id da mesa', accessor: 'id_mesa' },
        // Colocar listagem melhor depois
        { header: 'Capacidade', accessor: 'capacidade' },
        { header: 'Restrição', accessor: 'restricao' },
        {
            header: 'Ações', accessor: 'ações', render: (row) => (
                <Stack gap={2} direction="horizontal">
                    <Button variant="warning" className="ignorar-css-btn" onClick={() => handleEdit(row)}><CiEdit size={20} />
                    </Button>
                    <Button variant="danger" className="ignorar-css-btn" onClick={() => handleDelete(row)}><MdDelete size={20} />
                    </Button>

                </Stack>
            )
        },

    ]
    return (
        <>
            <h1 className="mx-3 my-3">Mesas</h1>
            <Button className="mx-3 my-3" onClick={handleNovo}>Adicionar novo</Button>
            <Tabela columns={columns} rows={mesas} key={'id_mesa'} />
            <MesaModal show={show} dados={mesaSelecionada} handleClose={handleClose} submit={enviarDados} />
        </>
    )
}

export default Mesa;