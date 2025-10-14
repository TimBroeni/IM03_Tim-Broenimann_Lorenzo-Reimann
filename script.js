/*   ===================================STUNDEN RUNDEN========================================= */

function floorToHour(date) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}


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
      console.log("Angezeigter Server:", randomserver);

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
        .filter(item => new Date(item.timestamp) >= new Date(Date.now() - 24 * 60 * 60 * 1000)) // nur die letzten 24 Stunden
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      if (serverData.length === 0) {
        console.warn("Keine Daten für den gewählten Server:", randomserver);
        return;
      }

      // Nur ein Eintrag pro Stunde
      const hourlyData = [];
      const seenHours = new Set();

      for (const entry of serverData) {
        const date = floorToHour(entry.timestamp); //rundet die Stunden ab
        const hourKey = date.getTime(); // eindeutiger Schlüssel für die Stunde

      if (!seenHours.has(hourKey)) {
          seenHours.add(hourKey);
          hourlyData.push({
            ...entry,
            timestamp: date.toISOString()
          });
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
        pointHoverRadius: 8,
        pointRadius: 4, 
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

// Titel im HTML setzen
const titleElement = document.getElementById("servername");
if (titleElement) {
  titleElement.textContent = randomserver; // Setzt den Text im HTML
}

      // Canvas im HTML abrufen
      const canvas = document.getElementById("sideChartONE");
      if (!canvas) {
        console.error("Fehler: Kein <canvas id='sideChartONE'> im HTML gefunden!");
        return;
      }
      const ctx = canvas.getContext("2d");

      // Daten für den gewählten Server filtern und nach Zeit sortieren
      const serverData = data
        .filter(item => item.nameServer === randomserver)
        .filter(item => new Date(item.timestamp) >= new Date(Date.now() - 24 * 60 * 60 * 1000)) // nur die letzten 24 Stunden
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
      gradient.addColorStop(0.2, 'rgba(82, 165, 53, 0.4)'); // leichteres Grün
      gradient.addColorStop(1, 'rgba(23, 22, 21, 0)'); // unten (transparent)

      // "Style" für den Datensatz definieren
      const datasets = [{
        label: `${randomserver}`,
        data: werte,
        fill: true,                 
        borderColor: "white",
        tension: 0.1,
        backgroundColor: gradient,
        borderWidth: 1.3,
        pointRadius: 0, // Punkte auf der Linie ausblenden
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
          layout: { padding: { top: 10, right: 10, bottom: 12, left: 10 } },
          plugins: { legend: { position: "none" } },
          scales: {
          // X Achse anpassen
            x: {
              display: false,           // X-Achse komplett ausblenden
              grid: {
              display: false,         // keine Gitternetzlinien
              drawTicks: false,       // keine Tick-Markierungen
              drawBorder: false       // keine Achsenlinie
              }
            },
          // Y Achse anpassen
            y: {
              display: false,           // Y-Achse komplett ausblenden
              grid: {
              display: false,
              drawTicks: false,
              drawBorder: false
              }
            }
          },
        },
      });
    })
    .catch((error) => console.error("Fetch-Fehler:", error));
});





/*   ===================================SIDE CHART 2========================================= */

/*   ===================================TITLE SETZEN========================================= */
