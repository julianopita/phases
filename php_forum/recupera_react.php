<?php
//header('Access-Control-Allow-Origin: *');
	// Inclui arquivo de conexao
include('conexao.php');

//if (session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
//} 
	// Cria as variáveis com os atravez da session
$nome = $_SESSION['user_name'];

	// Cria a query para buscar as respostas
$query = "SELECT * FROM `reactions` WHERE user_name = '{$nome}'";
try {
		// Tenta buscar informações no banco
	$consulta = $conecta->prepare($query);
	$consulta->execute(array());
	$resultadoDaConsulta = $consulta->fetchAll();
		// Se encontrada alguma respostas, retorna um objeto com JSON com as respostas
	$StringJson = "[";
	if (count($resultadoDaConsulta)) {
		foreach ($resultadoDaConsulta as $registro) {
			if ($StringJson != "[") {
				$StringJson .= ",";
			}
			$StringJson .= '{"id_discussion":"' . $registro['id_discussion'] . '",';
			$StringJson .= '"user_name":"' . $registro['user_name'] . '",';
			$StringJson .= '"likes":"' . $registro['likes'] . '",';
			$StringJson .= '"dislikes":"' . $registro['dislikes'] . '"}';
		}
		echo $StringJson . "]";
	}
	// Caso de erro, retorna o erro ocorrido
} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}
?>
