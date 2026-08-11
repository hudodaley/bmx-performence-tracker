const SQORZ_EVENT_URL =
  "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Four.sqorz.com%2Fjson%2Fevent%2F6a06bedb106401f621fe2662&data=05%7C02%7C%7Cf067936cc56344873a5108def740d73f%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220055013880721%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=Yhpcxizi6YXYIunaHJOzKd6iJWpyRF10ZN5JtiDHtY0%3D&reserved=0";

async function loadSqorzData() {
    try {
        const response = await fetch(SQORZ_EVENT_URL);

        if (!response.ok) {
            throw new Error(`SQORZ returned ${response.status}`);
        }

        const data = await response.json();

        console.log("SQORZ data loaded:", data);

        return data;
    } catch (error) {
        console.error("Could not load SQORZ data:", error);
        return null;
    }
}
