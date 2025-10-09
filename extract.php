<?php
function fetchServerData(){
    $urls = [
        "https://mcapi.us/server/status?ip=mc.hypixel.net",
        "https://mcapi.us/server/status?ip=mineplex.com",
        "https://mcapi.us/server/status?ip=play.manacube.com",
        "https://mcapi.us/server/status?ip=gommehd.net"
    ];

    $results = [];
    foreach ($urls as $url) {
        // Initialisiert eine cURL-Sitzung - Verbindung zum Server aufbauen
        $ch = curl_init($url);

        // Setzt Optionen
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Accept: application/json",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) " .
                       "AppleWebKit/537.36 (KHTML, like Gecko) " .
                       "Chrome/118.0.5993.90 Safari/537.36"
        ]);

        // Führt die cURL-Sitzung aus und erhält den Inhalt
        $response = curl_exec($ch);

        // Schließt die cURL-Sitzung
        curl_close($ch);

        // Dekodiert die JSON-Antwort und speichert sie im Ergebnis-Array
        $results[] = json_decode($response, true);
    }

    return $results;
}


// echo '<pre>';
// print_r(fetchServerData());
// echo '</pre>';