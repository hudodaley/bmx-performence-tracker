const PROXY_URL = "https://sqorz-proxy.hudsondaley55.workers.dev";
const SQORZ_TARGET_URL = "https://our.sqorz.com/api/v1/event/6a06bedb106401f621fe2662.json";

// Set the rider name you want to track
const RIDER_NAME = "Hudson Daley"; 

async function loadSqorzData() {
  try {
    const response = await fetch(`${PROXY_URL}?url=${encodeURIComponent(SQORZ_TARGET_URL)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    console.log("SQORZ raw data loaded:", data);

    let bestGate = null;
    let bestLap = null;

    // Search through all classes, rounds, and races for the rider
    if (data.classes && Array.isArray(data.classes)) {
      data.classes.forEach(cls => {
        if (cls.rounds) {
          cls.rounds.forEach(round => {
            if (round.races) {
              round.races.forEach(race => {
                if (race.results) {
                  race.results.forEach(result => {
                    // Check if the rider name matches
                    if (result.name && result.name.toLowerCase().includes(RIDER_NAME.toLowerCase())) {
                      // Grab gate time if available
                      if (result.gate || result.gateTime) {
                        const gate = parseFloat(result.gate || result.gateTime);
                        if (!isNaN(gate) && (bestGate === null || gate < bestGate)) {
                          bestGate = gate;
                        }
                      }
                      // Grab lap time if available
                      if (result.time || result.lapTime) {
                        const lap = parseFloat(result.time || result.lapTime);
                        if (!isNaN(lap) && (bestLap === null || lap < bestLap)) {
                          bestLap = lap;
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    }

    // Display times on screen if elements exist in index.html
    updateDisplay("gate-pb", bestGate);
    updateDisplay("lap-pb", bestLap);

  } catch (error) {
    console.error("Error parsing Sqorz data:", error);
  }
}

function updateDisplay(elementId, value) {
  const el = document.getElementById(elementId);
  if (el && value !== null) {
    el.textContent = value.toFixed(3) + "s";
  }
}

loadSqorzData();
