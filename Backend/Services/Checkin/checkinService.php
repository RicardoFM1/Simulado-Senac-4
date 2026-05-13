<?php

use Firebase\JWT\JWT;

date_default_timezone_set('America/Sao_Paulo');
require_once __DIR__ . "/../../Connection/db.php";


class CheckinService
{
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

    public function buscarCheckinPorId($idCheckin)
    {
        if (empty($idCheckin)) {
            throw new Exception('Dados inválidos', 400);
        }

        $buscar = $this->db->prepare('SELECT * FROM checkin WHERE id_checkin = :id_checkin');
        $buscar->execute([
            ':id_checkin' => $idCheckin
        ]);

        $checkin = $buscar->fetch();

        if (empty($checkin)) {
            return [
                'sucesso' => false,
                'mensagem' => 'Checkin não encontrado',
                'codigo' => 404
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $checkin
        ];
    }

    public function listarCheckins()
    {
        $query = $this->db->prepare('SELECT * FROM checkin');

        $checkins = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $checkins
        ];
    }

    public function criarCheckin($checkinDados, $jwt)
    {
        try {

            $buscarConvidado = $this->db->prepare('SELECT * FROM convidado WHERE id_convidado = :id_convidado');

            $buscarConvidado->execute([
                ':id_convidado' => $checkinDados['convidado_idconvidado']
            ]);

            $convidado = $buscarConvidado->fetch();

            if (empty($convidado)) {
                throw new Exception('Convidado não encontrado', 404);
            }

            if ($convidado['confirmacao'] === 'confirmado') {
                throw new Exception('Impossível fazer checkin de um convidado já confirmado', 409);
            }

            if ($convidado['confirmacao'] === 'cancelado') {
                throw new Exception('Impossível fazer checkin de um convidado cancelado', 409);
            }

            $dataFormatada = date('Y-m-d');

            $criar = $this->db->prepare('INSERT INTO checkin (usuario_idusuario, convidado_idconvidado, data_e_hora)
            VALUES(:usuario_idusuario, :convidado_idconvidado, :data_e_hora)');

            $criar->execute([
                ':usuario_idusuario' => $jwt->dados->id_usuario,
                ':convidado_idconvidado' => $checkinDados['convidado_idconvidado'],
                ':data_e_hora' => $dataFormatada,

            ]);

            $atualizarConvidado = $this->db->prepare('UPDATE convidado SET confirmacao = :confirmacao WHERE id_convidado = :id_convidado');

            $atualizarConvidado->execute([
                ':confirmacao' => 'confirmado',
                ':id_convidado' => $checkinDados['convidado_idconvidado']
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Checkin criado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'convidado_idconvidado')) {
                throw new Exception('Convidado já confirmado', 409);
            }
            if (str_contains($e->getMessage(), 'fk_checkin_usuario')) {
                throw new Exception('Usuário referenciado não encontrado', 409);
            }

            if (str_contains($e->getMessage(), 'fk_checkin_convidado')) {
                throw new Exception('Convidado referenciado não encontrado', 409);
            }


            throw new Exception('Erro ao tentar criar checkin', 500);
        }
    }
}
