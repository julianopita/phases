<?php
//header('Access-Control-Allow-Origin: *');
	// Inclui arquivo de conexao
include('conexao.php');

//if (session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
//} 
	// Cria as variáveis com os atravez da session
$nome = $_SESSION['user_name'];
$react = $_POST["react"];
$id = $_POST["id"];
$tipo = $_POST["tipo"];
  
// Cria query
    // Tipo 1 - Serve para inserir um novo like ou dislike em um comentario
  if($tipo == 1){
    $query = "INSERT INTO `reactions` ( id_discussion, user_name, $react)
    VALUES ({$id}, '{$nome}','{$react}')";    
  }
    // Tipo 2 - Serve para remover um like ou dislike de um comentario
  if($tipo == 2){
    $query = "DELETE FROM reactions 
             WHERE user_name = '{$nome}' AND id_discussion = $id AND $react != '' LIMIT 1 ";
  }

  // Atualiza a tabela de discussions com os novos dados das reacts
$query2 = "UPDATE discussion 
SET discussion.likes = (SELECT COUNT(likes) FROM reactions WHERE reactions.id_discussion = $id AND likes != ''),
discussion.dislikes = (SELECT COUNT(dislikes) FROM reactions WHERE reactions.id_discussion = $id AND dislikes != '') 
WHERE discussion.id_discussion = $id";

					
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
