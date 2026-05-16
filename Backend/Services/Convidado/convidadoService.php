<?php


require_once __DIR__ . "/../../Connection/db.php";
require_once __DIR__ . "/../Mesa/mesaService.php";


class ConvidadoService
{
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

    public function buscarConvidadoPorEmail($emailConvidado)
    {
        if (empty($emailConvidado)) {
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM convidado WHERE email = :email');
        $buscar->execute([
            ':email' => $emailConvidado
        ]);

        $convidado = $buscar->fetch();

        if (empty($convidado)) {
            return [
                'sucesso' => false,
                'mensagem' => 'Convidado não encontrado',
                'codigo' => 404
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $convidado
        ];
    }

    public function buscarConvidadoPorMesaId($idMesa)
    {
        if (empty($idMesa)) {
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM convidado WHERE mesa_idmesa = :mesa_idmesa');
        $buscar->execute([
            ':mesa_idmesa' => $idMesa
        ]);

        $convidado = $buscar->fetchAll();

        if (empty($convidado)) {
            return [
                'sucesso' => false,
                'mensagem' => 'Convidado não encontrado',
                'codigo' => 404
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $convidado
        ];
    }

    public function listarConvidados()
    {
        $query = $this->db->prepare('SELECT * FROM convidado ORDER BY id_convidado DESC');
        $query->execute();
        $convidados = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $convidados
        ];
    }

    public function criarConvidado($convidadoDados)
    {
        try {
            $convidadoDados['cpf'] = preg_replace('/\D/', '', $convidadoDados['cpf']);
            $convidadoDados['telefone'] = preg_replace('/\D/', '', $convidadoDados['telefone']);

            $mesaComReferencia = new MesaService()->buscarMesaPorId($convidadoDados['mesa_idmesa']);
            $convidadosNaMesa = $this->buscarConvidadoPorMesaId($convidadoDados['mesa_idmesa']);


            if (isset($convidadosNaMesa['dados'])) {

                if (count($convidadosNaMesa['dados']) >= $mesaComReferencia['dados']['capacidade']) {
                    throw new Exception('Mesa lotada', 409);
                }
            }

            // Não pode cadastrar um convidado com confirmação, no banco é default não confirmado.
            $criar = $this->db->prepare('INSERT INTO convidado (nome, sobrenome, email, cpf, categoria, mesa_idmesa, telefone)
            VALUES(:nome, :sobrenome, :email, :cpf, :categoria, :mesa_idmesa, :telefone)');

            $criar->execute([
                ':nome' => $convidadoDados['nome'],
                ':sobrenome' => $convidadoDados['sobrenome'],
                ':email' => $convidadoDados['email'],
                ':cpf' => $convidadoDados['cpf'],
                ':categoria' => $convidadoDados['categoria'],
                ':mesa_idmesa' => $convidadoDados['mesa_idmesa'],
                ':telefone' => $convidadoDados['telefone'],
            ]);



            return [
                'sucesso' => true,
                'mensagem' => 'Convidado criado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'email')) {
                throw new Exception('Email já em uso', 409);
            }
            if (str_contains($e->getMessage(), 'cpf')) {
                throw new Exception('Cpf já em uso', 409);
            }

            if (str_contains($e->getMessage(), 'fk_convidado_mesa')) {
                throw new Exception('Mesa referenciada não encontrada', 404);
            }


            throw new Exception('Erro ao tentar criar convidado', 500);
        }
    }




    public function atualizarConvidado($convidadoDados, $emailConvidado)
    {
        try {
            $convidadoDados['cpf'] = preg_replace('/\D/', '', $convidadoDados['cpf']);
            $convidadoDados['telefone'] = preg_replace('/\D/', '', $convidadoDados['telefone']);

            $convidado = $this->buscarConvidadoPorEmail($emailConvidado);

            if ($convidado['sucesso'] === false) {
                throw new Exception($convidado['mensagem'], $convidado['codigo']);
            }

            if ($convidadoDados['confirmacao'] !== 'cancelado') {
                throw new Exception('Só é possível cancelar um convidado', 400);
            }

            if ($convidado['dados']['confirmacao'] === 'confirmado') {
                throw new Exception('Não é possível cancelar um convidado confirmado', 400);
            }


            $mesaComReferencia = new MesaService()->buscarMesaPorId($convidadoDados['mesa_idmesa']);
            $convidadosNaMesa = $this->buscarConvidadoPorMesaId($convidadoDados['mesa_idmesa']);

            if (isset($convidadosNaMesa['dados'])) {
                if (count($convidadosNaMesa['dados']) >= $mesaComReferencia['dados']['capacidade'] && $convidado['dados']['mesa_idmesa'] !== $convidadoDados['mesa_idmesa']) {
                    throw new Exception('Mesa lotada', 409);
                }
            }

            $atualizar = $this->db->prepare('UPDATE convidado SET nome = :nome, sobrenome = :sobrenome, email = :email, cpf = :cpf, categoria = :categoria, confirmacao = :confirmacao, 
            mesa_idmesa = :mesa_idmesa, telefone = :telefone WHERE email = :email_antigo');

            $atualizar->execute([
                ':nome' => $convidadoDados['nome'],
                ':sobrenome' => $convidadoDados['sobrenome'],
                ':email' => $convidadoDados['email'],
                ':cpf' => $convidadoDados['cpf'],
                ':confirmacao' => $convidadoDados['confirmacao'],
                ':categoria' => $convidadoDados['categoria'],
                ':mesa_idmesa' => $convidadoDados['mesa_idmesa'],
                ':telefone' => $convidadoDados['telefone'],
                ':email_antigo' => $emailConvidado
            ]);

            return [
                'sucesso'  => true,
                'mensagem' => 'Convidado atualizado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'email')) {
                throw new Exception('Email já em uso', 409);
            }
            if (str_contains($e->getMessage(), 'cpf')) {
                throw new Exception('Cpf já em uso', 409);
            }

            if (str_contains($e->getMessage(), 'fk_convidado_mesa')) {
                throw new Exception('Mesa referenciada não encontrada', 404);
            }

            throw new Exception('Erro ao tentar atualizar convidado' . $e->getMessage(), 500);
        }
    }

    public function deletarConvidado($emailConvidado)
    {
        try {
            $convidado = $this->buscarConvidadoPorEmail($emailConvidado);

            if ($convidado['sucesso'] === false) {
                throw new Exception($convidado['mensagem'], $convidado['codigo']);
            }

            if ($convidado['dados']['confirmacao'] === 'confirmado') {
                throw new Exception('Não é possível deletar um convidado confirmado', 400);
            }
            $deletar = $this->db->prepare('DELETE FROM convidado WHERE email = :email');

            $deletar->execute([
                ':email' => $emailConvidado
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Convidado deletado com sucesso'
            ];
        } catch (PDOException $e) {

            if (str_contains($e->getMessage(), 'fk_convidado_mesa')) {
                throw new Exception('Mesa referenciada não encontrada', 404);
            }

            if (str_contains($e->getMessage(), 'parent row')) {
                throw new Exception('Impossível deletar convidado referenciado', 409);
            }
            throw new Exception('Erro ao tentar deletar convidado', 500);
        }
    }
}
