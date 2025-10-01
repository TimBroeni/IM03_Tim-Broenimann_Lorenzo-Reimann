<h1>hallo</h1>

<?php 
//der Server weiss, dass hier php beginnt

//Variable:
$name = "Timi";
//in js: let name = Timi

//Zeichenketten ausgeben:

echo $name; //dies sollte jetzt auf der Webseite stehen

echo '<br>'; //unterbruch separat machen, ansonsten ist alles aneinander

$a = 2;
$b = 5;

echo $a + $b;

?> php geschlossen, dieser Text wird als HTML interpretiert
<h4> $name sagt nur $name. Ich muss also php öffnen um zu schreiben: <?php echo $name ?> sagt jetzt Timi</h4>


<?php
// Array

$banane = ['mamma banane', 'papa bnane'];

echo '<pre>';
print_r ($banane);
echo '</pre>';

//⬆️ array wird schön ausgegeben und dargestellt --> wie console.log in js (einfach etw ausgeben)

foreach($banane as $item){
    echo $item . '<br>';
}

//in php braucht man ein . um eine zusätzliche aufgabe aufzugeben. In js wäre es + 


// assoziative arrays nutzt man um den index des Arrays anzusprechen
$standorte = [
    'chur' => 15.4,
    'züri' => 20,
    'bern' => -1
];

echo '<pre>';
print_r ($standorte);
echo '</pre>';

foreach ($standorte as $key => $standort){
    echo $standort . '/' . $key . '<br>';
}

//Key ist freiwählbarer begriff. Kann auch "Ort" sein, dass es einfacher ist und mehr lesbar ist. Auch standort kann als Temp angegeben werden
