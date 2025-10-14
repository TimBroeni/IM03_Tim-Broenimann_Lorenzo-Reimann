/* ============================================================================
   HANDLUNGSANWEISUNG (script.js)
   1) Warte auf DOMContentLoaded, bevor du DOM referenzierst.
   2) Setze apiUrl auf den korrekten Backend-Endpoint (unload.php o. ä.).
   3) Hole Daten asynchron (fetch), prüfe response.ok, parse JSON.
   4) Transformiere Daten für das Chart: labels, datasets je Stadt/Serie bilden.
   5) Initialisiere Chart.js mit Typ (line), data (labels, datasets), options (scales).
   6) Nutze Hilfsfunktionen (z. B. getRandomColor) für visuelle Unterscheidung.
   7) Behandle Fehler (catch) → logge aussagekräftig, zeige Fallback im UI.
   8) Optional: Datum/Uhrzeit schön formatieren (toLocaleDateString/Time).
   9) Performance: große Responses paginieren/filtern; Redraws minimieren.
  10) Sicherheit: Keine geheimen Keys im Frontend; nur öffentliche Endpunkte nutzen.
   ============================================================================ */

/*   ===================================MAIN CHART========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://im03.tim-broenimann.ch/unload.php";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Abgerufene Daten:", data);

      // Zufälligen Server auswählen (Beispiel)
      const servers = ["GommeHD", "Hypixel", "Mineplex", "ManaCube"];
      const randomserver = servers[Math.floor(Math.random() * servers.length)];
      console.log(randomserver);

      // Canvas im HTML abrufen
      const canvas = document.getElementById("apiChart");
      if (!canvas) {
        console.error("Fehler: Kein <canvas id='apiChart'> im HTML gefunden!");
        return;
      }

      const ctx = canvas.getContext("2d");

      // Servernamen finden
      const serverID = [...new Set(data.map(item => item.nameServer))];

      // X-Achse: Zeitstempel
      const labels = [...new Set(data.map(item =>
        new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      ))];

     // Y-Achse: Spielerzahlen nur für den zufälligen Server
const werte = data
  .filter(item => item.nameServer === randomserver)
  .map(item => item.spielerOnline);

const datasets = [{
  label: `${randomserver}`,
  data: werte,
  fill: false,
  borderColor: "white",
  tension: 0.1,
  fill: true,
    backgroundColor: "#52A535",
}];

      // Chart initialisieren
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,   // sonst bleibt Aspect-Ratio fixiert
          layout: {
            padding: { top: 10, right: 15, bottom: 10, left: 10 }
          },

          plugins: {
            legend: { position: "none" },
            // title: { display: true, text: "Aktuelle Spielerzahlen pro Server" },
          },
          scales: {
            y: {
              beginAtZero: true,
              // title: { display: true, text: "Spieler online" },
            },
            x: {
              // title: { display: true, text: "Zeit" },
            },
          },
        },
      });
    })
    .catch((error) => console.error("Fetch-Fehler:", error));

  // Hilfsfunktion: zufällige Farbe erzeugen
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});


/*   ===================================SIDE CHART========================================= */

// document.addEventListener("DOMContentLoaded", () => {
//   const apiUrl = "http://im03.tim-broenimann.ch/unload.php";

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Abgerufene Daten:", data);

//       // Canvas im HTML abrufen
//       const canvas = document.getElementById("apiChart");
//       if (!canvas) {
//         console.error("Fehler: Kein <canvas id='apiChart'> im HTML gefunden!");
//         return;
//       }

//       const ctx = canvas.getContext("2d");

//       // Servernamen finden
//       const serverID = [...new Set(data.map(item => item.serverID))];

//       // X-Achse: Zeitstempel
//       const labels = [...new Set(data.map(item =>
//         new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       ))];

//       // Y-Achse: Spielerzahlen
//       const datasets = serverID.map(server => {
//         const werte = data
//           .filter(item => item.serverID === server)
//           .map(item => item.spielerOnline);

//         return {
//           label: `Server ${server}`,
//           data: werte,
//           fill: false,
//           borderColor: getRandomColor(),
//           tension: 0.1,
//         };
//       });

//       // Chart initialisieren
//       new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: labels,
//           datasets: datasets,
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,   // sonst bleibt Aspect-Ratio fixiert
//           layout: {
//             padding: { top: 10, right: 15, bottom: 10, left: 10 }
//           },
//           plugins: {
//             // legend: { position: "top" },
//             // title: { display: true, text: "Aktuelle Spielerzahlen pro Server" },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               // title: { display: true, text: "Spieler online" },
//             },
//             x: {
//               // title: { display: true, text: "Zeit" },
//             },
//           },
//         },
//       });
//     })
//     .catch((error) => console.error("Fetch-Fehler:", error));

//   // Hilfsfunktion: zufällige Farbe erzeugen
//   function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// });







// Legende komplett wegnehmen:
// scales: {
//             x: {
//               display: false,           // X-Achse komplett ausblenden
//               grid: {
//                 display: false,         // keine Gitternetzlinien
//                 drawTicks: false,       // keine Tick-Markierungen
//                 drawBorder: false       // keine Achsenlinie
//               }
//             },
//             y: {
//               display: false,           // Y-Achse komplett ausblenden
//               grid: {
//                 display: false,
//                 drawTicks: false,
//                 drawBorder: false
//               }
//             }
//           }