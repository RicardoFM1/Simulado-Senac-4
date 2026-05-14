<?php

use Dotenv\Dotenv;

require_once __DIR__ . "/..//vendor/autoload.php";
require_once __DIR__ . "/../Controllers/Usuario/usuarioController.php";
require_once __DIR__ . "/../Controllers/Mesa/mesaController.php";
require_once __DIR__ . "/../Controllers/Convidado/convidadoController.php";
require_once __DIR__ . "/../Controllers/Checkin/checkinController.php";
require_once __DIR__ . "/../Controllers/Acompanhante/acompanhanteController.php";




$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE');
header('Access-Control-Allow-Credentials: true');

if ($metodo === 'OPTIONS') {
    http_response_code(200);
    echo 'ok';
}


if ($rota === '/usuario') {
    $usuarioController = new UsuarioController();

    if ($metodo === 'GET') {
        $usuarioController->listarUsuarios();
    }
    if ($metodo === 'POST') {
        $usuarioController->criarUsuario();
    }
    if ($metodo === 'PUT') {
        $usuarioController->atualizarUsuario();
    }
    if ($metodo === 'DELETE') {
        $usuarioController->deletarUsuario();
    }
}

if ($rota === '/usuario/login') {
    $usuarioController = new UsuarioController();


    if ($metodo === 'POST') {
        $usuarioController->fazerLogin();
    }
}


if ($rota === '/mesa') {
    $mesaController = new MesaController();

    if ($metodo === 'GET') {
        $mesaController->listarMesas();
    }
    if ($metodo === 'POST') {
        $mesaController->criarMesa();
    }
    if ($metodo === 'PUT') {
        $mesaController->atualizarMesa();
    }
    if ($metodo === 'DELETE') {
        $mesaController->deletarMesa();
    }
}

if ($rota === '/convidado') {
    $convidadoController = new ConvidadoController();

    if ($metodo === 'GET') {
        $convidadoController->listarConvidados();
    }
    if ($metodo === 'POST') {
        $convidadoController->criarConvidado();
    }
    if ($metodo === 'PUT') {
        $convidadoController->atualizarConvidado();
    }
    if ($metodo === 'DELETE') {
        $convidadoController->deletarConvidado();
    }
}

if ($rota === '/checkin') {
    $checkinController = new CheckinController();

    if ($metodo === 'GET') {
        $checkinController->listarCheckins();
    }
    if ($metodo === 'POST') {
        $checkinController->criarCheckin();
    }
}

if ($rota === '/acompanhante') {
    $acompanhanteController = new AcompanhanteController();

    if ($metodo === 'GET') {
        $acompanhanteController->listarAcompanhantes();
    }
    if ($metodo === 'POST') {
        $acompanhanteController->criarAcompanhante();
    }
    if ($metodo === 'PUT') {
        $acompanhanteController->atualizarAcompanhante();
    }
    if ($metodo === 'DELETE') {
        $acompanhanteController->deletarAcompanhante();
    }
}


