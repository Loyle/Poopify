<?php
header('Content-Type: application/json');

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
		$pl_id = $_POST["pl"];
		$account_id = $_POST["user"];


		$req = $bdd->prepare('SELECT c.* FROM PlaylistContent AS c INNER JOIN Playlist AS p ON c.playlist_id = p.id INNER JOIN Account AS a ON p.account_id = a.id WHERE (p.id = :pl_id AND a.id = :ac_id) OR (p.private = 0 AND p.id = :pl_id)');
		$req->execute(array(":pl_id" => $pl_id,"ac_id" => $account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "getPlaylistByUser") {
		$account_id = $_POST["user"];


		$req = $bdd->prepare('SELECT * FROM Playlist WHERE account_id = ?');
		$req->execute(array($account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "addMusicPlaylist") {
		$req = $bdd->prepare("INSERT INTO PlaylistContent(name, playlist_id, video_id, duration, add_date) VALUES(:name, :playlist_id, :video_id, :duration, :add_date)");
		$req->execute(array(
			':name' => $_POST["name"],
			':playlist_id' => $_POST["playlist_id"],
			':video_id' => $_POST["video_id"],
			':duration' => $_POST["duration"],
			':add_date' => $_POST["add_date"]
		));

		echo json_encode($_POST);
	}
	else if($_POST["function"] == "addPlaylist") {
		$req = $bdd->prepare("INSERT INTO Playlist(name, account_id, private) VALUES(:name, :account_id, :private)");
		$req->execute(array(
			':name' => $_POST["name"],
			':account_id' => $_POST["account_id"],
			':private' => $_POST["private"]
		));

		echo json_encode();
	}
	else if($_POST["function"] == "create") {
		$req = $bdd->prepare("INSERT INTO Account(name, password, birthday, email, country, darkmode, fadeout, volume) VALUES(:name, :pwd, :bdate, :email, :country, :darkmode, :fadeout, :volume)");
		$req->execute(array(
			':name' => $_POST["name"],
			':pwd' => $_POST["pwd"],
			':bdate' => $_POST["bdate"],
			':email' => $_POST["email"],
			':country' => $_POST["country"],
			':darkmode' => 0,
			':fadeout' => 0,
			':volume' => 100
		));

		echo json_encode();
	}
	else {
		// We do nothing
		echo json_encode(array());
	}
}
else {
	header("Location: https://poopify.fr/");
}

?>
