<?php


require_once __DIR__ . "/../../Connection/db.php";


class AcompanhanteService
{
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

    public function buscarAcompanhantePorEmail($emailAcompanhante)
    {
        if (empty($emailAcompanhante)) {
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM acompanhante WHERE email = :email');
        $buscar->execute([
            ':email' => $emailAcompanhante
        ]);

        $acompanhante = $buscar->fetch();

        if (empty($acompanhante)) {
            return [
                'sucesso' => false,
                'mensagem' => 'Acompanhante não encontrado',
                'codigo' => 404
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $acompanhante
        ];
    }

    public function listarAcompanhantes()
    {
        $query = $this->db->prepare('SELECT * FROM acompanhante');

        $acompanhante = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $acompanhante
        ];
    }

    public function criarAcompanhante($acompanhanteDados)
    {
        try {


            $criar = $this->db->prepare('INSERT INTO acompanhante (nome, sobrenome, email, idade, convidado_idconvidado)
            VALUES(:nome, :sobrenome, :email, :idade, :convidado_idconvidado)');

            $criar->execute([
                ':nome' => $acompanhanteDados['nome'],
                ':sobrenome' => $acompanhanteDados['sobrenome'],
                ':email' => $acompanhanteDados['email'],
                ':idade' => $acompanhanteDados['idade'],
                ':convidado_idconvidado' => $acompanhanteDados['convidado_idconvidado']
            ]);


            return [
                'sucesso' => true,
                'mensagem' => 'Acompanhante criado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'email')) {
                throw new Exception('Email já em uso', 409);
            }

            if (str_contains($e->getMessage(), 'fk_acompanhante_convidado')) {
                throw new Exception('Convidado referenciado não encontrado', 404);
            }


            throw new Exception('Erro ao tentar criar acompanhante', 500);
        }
    }




    public function atualizarAcompanhante($acompanhanteDados, $emailAcompanhante)
    {
        try {


            $acompanhante = $this->buscarAcompanhantePorEmail($emailAcompanhante);

            if ($acompanhante['sucesso'] === false) {
                throw new Exception($acompanhante['mensagem'], $acompanhante['codigo']);
            }



            $atualizar = $this->db->prepare('UPDATE acompanhante SET nome = :nome, sobrenome = :sobrenome, email = :email, idade = :idade, 
            convidado_idconvidado = :convidado_idconvidado WHERE email = :email_antigo');

            $atualizar->execute([
                ':nome' => $acompanhanteDados['nome'],
                ':sobrenome' => $acompanhanteDados['sobrenome'],
                ':email' => $acompanhanteDados['email'],
                ':idade' => $acompanhanteDados['idade'],
                ':convidado_idconvidado' => $acompanhanteDados['convidado_idconvidado'],
                ':email_antigo' => $emailAcompanhante
            ]);

            return [
                'sucesso'  => true,
                'mensagem' => 'Acompanhante atualizado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'email')) {
                throw new Exception('Email já em uso', 409);
            }

            if (str_contains($e->getMessage(), 'fk_acompanhante_convidado')) {
                throw new Exception('Convidado referenciado não encontrado', 404);
            }


            throw new Exception('Erro ao tentar atualizar acompanhante', 500);
        }
    }

    public function deletarAcompanhante($emailAcompanhante)
    {
        try {
            $acompanhante = $this->buscarAcompanhantePorEmail($emailAcompanhante);

            if ($acompanhante['sucesso'] === false) {
                throw new Exception($acompanhante['mensagem'], $acompanhante['codigo']);
            }

            
            $deletar = $this->db->prepare('DELETE FROM acompanhante WHERE email = :email');

            $deletar->execute([
                'email' => $emailAcompanhante
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Acompanhante deletado com sucesso'
            ];
        } catch (PDOException $e) {

            if (str_contains($e->getMessage(), 'fk_acompanhante_convidado')) {
                throw new Exception('Convidado referenciado não encontrado', 404);
            }

            throw new Exception('Erro ao tentar deletar acompanhante', 500);
        }
    }
}
