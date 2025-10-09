<?php

// Bindet das Skript extract.php für Rohdaten ein
// $data = include('extract.php');

require_once 'extract.php'; // lädt die Funktion fetchServerData()

$data = fetchServerData(); // führt die Funktion aus und bekommt das Array

$serverStatus = $data['online'];
$transformedServerStatus = [
    'true' => 'Online',
    'false' => 'Offline'
];



$serverOnlineHypixel = $data[0] ['online'];
$spielerTotalHypixel = $data[0]['players']['max'];
$spielerOnlineHypixel = $data[0]['players']['now'];

$serverOnlineMineplex = $data[1] ['online'];
$spielerTotalMineplex = $data[1]['players']['max'];
$spielerOnlineMineplex = $data[1]['players']['now'];

$serverOnlineManacube = $data[2] ['online'];
$spielerTotalManacube = $data[2]['players']['max'];
$spielerOnlineManacube = $data[2]['players']['now'];

$serverOnlineGommeHD = $data[3] ['online'];
$spielerTotalGommeHD = $data[3]['players']['max'];
$spielerOnlineGommeHD = $data[3]['players']['now'];

echo "Hypixel: $spielerOnlineHypixel / $spielerTotalHypixel Spieler<br>";
echo "Mineplex: $spielerOnlineMineplex / $spielerTotalMineplex Spieler<br>";
echo "Manacube: $spielerOnlineManacube / $spielerTotalManacube Spieler<br>";
echo "GommeHD: $spielerOnlineGommeHD / $spielerTotalGommeHD Spieler<br>";

echo $serverOnlineHypixel ? "Hypixel ist online<br>" : "Hypixel ist offline<br>";
echo $serverOnlineMineplex ? "Mineplex ist online<br>" : "Mineplex ist offline<br>";
echo $serverOnlineManacube ? "Manacube ist online<br>" : "Manacube ist offline<br>";
echo $serverOnlineGommeHD ? "GommeHD ist online<br>" : "GommeHD ist offline<br>";




// if modt = irgend en text ( ungleich null ) dann server offline