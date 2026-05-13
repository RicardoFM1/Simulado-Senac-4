<?php
require_once __DIR__ . "/../../Services/Acompanhante/acompanhanteService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;


class AcompanhanteController
{
    protected $acompanhanteService;


    public function __construct()
    {
        $this->acompanhanteService = new AcompanhanteService();
    }

    public function validarDados($dados)
    {
        try {
            $confirmacaoPermitida = ['confirmado', 'não confirmado', 'cancelado'];

            $esquema = v::key('nome', v::stringVal()->notEmpty()->length(1, 45))
                ->key('sobrenome', v::stringVal()->notEmpty()->length(1, 45))
                ->key('email', v::email())
                ->key('idade', v::intVal()->notEmpty())
                ->key('convidado_idconvidado', v::intVal()->notEmpty());


            $esquema->assert($dados);
        } catch (NestedValidationException $e) {
            $mensagemPersonalizada = [
                'nome' => 'Nome inválido, min 1, max 45',
                'sobrenome' => 'Sobrenome inválido, min 1, max 45',
                'email' => 'Email inválido',
                'idade' => 'Idade inválida',
                'convidado_idconvidado' => 'Referência do convidado inválida'
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


    public function listarAcompanhantes()
    {
        Middleware::validarMiddleware();
        http_response_code(200);
        echo json_encode($this->acompanhanteService->listarAcompanhantes());
        exit;
    }

    public function criarAcompanhante()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);
            http_response_code(201);

            echo json_encode($this->acompanhanteService->criarAcompanhante($dados));
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

    public function atualizarAcompanhante()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);
            $emailAcompanhante = $_GET['email_acompanhante'];
            http_response_code(200);

            echo json_encode($this->acompanhanteService->atualizarAcompanhante($dados, $emailAcompanhante));
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

    public function deletarAcompanhante()
    {
        try {
            Middleware::validarMiddleware();
            http_response_code(200);


            $emailAcompanhante = $_GET['email_acompanhante'];

            echo json_encode($this->acompanhanteService->deletarAcompanhante($emailAcompanhante));
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
