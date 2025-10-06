<?php
function fetchServerData(){
    $url = 'https://mcapi.us/server/status?ip=play.manacube.com';
    // array erstellen mit allen 4 api's drin (unterschiedliche endungen)



    // Initialisiert eine cURL-Sitzung
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

//echo '<pre>';
//print_r ($response);
//echo '</pre>';

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

echo '<pre>';
print_r(fetchServerData());
echo '</pre>';




// https://mcapi.us/server/status?ip=mc.hypixel.net
// https://mcapi.us/server/status?ip=mineplex.com
// https://mcapi.us/server/status?ip=play.manacube.com
// https://mcapi.us/server/status?ip=gommehd.net
