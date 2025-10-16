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