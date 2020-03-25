<?php
	//	Inclui arquivo de conexao
include('conexao.php');

	//cria a query para buscar as mensagens
$query = 'SELECT `id_discussion`, `user_name`, `relation`, `date_time`, `project_id`, `likes`, 
				`dislikes`, `ammount_subcomment`, `discussion`
				FROM discussion ORDER BY id_discussion DESC';
try {
		// Tenta buscar informações no banco
	$consulta = $conecta->prepare($query);
	$consulta->execute(array());
	$resultadoDaConsulta = $consulta->fetchAll();
	$rows = $consulta -> rowCount();

		// Se encontrada alguma informação, retorna o objeto com JSON das mensagens
	$StringJson = "[";
	if (count($resultadoDaConsulta)) {
		foreach ($resultadoDaConsulta as $registro) {
			if ($StringJson != "[") {
				$StringJson .= ",";
			}
			$StringJson .= '{"id_discussion":"' . $registro['id_discussion'] . '",';
			$StringJson .= '"user_name":"' . $registro['user_name'] . '",';
			$StringJson .= '"relation":"' . $registro['relation'] . '",';
			$StringJson .= '"date_time":"' . $registro['date_time'] . '",';
			$StringJson .= '"project_id":"' . $registro['project_id'] . '",';
			$StringJson .= '"likes":"' . $registro['likes'] . '",';
			$StringJson .= '"dislikes":"' . $registro['dislikes'] . '",';
			$StringJson .= '"subcomment":"' . $registro['ammount_subcomment'] . '",';
			$StringJson .= '"rows":"' . $rows . '",';
			$StringJson .= '"discussion":"' . $registro['discussion'] . '"}';
		}
		echo $StringJson . "]";
	}
	// Caso de erro, retorna o erro ocorrido
} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}
?>