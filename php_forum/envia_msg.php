<?php
//header('Access-Control-Allow-Origin: *');
	// inclui arquivo de conexao
include('conexao.php');
	//verifica se já há sessão ativa
//if (session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
//} 
	// Cria as variáveis com os posts enviados
$nome = $_SESSION['user_name'];
$mensagem = $_POST["txmensagem"];
$time_stamps = date('Y-m-d H:i:s', strtotime('-4 hours'));
/* variaves a criar */
$tag_version = '0';	//
$relation;	//relaçao/cargo
$project_id = 2;	//id do projeto

// Cria query para a inserção no banco de dados
$query = "INSERT INTO `discussion`(`tag_version`, `user_name`, `date_time`, `project_id`, `discussion`) 
				VALUES ('{$tag_version}', '{$nome}', '{$time_stamps}', 
				'{$project_id}', '{$mensagem}')";
try {
		// Tenta inserir as informações enviadas
	$salvar = $conecta->prepare($query);
	$salvar->execute(array());

	// Caso de erro, retorna o erro ocorrido
} catch (Exception $e) {
	echo 'erro: ' . $e;
}

?>
