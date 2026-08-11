// 1. Your Cloudflare Proxy URL
const PROXY_URL = "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fsqorz-proxy.hudsondaley55.workers.dev%2F&data=05%7C02%7C%7C5947025127b5435cc17408def74aef8c%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220098366365157%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=zRhRfsffAnUGcgoocV2XK4RSqGkG7Go24slpUl7iwHg%3D&reserved=0";

// 2. The direct Sqorz URL you want to get data from
const SQORZ_TARGET_URL = "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Four.sqorz.com%2Fjson%2Fevent%2FYOUR_EVENT_DATA_HERE&data=05%7C02%7C%7C5947025127b5435cc17408def74aef8c%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220098366385616%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=8URgXS8ocfYNxSBdes3nm4a%2Fnhg4wWMk2bXS3AWaTI4%3D&reserved=0";

async function loadSqorzData() {
  try {
    // 3. We send the request THROUGH your proxy worker
    const response = await fetch(`${PROXY_URL}?url=${encodeURIComponent(SQORZ_TARGET_URL)}`);

    if (!response.ok) {
      throw new Error(`SQORZ returned ${response.status}`);
    }

    const data = await response.json();
    console.log("SQORZ data loaded:", data);

    // Temporary test message on screen
    const message = document.createElement("div");
    message.textContent = "✅ SQORZ DATA CONNECTED!";
    message.style.padding = "15px";
    message.style.margin = "15px";
    message.style.backgroundColor = "#10B981";
    message.style.color = "white";
    message.style.borderRadius = "8px";
    document.body.prepend(message);

  } catch (error) {
    console.error("Error loading Sqorz data:", error);

    // Error message on screen
    const message = document.createElement("div");
    message.textContent = "❌ SQORZ CONNECTION FAILED: " + error.message;
    message.style.padding = "15px";
    message.style.margin = "15px";
    message.style.backgroundColor = "#EF4444";
    message.style.color = "white";
    message.style.borderRadius = "8px";
    document.body.prepend(message);
  }
}

// Call the function when the page loads
loadSqorzData();
> On 11 Aug 2026, at 11:45 am, Hudson Daley <hudsondaley55@outlook.com> wrote:
>
> ﻿export default {
>  async fetch(request) {
>    // 1. Handle browser preflight CORS checks
>    if (request.method === "OPTIONS") {
>      return new Response(null, {
>        headers: {
>          "Access-Control-Allow-Origin": "*",
>          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
>          "Access-Control-Allow-Headers": "*",
>        },
>      });
>    }
>
>    // 2. Extract target URL passed in the query parameter (?url=...)
>    const url = new URL(request.url);
>    const targetUrl = url.searchParams.get("url");
>
>    if (!targetUrl) {
>      return new Response("Missing 'url' query parameter.", { status: 400 });
>    }
>
>    try {
>      // 3. Fetch data from Sqorz
>      const response = await fetch(targetUrl, {
>        headers: {
>          "User-Agent": "BMX-Performance-Tracker",
>        },
>      });
>
>      const body = await response.text();
>
>      // 4. Return data with CORS headers
>      return new Response(body, {
>        status: response.status,
>        headers: {
>          "Content-Type": "application/json; charset=utf-8",
>          "Access-Control-Allow-Origin": "*",
>          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
>        },
>      });
>    } catch (err) {
>      return new Response(JSON.stringify({ error: err.message }), {
>        status: 500,
>        headers: {
>          "Content-Type": "application/json",
>          "Access-Control-Allow-Origin": "*",
>        },
>      });
>    }
>  },
> };
>>
>> On 11 Aug 2026, at 10:47 am, Hudson Daley <hudsondaley55@outlook.com> wrote:
>>
>> ﻿const SQORZ_EVENT_URL =
>>   "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Four.sqorz.com%2Fjson%2Fevent%2F6a06bedb106401f621fe2662&data=05%7C02%7C%7C5947025127b5435cc17408def74aef8c%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220098366398560%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=DuKHS0%2FZ98sRLdODiXyKpwuyfzrEfiHuLMC%2B5kXyAGQ%3D&reserved=0";
>>
>> async function loadSqorzData() {
>>   try {
>>       const response = await fetch(SQORZ_EVENT_URL);
>>
>>       if (!response.ok) {
>>           throw new Error(`SQORZ returned ${response.status}`);
>>       }
>>
>>       const data = await response.json();
>>
>>       console.log("SQORZ data loaded:", data);
>>
>>       // Temporary test message
>>       const message = document.createElement("div");
>>       message.textContent = "✅ SQORZ DATA CONNECTED!";
>>       message.style.padding = "15px";
>>       message.style.margin = "15px";
>>       message.style.background = "green";
>>       message.style.color = "white";
>>       message.style.fontWeight = "bold";
>>       message.style.textAlign = "center";
>>
>>       document.body.prepend(message);
>>
>>       return data;
>>
>>   } catch (error) {
>>       console.error("Could not load SQORZ data:", error);
>>
>>       const message = document.createElement("div");
>>       message.textContent = "❌ SQORZ CONNECTION FAILED: " + error.message;
>>       message.style.padding = "15px";
>>       message.style.margin = "15px";
>>       message.style.background = "red";
>>       message.style.color = "white";
>>       message.style.fontWeight = "bold";
>>
>>       document.body.prepend(message);
>>
>>       return null;
>>   }
>> }
>>
>> loadSqorzData();
>>>
>>>> On 11 Aug 2026, at 10:41 am, Hudson Daley <hudsondaley55@outlook.com> wrote:
>>>
>>> ﻿<script src="data.js"></script>
>>> <script src="sqorz.js"></script>
>>>
>>>
>>>
>>>>> On 11 Aug 2026, at 10:38 am, Hudson Daley <hudsondaley55@outlook.com> wrote:
>>>>
>>>> ﻿const SQORZ_EVENT_URL =
>>>> "https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Four.sqorz.com%2Fjson%2Fevent%2F6a06bedb106401f621fe2662&data=05%7C02%7C%7C5947025127b5435cc17408def74aef8c%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639220098366413839%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=gRLy%2F88S363f%2BqWGSAK%2ByqwHlMseOVoPoGU5EK1gBE0%3D&reserved=0";
