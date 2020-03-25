<?php
//header('Access-Control-Allow-Origin: *');
	// Inclui arquivo de conexao
include('conexao.php');
	// Cria a query para buscar as respostas
$query = 'SELECT `id_comment`,`discussion`,`user_name`, `date_time`, `commentary`, `mod_text` FROM comments';
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
			$StringJson .= '{"id_comment":"' . $registro['id_comment'] . '",';
			$StringJson .= '"discussion":"' . $registro['discussion'] . '",';
			$StringJson .= '"user_name":"' . $registro['user_name'] . '",';
			$StringJson .= '"date_time":"' . $registro['date_time'] . '",';
			$StringJson .= '"commentary":"' . $registro['commentary'] . '",';
			$StringJson .= '"mod_text":"' . $registro['mod_text'] . '"}';
		}
		echo $StringJson . "]";
	}
	// Caso de erro, retorna o erro ocorrido
} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}
?>
