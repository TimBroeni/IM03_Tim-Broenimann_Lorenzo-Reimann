<?php

function fetchServerData(){
    $url = 'https://mcapi.us/server/status?ip=gommehd.net';
    // array erstellen mit allen 4 api's drin (unterschiedliche endungen)



    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}
return fetchServerData();




// https://mcapi.us/server/status?ip=mc.hypixel.net
// https://mcapi.us/server/status?ip=mineplex.com
// https://mcapi.us/server/status?ip=play.manacube.com
