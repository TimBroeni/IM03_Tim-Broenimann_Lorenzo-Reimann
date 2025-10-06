<?php

$data = [
    "firstname" => "Timi",
    "lastname" => "Brönimann",
    "email" => "tim.broenimann@gmail.com"
];
//Datenbank ergänzt mit meinen Daten

require_once 'config.php';

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten --> =========> Hier müssen die Dinger der Datenbank eingefügt werden <=========
    $sql = "INSERT INTO User (firstname, lastname, email) 
    VALUES (?, ?, ?)";
    // =========> ? sind Platzhalter, die später mit Werten ersetzt werden. Es gibt sicherheit für potenzielle Hacker-Angriffe <========



    // Bereitet die SQL-Anweisung vor - "achtung es kommen jetzt Daten"
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    // ========> hier werden die ? mit den Werten aus dem Array ersetzt <=========
  $stmt->execute([
        $data['firstname'],
        $data['lastname'],
        $data['email']
  ]);

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}

//try catch versucht etwas zu machen. Wenn es nicht funktioniert kommt die Fehlermeldung, aka catch --> gibt Fehlermeldungtext
//die sagt dann breche alles ab, wenn es halt nicht funktioniert