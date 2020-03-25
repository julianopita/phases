<?php
  // Dados Conexão
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "bimnomads";
try{
    // Tenta realizar a conexão com PDO
  $conecta = new PDO("mysql:host=$servername;dbname=$database", $username , $password);
    // Deixa dados trocados em forma de brasileiro (aceita acentuação)
  $conecta->exec("set names utf8");
  // Caso nao Consiga conexão, retorna o erro
} catch (Exception $e) {
  echo "ERRO: ".$e;
}
?>