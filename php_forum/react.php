<?php
header('Access-Control-Allow-Origin: *');
	//inclui arquivo de conexao
include('conexao.php');
	//cria a query
$query = 'SELECT `id_discussion`, `rating` FROM reactions ORDER BY id_discussion';
try {
		//tenta buscar informações no banco
	$consulta = $conecta->prepare($query);
	$consulta->execute(array());
	$resultadoDaConsulta = $consulta->fetchAll();
		//se sim, retorna um json com informações
	$StringJson = "[";
	if (count($resultadoDaConsulta)) {
		foreach ($resultadoDaConsulta as $registro) {
			if ($StringJson != "[") {
				$StringJson .= ",";
			}
			$StringJson .= '{"id_discussion":"' . $registro['id_discussion'] . '",';
			$StringJson .= '"rating":"' . $registro['rating'] . '"}';
		}
		echo $StringJson . "]";
	}
} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}
?>