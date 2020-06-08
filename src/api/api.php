<?php
header('Content-Type: application/json');

include_once("bdd.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if($_POST["function"] == "login") {
		$email = $_POST["email"];
		$pwd = hash('sha256',$_POST["pwd"]);

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
	else if($_POST["function"] == "getUserInfo") {
		$account_id = $_POST["user"];

		$req = $bdd->prepare('SELECT a.* FROM Account AS a WHERE a.id = :id');
		$req->execute(array(":id" => $account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "getPlaylistByUser") {
		$account_id = $_POST["user"];


		$req = $bdd->prepare('SELECT * FROM Playlist WHERE account_id = ?');
		$req->execute(array($account_id));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "getTop") {
		$req = $bdd->prepare('SELECT * FROM TOP50');
		$req->execute();
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
			':pwd' => hash('sha256',$_POST["pwd"]),
			':bdate' => $_POST["bdate"],
			':email' => $_POST["email"],
			':country' => $_POST["country"],
			':darkmode' => 0,
			':fadeout' => 0,
			':volume' => 100
		));

		echo json_encode();
	}
	else if($_POST["function"] == "deletePlaylist") {
		$req = $bdd->prepare("DELETE FROM Playlist WHERE id = ?");
		$req->execute(array($_POST["id"]));

		$req = $bdd->prepare("DELETE FROM PlaylistContent WHERE playlist_id = ?");
		$req->execute(array($_POST["id"]));

		echo json_encode();
	}
	else if($_POST["function"] == "deleteMusicFromPlaylist") {
		$req = $bdd->prepare("DELETE FROM PlaylistContent WHERE id = ?");
		$req->execute(array($_POST["id"]));

		echo json_encode();
	}
	else if($_POST["function"] == "updateProfil") {
		$req = $bdd->prepare("UPDATE Account SET name = :name, birthday = :birthday, email = :email, country = :country WHERE id = :id");
		$req->execute(array(
			':name' => $_POST["name"],
			':birthday' => $_POST["birthday"],
			':email' => $_POST["email"],
			':country' => $_POST["country"],
			':id' => $_POST["id"]
		));

		echo json_encode();
	}
	else if($_POST["function"] == "updateFadeout") {
		$req = $bdd->prepare("UPDATE Account SET fadeout = :fadeout WHERE id = :id");
		$req->execute(array(
			':fadeout' => $_POST["fadeout"],
			':id' => $_POST["id"]
		));

		echo json_encode();
	}
	else if($_POST["function"] == "updateVolume") {
		$req = $bdd->prepare("UPDATE Account SET volume = :volume WHERE id = :id");
		$req->execute(array(
			':volume' => $_POST["volume"],
			':id' => $_POST["id"]
		));

		echo json_encode();
	}
	else if($_POST["function"] == "updateDarkmode") {
		$req = $bdd->prepare("UPDATE Account SET darkmode = :darkmode WHERE id = :id");
		$req->execute(array(
			':darkmode' => $_POST["darkmode"],
			':id' => $_POST["id"]
		));


		echo json_encode();
	}
	else if($_POST["function"] == "addLiked") {
		$req = $bdd->prepare("INSERT INTO LikeContent(name, account_id, video_id, duration, add_date) VALUES(:name, :account_id, :video_id, :duration, :add_date)");
		$req->execute(array(
			':name' => $_POST["name"],
			':account_id' => $_POST["account_id"],
			':video_id' => $_POST["video_id"],
			':duration' => $_POST["duration"],
			':add_date' => $_POST["add_date"]
		));

		echo json_encode();
	}
	else if($_POST["function"] == "getLiked") {
		$req = $bdd->prepare('SELECT * FROM LikeContent WHERE account_id = ?');
		$req->execute(array($_POST["account_id"]));

		echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
	}
	else if($_POST["function"] == "removeLiked") {
		$req = $bdd->prepare("DELETE FROM LikeContent WHERE account_id = ? AND video_id = ?");
		$req->execute(array($_POST["account_id"],$_POST["video_id"]));

		echo json_encode();
	}
	else if($_POST["function"] == "addRecent") {
     $req = $bdd->prepare("INSERT INTO RecentContent(name, account_id, video_id, duration, add_date) VALUES(:name, :account_id, :video_id, :duration, :add_date)");
     $req->execute(array(
       ':name' => $_POST["name"],
       ':account_id' => $_POST["account_id"],
       ':video_id' => $_POST["video_id"],
       ':duration' => $_POST["duration"],
       ':add_date' => $_POST["add_date"]
     ));

     echo json_encode();
  }
  else if($_POST["function"] == "getRecent") {
       $req = $bdd->prepare('SELECT * FROM RecentContent WHERE account_id = ? ORDER BY id DESC');
       $req->execute(array($_POST["account_id"]));

       echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
  }
  else if($_POST["function"] == "removeRecent") {
      $req = $bdd->prepare("DELETE FROM RecentContent WHERE id = ?");
      $req->execute(array($_POST["id"]));

      echo json_encode();

  }else if($_POST["function"] == "getNbRecent") {
      $req = $bdd->prepare("SELECT Count(*) FROM RecentContent WHERE account_id = ?");
      $req->execute(array($_POST["account_id"]));

      echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
  }
  else if($_POST["function"]=="getOlderRecent") {
      $req = $bdd->prepare("SELECT * FROM RecentContent WHERE id < (SELECT MAX(id) FROM RecentContent WHERE account_id = ?) AND account_id = ? ORDER BY id ASC LIMIT 1");
       $req->execute(array($_POST["account_id"]));

      echo json_encode($req->fetchAll(PDO::FETCH_ASSOC));
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
