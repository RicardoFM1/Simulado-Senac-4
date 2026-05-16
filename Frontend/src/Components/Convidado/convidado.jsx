import { toast } from "react-toastify"
import Api from "../../Services/api";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Tabela from "../Tabela/tabela";
import ConvidadoModal from "../Modais/Convidado/convidadoModal";
import DeleteModal from "../Modais/DeleteModal";



const Convidado = () => {
    const [convidados, setConvidados] = useState([])
    const [convidadoSelecionado, setConvidadoSelecionado] = useState(null)
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)


    const buscarConvidados = async () => {
        try {
            const res = await Api.get('/convidado');

            if (res.status === 200) {
                setConvidados(res.data.dados)
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem);
        }
    }

    useEffect(() => {
        buscarConvidados();
    }, [])

    const handleEdit = (row) => {
        setShow(true)
        setConvidadoSelecionado(row)
    }

    const handleDelete = (row) => {
        setConvidadoSelecionado(row)
        setShowDelete(true)
    }

    const handleConfirmDelete = async () => {
        try {
            const res = await Api.delete(`/convidado?email_convidado=${convidadoSelecionado.email}`)
            if (res.status === 200) {
                toast.success(res.data.mensagem)
                setShowDelete(false)
                buscarConvidados()
            }
        } catch (err) {
            toast.error(err.response?.data?.mensagem || "Erro ao deletar convidado")
        }
    }

    const handleNovo = () => {
        setConvidadoSelecionado(null)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        buscarConvidados()
    }



    const enviarDados = async (dados) => {
        try {
            let res;
            if (convidadoSelecionado) {
                res = await Api.put(`/convidado?email_convidado=${convidadoSelecionado.email}`, dados)

                if (res.status === 200) {
                    toast.success(res.data?.mensagem)
                    handleClose()
                }
            } else {
                res = await Api.post('/convidado', dados)

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
        { header: 'Id do convidado', accessor: 'id_convidado' },
        { header: 'Nome', accessor: 'nome' },
        { header: 'Sobrenome', accessor: 'sobrenome' },
        { header: 'Email', accessor: 'email' },
        { header: 'Cpf', accessor: 'cpf' },
        { header: 'Categoria', accessor: 'categoria' },
        { header: 'Confirmação', accessor: 'confirmacao' },
        { header: 'Telefone', accessor: 'telefone' },
        { header: 'Nº da mesa', accessor: 'mesa_idmesa' },
        {
            header: 'Ações', accessor: 'ações', render: (row) => (
                <Stack gap={2} direction="horizontal">
                    <Button variant="warning" className="ignorar-css-btn" onClick={() => handleEdit(row)}><CiEdit size={20} />
                    </Button>
                    <Button variant="danger" className="ignorar-css-btn" onClick={() => handleDelete(row)}><MdDelete size={20} />
                    </Button>

                </Stack>
            )
        }
    ]

    return (
        <>
            <h1 className="mx-3 my-3">Convidados</h1>
            <Button className="mx-3 my-3" onClick={handleNovo}>Adicionar novo</Button>
            <Tabela columns={columns} rows={convidados} chave={'id_convidado'} />
            <ConvidadoModal show={show} dados={convidadoSelecionado} handleClose={handleClose} submit={enviarDados} />
            <DeleteModal
                show={showDelete}
                handleClose={() => setShowDelete(false)}
                handleConfirm={handleConfirmDelete}
                title="Excluir Convidado"
                message={`Tem certeza que deseja excluir o convidado ${convidadoSelecionado?.nome}?`}
            />
        </>
    )
}

export default Convidado
