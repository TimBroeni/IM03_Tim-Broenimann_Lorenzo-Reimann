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

      // Zufälligen Server auswählen
      const servers = ["GommeHD", "Hypixel", "Mineplex", "ManaCube"];
      const randomserver = servers[Math.floor(Math.random() * servers.length)];
      console.log("Gewählter Server:", randomserver);

      // Canvas im HTML abrufen
      const canvas = document.getElementById("apiChart");
      if (!canvas) {
        console.error("Fehler: Kein <canvas id='apiChart'> im HTML gefunden!");
        return;
      }
      const ctx = canvas.getContext("2d");

      // Daten für den gewählten Server filtern und nach Zeit sortieren
      const serverData = data
        .filter(item => item.nameServer === randomserver)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      if (serverData.length === 0) {
        console.warn("Keine Daten für den gewählten Server:", randomserver);
        return;
      }

      // Nur ein Eintrag pro Stunde
      const hourlyData = [];
      const seenHours = new Set();

      for (const entry of serverData) {
        const date = new Date(entry.timestamp);
        const hourKey = date.getHours(); // nur die Stunde (0–23)

      if (!seenHours.has(hourKey)) {
          seenHours.add(hourKey);
          hourlyData.push(entry);
        }
      }

      // X-Achse + Y-Achse aus denselben Einträgen erstellen
      const labels = hourlyData.map(item =>
        new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const werte = hourlyData.map(item => item.spielerOnline);

      // Verlauf für den Hintergrund erstellen
      const gradientHeight = canvas.clientHeight || 400; // Fallback, falls clientHeight 0 ist
      const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
      gradient.addColorStop(0, 'rgba(82, 165, 53, 1)'); // oben (kräftig)
      gradient.addColorStop(1, 'rgba(23, 22, 21, 0)'); // unten (transparent)

      // "Style" für den Datensatz definieren
      const datasets = [{
        label: `${randomserver}`,
        data: werte,
        fill: true,                 
        borderColor: "white",
        tension: 0.3,
        backgroundColor: gradient,
        borderWidth: 2,
      }];

      // Chart initialisieren
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: datasets,
        },
        // Chart designen
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 15, right: 15, bottom: 2, left: 2 } },
          plugins: { legend: { position: "none" } },
          scales: {
            // Y Achse anpassen
            y: { 
              beginAtZero: true,
              grid: {
              lineWidth: 0.2,
              color: 'rgba(255, 255, 255, 1)',
              },
              ticks: { 
                color: 'white' 
              },
              title: {
                display: true,
                text: 'Online Players',
                color: 'white',
                font: {
                  size: 14,
                  fontFamily: 'noto-sans',
                },
              },
            },
            // X Achse anpassen
            x: {
              grid: {
                display: false,
              },
              ticks: { 
                color: 'white' 
              },
              // title: {
              //   display: true,
              //   text: 'Time',
              //   color: 'white',
              //   font: {
              //     size: 14,
              //     fontFamily: 'noto-sans, sans-serif',
              //   },
              // },              
            }
          },
        },
      });
    })
    .catch((error) => console.error("Fetch-Fehler:", error));
});




/*   ===================================SIDE CHART========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://im03.tim-broenimann.ch/unload.php";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Abgerufene Daten:", data);

      // Zufälligen Server auswählen
      const servers = ["GommeHD", "Hypixel", "Mineplex", "ManaCube"];
      const randomserver = servers[Math.floor(Math.random() * servers.length)];
      console.log("Gewählter Server:", randomserver);

      // Canvas im HTML abrufen
      const canvas = document.getElementById("apiChart");
      if (!canvas) {
        console.error("Fehler: Kein <canvas id='apiChart'> im HTML gefunden!");
        return;
      }
      const ctx = canvas.getContext("2d");

      // Daten für den gewählten Server filtern und nach Zeit sortieren
      const serverData = data
        .filter(item => item.nameServer === randomserver)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      if (serverData.length === 0) {
        console.warn("Keine Daten für den gewählten Server:", randomserver);
        return;
      }

      // Nur ein Eintrag pro Stunde
      const hourlyData = [];
      const seenHours = new Set();

      for (const entry of serverData) {
        const date = new Date(entry.timestamp);
        const hourKey = date.getHours(); // nur die Stunde (0–23)

      if (!seenHours.has(hourKey)) {
          seenHours.add(hourKey);
          hourlyData.push(entry);
        }
      }

      // X-Achse + Y-Achse aus denselben Einträgen erstellen
      const labels = hourlyData.map(item =>
        new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const werte = hourlyData.map(item => item.spielerOnline);

      // Verlauf für den Hintergrund erstellen
      const gradientHeight = canvas.clientHeight || 400; // Fallback, falls clientHeight 0 ist
      const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
      gradient.addColorStop(0, 'rgba(82, 165, 53, 1)'); // oben (kräftig)
      gradient.addColorStop(1, 'rgba(23, 22, 21, 0)'); // unten (transparent)

      // "Style" für den Datensatz definieren
      const datasets = [{
        label: `${randomserver}`,
        data: werte,
        fill: true,                 
        borderColor: "white",
        tension: 0.3,
        backgroundColor: gradient,
        borderWidth: 2,
      }];

      // Chart initialisieren
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: datasets,
        },
        // Chart designen
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 15, right: 15, bottom: 2, left: 2 } },
          plugins: { legend: { position: "none" } },
          scales: {
            // Y Achse anpassen
            y: { 
              beginAtZero: true,
              grid: {
              lineWidth: 0.2,
              color: 'rgba(255, 255, 255, 1)',
              },
              ticks: { 
                color: 'white' 
              },
              title: {
                display: true,
                text: 'Online Players',
                color: 'white',
                font: {
                  size: 14,
                  fontFamily: 'noto-sans',
                },
              },
            },
            // X Achse anpassen
            x: {
              grid: {
                display: false,
              },
              ticks: { 
                color: 'white' 
              },
              // title: {
              //   display: true,
              //   text: 'Time',
              //   color: 'white',
              //   font: {
              //     size: 14,
              //     fontFamily: 'noto-sans, sans-serif',
              //   },
              // },              
            }
          },
        },
      });
    })
    .catch((error) => console.error("Fetch-Fehler:", error));
});







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