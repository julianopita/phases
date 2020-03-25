<?php
//header('Access-Control-Allow-Origin: *');
	// Inclui arquivo de conexao
include('conexao.php');

//if (session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
//} 
	// Cria as variáveis com os atravez da session
$nome = $_SESSION['user_name'];
$mensagem = $_POST["resposta"];
$id_mensagem = $_POST["id_mensagem"];
$time_stamps = date('Y-m-d H:i:s', strtotime('-4 hours'));

	// Cria query
$query = "INSERT INTO `comments` ( `discussion`, `user_name`, `date_time`, `commentary`)
				VALUES ({$id_mensagem}, '{$nome}', '{$time_stamps}','{$mensagem}')";

$query2 = "UPDATE `discussion` SET `ammount_subcomment` = (SELECT COUNT(discussion) 
					FROM comments WHERE `comments`.`discussion` = $id_mensagem)
					WHERE `discussion`.`id_discussion` = $id_mensagem";

					
try {
		// Tenta inserir as informações enviadas
		$salvar = $conecta->prepare($query);
		$salvar->execute(array());
		$salvar = $conecta->prepare($query2);
		$salvar->execute(array());
	// Caso de erro, informa o erro ocorrido ao salvar resposta
} catch (Exception $e) {
	echo 'Erro ao salvar sua resposta: ' . $e;
}
?>
