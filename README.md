# Simulado-Senac-4

O simulado consiste no intuito de treinar para a competição do senac e escolher um representante.

--- 

# Estrutura 

- 5 Pastas separadas, contando com Connection, Controllers, Middleware, Routes e Service.
- Sistema monólito

--- 

# Ferramentas utilizadas

## Aplicativos/Ferramentas:
- Mysql Server;
- Mysql Workbench;
- Insomnia;


## Bibliotecas:


```
{
    "require": {
        "respect/validation": "2.4",
        "vlucas/phpdotenv": "^5.6",
        "firebase/php-jwt": "^7.0"
    }
}


```


--- 

# Como rodar

* Primeiramente clone o repositório e no gitbash inclua o comando:

```bash
git clone https://github.com/RicardoFM1/Simulado-Senac-4 
```

- Após isso instale as dependências:

NO CMD:

```
cd Simulado-Senac-4/backend
Composer install

```


* E Então inicie o backend:

```
cd Routes

php -S localhost:3000
```


## Cole o SQL no workbench

- Para criar tabelas, seeders e etc, abre o script no workbench e inclua o seguinte comando:

```sql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_casamento` DEFAULT CHARACTER SET utf8 ;
USE `db_casamento` ;

-- -----------------------------------------------------
-- Table `db_casamento`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`mesa` (
  `id_mesa` INT NOT NULL AUTO_INCREMENT,
  `capacidade` INT NOT NULL,
  `restricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`convidado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`convidado` (
  `id_convidado` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `confirmacao` VARCHAR(45) NOT NULL DEFAULT 'não confirmado',
  `mesa_idmesa` INT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_convidado`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_convidado_mesa_idx` (`mesa_idmesa` ASC) VISIBLE,
  CONSTRAINT `fk_convidado_mesa`
    FOREIGN KEY (`mesa_idmesa`)
    REFERENCES `db_casamento`.`mesa` (`id_mesa`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`checkin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`checkin` (
  `id_checkin` INT NOT NULL AUTO_INCREMENT,
  `usuario_idusuario` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  `data_e_hora` TIMESTAMP NULL,
  PRIMARY KEY (`id_checkin`),
  UNIQUE INDEX `convidado_idconvidado_UNIQUE` (`convidado_idconvidado` ASC) VISIBLE,
  INDEX `fk_checkin_usuario_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_checkin_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `db_casamento`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_checkin_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`acompanhante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`acompanhante` (
  `id_acompanhante` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `idade` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  PRIMARY KEY (`id_acompanhante`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_acompanhante_convidado_idx` (`convidado_idconvidado` ASC) VISIBLE,
  CONSTRAINT `fk_acompanhante_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET time_zone = '-03:00';

/* SEEDERS */

INSERT INTO usuario (nome, email, cpf, senha, cargo)
VALUES ('ricardo', 'ricardo@gmail.com', '05380295010', '$2a$12$I5ersGjSXTIL9zEvpHk6N.1kushaPRnO.vHb/ZjHK5crPeLdJgmPm', 'admin'),
 ('ricardo2', 'ricardo2@gmail.com', '88840822003', '$2a$12$I5ersGjSXTIL9zEvpHk6N.1kushaPRnO.vHb/ZjHK5crPeLdJgmPm', 'ceremonialista');
 
/* SENHAS = 12345678 */

INSERT INTO mesa (capacidade, restricao)
VALUES (100, 'Lactose');

DELIMITER $$
CREATE PROCEDURE seed_convidados()
BEGIN
DECLARE i INT DEFAULT 1;
WHILE i <= 30 DO
INSERT INTO convidado(nome, sobrenome, email, cpf, categoria, confirmacao, mesa_idmesa, telefone)
VALUES(
	CONCAT('ricardo', i),
    CONCAT('fernandes', i),
    CONCAT('ricardo', i, '@gmail.com'),
    LPAD(i, 11, '0'),
    IF(i % 2 = 0, 'parente', 'convidado'),
    IF(i % 2 = 0, 'confirmado', 'cancelado'),
    1, 
    CONCAT('519999', LPAD(i, 4, '0'))
    
);
SET i = i+1;
END while;
END$$
DELIMITER ;

call seed_convidados();

INSERT INTO checkin (usuario_idusuario, convidado_idconvidado, data_e_hora)
VALUES(1, 1, '2026-05-13');

INSERT INTO acompanhante(nome, sobrenome, email, idade, convidado_idconvidado)
VALUES('Fernando', 'Braga', 'fernando@gmail.com', 18, 1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



```

- Selecione tudo e execute com CTRL+ENTER


## Configuração do .env:

- Há um arquivo chamado .env.example no projeto, baseie-se nele e apenas mude os valores para os valores do seu DB e então renomeie o arquivo para: ***.env***

--- 


# Rotas


* Para as rotas, existem 6 ENDPOINTS, que estão detalhados aqui:

ENDPOINT DE USUÁRIOS:

***DETALHE*** PARA poder utilizar esse endpoint, primeiro certifique-se de criar o SQL e a inserção no banco de dados

ROTA: /usuario:
MÉTODOS: GET, POST, PUT , DELETE (TODOS PRECISAM DE PERMISSÃO ADMIN E AUTENTICAÇÃO)

json:

```json
"nome": "Ricardo",
"email": "ricardo@gmail.com",
"cpf": "05380295010",
"senha": "12345678",
"cargo": "ceremonialista" ou "admin"

```

ROTA /usuario/login:
MÉTODO: POST

```json
"email": "ricardo@gmail.com",
"senha": "12345678"

```

--- 

ROTA /convidado:
MÉTODOS: MÉTODOS: GET, POST, PUT , DELETE (TODOS PRECISAM DE AUTENTICAÇÃO)

```json
"nome": "Ricardo",
"sobrenome": "Fernandes",
"email": "ricardo@gmail.com",
"cpf": "05380295010",
"categoria": "parente",
"confirmacao": "cancelado" (APENAS POSSÍVEL CANCELAR)
"mesa_idmesa": 1,
"telefone": "5199999"
```

---

ROTA /checkin:
MÉTODOS: MÉTODOS: GET, POST (TODOS PRECISAM DE AUTENTICAÇÃO)

```json
"usuario_idusuario": 1,
"convidado_idconvidado": 1

```

---

ROTA /acompanhante:
MÉTODOS: MÉTODOS: GET, POST, PUT , DELETE (TODOS PRECISAM DE AUTENTICAÇÃO)

```json
"nome": "Ricardo",
"sobrenome": "Fernandes",
"email": "ricardo@gmail.com",
"idade": 18,
"convidado_idconvidado": 1
```


