<?php
require_once __DIR__ . "/../../Services/Convidado/convidadoService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;


class ConvidadoController
{
    protected $convidadoService;


    public function __construct()
    {
        $this->convidadoService = new ConvidadoService();
    }

    public function validarDados($dados)
    {
        try {
           

            $esquema = v::key('nome', v::stringVal()->notEmpty()->length(1, 45))
                ->key('sobrenome', v::stringVal()->notEmpty()->length(1, 45))
                ->key('email', v::email())
                ->key('cpf', v::cpf())
                ->key('categoria', v::stringVal()->notEmpty())
    
                ->key('telefone', v::phone())
                ->key('mesa_idmesa', v::intVal());

            $esquema->assert($dados);
        } catch (NestedValidationException $e) {
            $mensagemPersonalizada = [
                'nome' => 'Nome inválido, min 1, max 45',
                'sobrenome' => 'Sobrenome inválido, min 1, max 45',
                'email' => 'Email inválido',
                'cpf' => 'Cpf inválido',
                'categoria' => 'Categoria inválida',
                
                'telefone' => 'Telefone inválido',
                'mesa_idmesa' => 'Referência da mesa inválida'
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


    public function listarConvidados()
    {
        Middleware::validarMiddleware();
        http_response_code(200);
        echo json_encode($this->convidadoService->listarConvidados());
        exit;
    }

    public function criarConvidado()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);
            http_response_code(201);

            echo json_encode($this->convidadoService->criarConvidado($dados));
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

    public function atualizarConvidado()
    {
        try {
            Middleware::validarMiddleware();
            $dados = json_decode(file_get_contents('php://input'), true);
            $this->validarDados($dados);
            $emailConvidado = $_GET['email_convidado'];
            http_response_code(200);

            echo json_encode($this->convidadoService->atualizarConvidado($dados, $emailConvidado));
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

    public function deletarConvidado()
    {
        try {
            Middleware::validarMiddleware();
            http_response_code(200);


            $emailConvidado = $_GET['email_convidado'];

            echo json_encode($this->convidadoService->deletarConvidado($emailConvidado));
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
