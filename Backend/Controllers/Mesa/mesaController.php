<?php
require_once __DIR__ . "/../../Services/Mesa/mesaService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;


class MesaController
{
    protected $mesaService;

    public function __construct()
    {
        $this->mesaService = new MesaService();
    }

    public function validarDados($dados)
    {
        try {

            $esquema = v::key('capacidade', v::intVal()->notEmpty());


            $esquema->assert($dados);
        } catch (NestedValidationException $e) {
            $mensagemPersonalizada = [
                'capacidade' => 'Capacidade inválida'

            ];

            $mensagemOriginal = $e->getMessages();
            $mensagemTraduzida = [];

            foreach ($mensagemOriginal as $campo => $mensagem) {
                $mensagemTraduzida[$campo] = $mensagemPersonalizada[$campo] ?? $mensagem;
            }

            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Erros de validação',
                'erros' => $mensagemTraduzida
            ]);
            http_response_code(400);
            exit;
        }
    }



    public function listarMesas()
    {
        Middleware::validarMiddleware();
        http_response_code(200);
        echo json_encode($this->mesaService->listarMesas());
        exit;
    }

    public function criarMesa()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);

            http_response_code(201);

            echo json_encode($this->mesaService->criarMesa($dados));
            exit;
        } catch (Exception $e) {
            http_response_code($e->getCode());
            echo json_encode([
                'sucesso' => false,
                'mensagem' => $e->getMessage()
            ]);
            exit;
        }
    }



    public function atualizarMesa()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);
            $idMesa = $_GET['id_mesa'];
            http_response_code(200);

            echo json_encode($this->mesaService->atualizarMesa($dados, $idMesa));
            exit;
        } catch (Exception $e) {
            http_response_code($e->getCode());
            echo json_encode([
                'sucesso' => false,
                'mensagem' => $e->getMessage()
            ]);
            exit;
        }
    }

    public function deletarMesa()
    {
        try {
            Middleware::validarMiddleware();

            http_response_code(200);

            $idMesa = $_GET['id_mesa'];
            echo json_encode($this->mesaService->deletarMesa($idMesa));
            exit;
        } catch (Exception $e) {
            http_response_code($e->getCode());
            echo json_encode([
                'sucesso' => false,
                'mensagem' => $e->getMessage()
            ]);
            exit;
        }
    }
}
