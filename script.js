/*   ===================================FUNKTIONEN / VARIABELN========================================= */

  const servers = ["GommeHD", "Hypixel", "Mineplex", "ManaCube"];

  const chartInstances = new Map();

// Funktion, um Uhrzeit auf die volle Stunde zu runden
function floorToHour(date) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}


/*   ===================================FETCH========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://im03.tim-broenimann.ch/unload.php";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log("Abgerufene Daten:", data);

      // Zufälligen Server auswählen
      const randomserver = servers[Math.floor(Math.random() * servers.length)];

      displayServers(randomserver);

      

      /* ===================================DISPLAY SERVER FUNKTION========================================= */

      function displayServers(mainServer) {
      // console.log("Angezeigter Server:", randomserver);
      createChart(mainServer, "mainChart", "main");


      let otherServers = servers.filter((s) => s !== mainServer);
      //console.log("Andere Server:", otherServers);

      const canvasMap = new Map()
      canvasMap.set(0, "ONE");
      canvasMap.set(1, "TWO");
      canvasMap.set(2, "THREE");

      otherServers.forEach((server, index) => {
        // console.log(index + " " + server);
        const canvasID = "sideChart" + canvasMap.get(index);
        createChart(server, canvasID, "side");
        
        // Server Klickbar machen
        const serverDiv = document.getElementById(`TotalSideChart${canvasMap.get(index)}`);
        serverDiv.style.cursor = "pointer";
        serverDiv.addEventListener("click", () => {
          displayServers(server);
        });
      });
    }

      /*   ===================================FUNKTION CHART========================================= */

      function createChart(serverName, canvasId, selectedMode) {

        const canvas = document.getElementById(canvasId);

        // Falls bereits ein Chart auf diesem Canvas existiert → zuerst zerstören
        if (chartInstances.has(canvasId)) {
          chartInstances.get(canvasId).destroy();
          chartInstances.delete(canvasId);
        }

        const ctx = canvas.getContext("2d");

        const gradientHeight = canvas.clientHeight || 400; // Fallback, falls clientHeight 0 ist
        const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);

        // Objekt, um Design zwischen main und side Chart abzuspeichern
        const mode = {
          main: {
            //Farbverlauf für den Hintergrund erstellen
            gradientPrimaryColor: gradient.addColorStop(0, 'rgba(82, 165, 53, 1)'), // oben (kräftig)
            gradientSecondaryColor: gradient.addColorStop(1, 'rgba(23, 22, 21, 0)'), // unten (transparent)

            // "Style" für den Datensatz definieren
            datasets: [{
              tension: 0.3,
              backgroundColor: gradient,
              borderWidth: 2,
              pointHoverRadius: 8,
              pointRadius: 4,
            }],
            layout: { padding: { top: 18, right: 15, bottom: 2, left: 2 } },
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
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'white'
              },
            },
          },


          side: {
            //Farbverlauf für den Hintergrund erstellen
            gradientPrimaryColor: gradient.addColorStop(0, 'rgba(82, 165, 53, 1)'), // oben (kräftig)
            gradientSecondaryColor: gradient.addColorStop(0.2, 'rgba(82, 165, 53, 0.4)'), // leichteres Grün
            gradientTertiaryColor: gradient.addColorStop(1, 'rgba(23, 22, 21, 0)'), // unten (transparent)

            // "Style" für den Datensatz definieren
            datasets: [{
              tension: 0.5,
              backgroundColor: gradient,
              borderWidth: 1.3,
              pointHoverRadius: 0, // Punkte nur beim Hover anzeigen
              pointRadius: 0, // Punkte auf der Linie ausblenden
            }],
            layout: { padding: { top: 8, right: 10, bottom: 10, left: 10 } },
            x: {
              display: false,           // X-Achse komplett ausblenden
              grid: {
                display: false,         // keine Gitternetzlinien
                drawTicks: false,       // keine Tick-Markierungen
                drawBorder: false       // keine Achsenlinie
              }
            },
            y: {
              display: false,           // Y-Achse komplett ausblenden
              grid: {
                display: false,
                drawTicks: false,
                drawBorder: false
              }
            }
          }
        }



        const selectedDesign = mode[selectedMode];

        // Titel der Server in HTML einfügen – aber nur beim Hauptchart
        if (selectedMode === "main") {
          const titleElement = document.getElementById("servername");
          if (titleElement) {
            titleElement.textContent = serverName;
            // console.log("Titel-Element gefunden und gesetzt:", serverName);
          }
        }

        //Titel der Sidecharts in HTML einfügen
        const titleElement = document.getElementById(`title_${canvasId}`);
        if (titleElement) {
          titleElement.textContent = serverName;
        }

        // Daten für den gewählten Server filtern und nach Zeit sortieren
        const serverData = data
          .filter(item => item.nameServer === serverName)
          .filter(item => new Date(item.timestamp) >= new Date(Date.now() - 24 * 60 * 60 * 1000)) // nur die letzten 24 Stunden
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


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


        // X-Achse + Y-Achse definieren
        const labels = hourlyData.map(item =>
          new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        );
        const werte = hourlyData.map(item => item.spielerOnline);
        const werteMax = hourlyData.map(item => item.spielerMax);

        selectedDesign.gradientPrimaryColor;
        selectedDesign.gradientSecondaryColor;
        if (selectedDesign.gradientTertiaryColor) {
          selectedDesign.gradientTertiaryColor;
        }

        // "Style" für den Datensatz definieren
        const datasets = [{
          label: `${serverName}`,
          data: werte,
          fill: true,
          borderColor: "white",
          tension: selectedDesign.datasets[0].tension,
          backgroundColor: selectedDesign.datasets[0].backgroundColor,
          borderWidth: selectedDesign.datasets[0].borderWidth,
          pointHoverRadius: selectedDesign.datasets[0].pointHoverRadius,
          pointRadius: selectedDesign.datasets[0].pointRadius,
        }];

        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "none" } },
            scales: {
              x: selectedDesign.x,
              y: selectedDesign.y
            },
            layout: selectedDesign.layout
          },


        });

        // Instanz speichern
        chartInstances.set(canvasId, chart);
/*   ===================================PLAYERCOUNT========================================= */

        //PlayerCount im Header aktualisieren

        const currentPlayers = werte[werte.length - 1];
        const maxPlayers = werteMax[werteMax.length - 1];

        const playerCountElement = document.getElementById("playercount");

        //PlayerCount nur im Mainchart anzeigen
        if (selectedMode === "main") {

          //console.log(`Aktuelle Spieler auf ${serverName}: ${currentPlayers} / ${maxPlayers}`);

          //Farben des Playercounts ändern
          playerCountElement.innerHTML = `
            <span style="color:#52A535; font-weight:bold;">${currentPlayers}</span>
            <span style="color:#fff;"> / ${maxPlayers}</span>
          `;
        
        

        }
/*   ===================================FOOTER BESCHREIBUNG========================================= */
        if (selectedMode === "main") {
          const footerAktivitaet = currentPlayers;
          const aktivitaetTief = 1000
          const aktivitaetHoch = 5000
          const footerAktivitaetElement = document.getElementById("footerAktivitaet");
          if (footerAktivitaet >= aktivitaetHoch) {
            footerAktivitaetElement.innerHTML = "Here is the party, lots of players online!";
          } else if (footerAktivitaet < aktivitaetHoch && footerAktivitaet >= aktivitaetTief) {
            footerAktivitaetElement.innerHTML = "Something's going on, people are playing...";
          } else {
            footerAktivitaetElement.innerHTML = "Nothing's going on here...";
          }
        }

      }



    })
    .catch((error) => console.error("Fetch-Fehler:", error));
});

