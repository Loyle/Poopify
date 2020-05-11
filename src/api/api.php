<?php
include_once("bdd.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if($_POST["function"] == "login") {
		$email = $_POST["email"];
		$pwd = $_POST["pwd"];

		$req = $bdd->prepare('SELECT * FROM Account AS a WHERE a.email = :email AND a.password = :pwd');
		$req->execute(array(":email" => $email,":pwd" => $pwd));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "getPlaylistById") {
		$pl_id = $_GET["pl"];
		$account_id = $_GET["user"];


		$req = $bdd->prepare('SELECT c.* FROM PlaylistContent AS c INNER JOIN Playlist AS p ON c.playlist_id = p.id INNER JOIN Account AS a ON p.account_id = a.id WHERE (p.id = :pl_id AND a.id = :ac_id) OR (p.private = 0 AND p.id = :pl_id)');
		$req->execute(array(":pl_id" => $pl_id,"ac_id" => $account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "getPlaylistByUser") {
		$account_id = $_GET["user"];


		$req = $bdd->prepare('SELECT * FROM Playlist WHERE account_id = ?');
		$req->execute(array($account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "addMusicPlaylist") {
		$req = $bdd->prepare('INSERT INTO table_name () VALUES (:)');
		$req->execute(array($account_id));
	}
	else {
		header("Location: https://poopify.fr/");
	}
}
else {
	//header("Location: https://poopify.fr/");
	echo json_encode(array('TESST' => "TESTWOW"));
}

?>