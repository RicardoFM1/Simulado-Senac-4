<?php
require_once __DIR__ . "/../../Services/Convidado/convidadoService.php";
require_once __DIR__ . "/../../Middleware/middleware.php";

class DashboardController {
    protected $convidadoService;

    public function __construct()
    {
        $this->convidadoService = new ConvidadoService();
    }

    public function apenasAdmin()
    {
        $jwt = Middleware::validarMiddleware();

        if ($jwt->dados->cargo_usuario !== 'admin') {
            http_response_code(401);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Usuário sem permissão'
            ]);
            exit;
        }
    }

    public function listarDashboard () {
        $this->apenasAdmin();

        $convidados = $this->convidadoService->listarConvidados();

        $convidadosConfirmados = null;
        $convidadosNaoConfirmados = null;
        $convidadosCancelado = null;

        foreach($convidados['dados'] as $convidado){
            if($convidado['confirmacao'] === 'confirmado'){
                $convidadosConfirmados++;
            }

            if($convidado['confirmacao'] === 'não confirmado'){
                $convidadosNaoConfirmados++;
            }

            if($convidado['confirmacao'] === 'cancelado'){
                $convidadosCancelado++;
            }
        }
        http_response_code(200);
        echo json_encode([
            'convidados' => [
                'listagem' => $convidados['dados'] ?? '',
                'confirmados' => $convidadosConfirmados,
                'nao_confirmados' => $convidadosNaoConfirmados,
                'cancelados' => $convidadosCancelado,
                'total' => count($convidados['dados'])
            ]
        ]);
        exit;
    }
}