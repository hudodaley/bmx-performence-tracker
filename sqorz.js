// 1. Cloudflare Proxy URL
const PROXY_URL = "https://sqorz-proxy.hudsondaley55.workers.dev";

// 2. Direct Sqorz Event JSON URL (Replace this string with your real Sqorz link if different)
const SQORZ_TARGET_URL = "https://our.sqorz.com/json/event/6a06bedb106401f621fe2662";

async function loadSqorzData() {
  try {
    // 3. Fetch data through Cloudflare Worker proxy
    const response = await fetch(`${PROXY_URL}?url=${encodeURIComponent(SQORZ_TARGET_URL)}`);

    if (!response.ok) {
      throw new Error(`SQORZ returned HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("SQORZ data loaded:", data);

    // Success UI Banner
    const message = document.createElement("div");
    message.textContent = "✅ SQORZ DATA CONNECTED!";
    message.style.padding = "15px";
    message.style.margin = "15px";
    message.style.backgroundColor = "#10B981";
    message.style.color = "white";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";
    message.style.borderRadius = "8px";
    document.body.prepend(message);

    return data;
  } catch (error) {
    console.error("Could not load SQORZ data:", error);

    // Error UI Banner
    const message = document.createElement("div");
    message.textContent = "❌ SQORZ CONNECTION FAILED: " + error.message;
    message.style.padding = "15px";
    message.style.margin = "15px";
    message.style.backgroundColor = "#EF4444";
    message.style.color = "white";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";
    message.style.borderRadius = "8px";
    document.body.prepend(message);

    return null;
  }
}

// Automatically load data when page runs
loadSqorzData();
