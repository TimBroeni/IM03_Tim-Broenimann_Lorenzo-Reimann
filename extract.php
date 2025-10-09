<?php
function fetchServerData(){
    $urls = [
       1 => "https://mcapi.us/server/status?ip=gommehd.net",
       2 => "https://mcapi.us/server/status?ip=mc.hypixel.net",
       3 => "https://mcapi.us/server/status?ip=mineplex.com",
       4 => "https://mcapi.us/server/status?ip=play.manacube.com"
    ];

    $results = [];
    foreach ($urls as $id => $url) {
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
        $server = json_decode($response, true);
        $server['id'] = $id; // Fügt die ID hinzu
        $results[] = $server;
    }

    return $results;
}


// echo '<pre>';
// print_r(fetchServerData());
// echo '</pre>';