const SQORZ_EVENT_URL =
    "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Four.sqorz.com%2Fjson%2Fevent%2F6a06bedb106401f621fe2662&data=05%7C02%7C%7C813bc130fecd4b79e7f308def7420db5%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220060221425257%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=mnwh8EvFP31aRzrZ6QJomfi4YRWNDTeSPIqyftVySr0%3D&reserved=0";

async function loadSqorzData() {
    try {
        const response = await fetch(SQORZ_EVENT_URL);

        if (!response.ok) {
            throw new Error(`SQORZ returned ${response.status}`);
        }

        const data = await response.json();

        console.log("SQORZ data loaded:", data);

        // Temporary test message
        const message = document.createElement("div");
        message.textContent = "✅ SQORZ DATA CONNECTED!";
        message.style.padding = "15px";
        message.style.margin = "15px";
        message.style.background = "green";
        message.style.color = "white";
        message.style.fontWeight = "bold";
        message.style.textAlign = "center";

        document.body.prepend(message);

        return data;

    } catch (error) {
        console.error("Could not load SQORZ data:", error);

        const message = document.createElement("div");
        message.textContent = "❌ SQORZ CONNECTION FAILED: " + error.message;
        message.style.padding = "15px";
        message.style.margin = "15px";
        message.style.background = "red";
        message.style.color = "white";
        message.style.fontWeight = "bold";

        document.body.prepend(message);

        return null;
    }
}

loadSqorzData();
