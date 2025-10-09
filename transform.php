<?php

// Bindet das Skript extract.php für Rohdaten ein
// $data = include('extract.php');

require_once 'extract.php'; // lädt die Funktion fetchServerData()

$data = fetchServerData(); // führt die Funktion aus und bekommt das Array


// Liste der Servernamen in derselben Reihenfolge wie in extract.php
$serverNames = ['Hypixel', 'Mineplex', 'Manacube', 'GommeHD'];

$servers = []; // Hier speichern wir alles als assoziatives Array

foreach ($serverNames as $index => $name) {
    // Prüfen, ob Daten existieren (zur Sicherheit)
    if (!isset($data[$index])) {
        $servers[$name] = [
            'statusServer' => 'Offline',
            'spielerOnline' => 0,
            'spielerMax' => 0
        ];
        continue;
    }

    // Online-Status prüfen
    $online = $data[$index]['online'] ?? false;

    // Spielerzahlen holen (mit Fallbacks)
    $now = $data[$index]['players']['now'] ?? 0;
    $max = $data[$index]['players']['max'] ?? 0;

    // Wenn max = 0 → Server ist offline, da der Server aktuell gewartet wird
    if ($max === 0) {
        $online = false;
    }

    // Alles als assoziatives Array speichern
    $servers[$name] = [
        'id' => $data[$index]['id'] ?? null,    
        'statusServer' => $online ? 'Online' : 'Offline',
        'spielerOnline' => $now,
        'spielerMax' => $max
    ];
}
// JSON-kodierte Ausgabe der Serverdaten
return json_encode($servers, JSON_UNESCAPED_UNICODE);

// Ausgabe
// echo '<pre>';
// print_r($servers);
// echo '</pre>';









// function getServer($serverIndex) {
//     $serverOnlineStatus = $data[$serverIndex]['online'] ?
//     'Online' : 'Offline';
// return $serverOnlineStatus;
// }




// $serverOnlineStatus = getServer(0);
// $spielerTotalHypixel = $data[0]['players']['max'];
// $spielerOnlineHypixel = $data[0]['players']['now'];

// $serverOnlineStatus = getServer(1);
// $spielerTotalMineplex = $data[1]['players']['max'];
// $spielerOnlineMineplex = $data[1]['players']['now'];

// $serverOnlineStatus = getServer(2);
// $spielerTotalManacube = $data[2]['players']['max'];
// $spielerOnlineManacube = $data[2]['players']['now'];

// $serverOnlineStatus = getServer(3);
// $spielerTotalGommeHD = $data[3]['players']['max'];
// $spielerOnlineGommeHD = $data[3]['players']['now'];




// echo "Hypixel: $spielerOnlineHypixel / $spielerTotalHypixel Spieler<br>";
// echo "Mineplex: $spielerOnlineMineplex / $spielerTotalMineplex Spieler<br>";
// echo "Manacube: $spielerOnlineManacube / $spielerTotalManacube Spieler<br>";
// echo "GommeHD: $spielerOnlineGommeHD / $spielerTotalGommeHD Spieler<br>";

// echo $serverOnlineHypixel ? "Hypixel ist online<br>" : "Hypixel ist offline<br>";
// echo $serverOnlineMineplex ? "Mineplex ist online<br>" : "Mineplex ist offline<br>";
// echo $serverOnlineManacube ? "Manacube ist online<br>" : "Manacube ist offline<br>";
// echo $serverOnlineGommeHD ? "GommeHD ist online<br>" : "GommeHD ist offline<br>";




// if modt = irgend en text ( ungleich null ) dann server offline