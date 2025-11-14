export async function apiRequest(endpoint, method = "GET", body = null) {

const API_URL = process.env.API_URL?? "https://manage.tajwaycabs.com/api/";
const API_TOKEN = process.env.API_TOKEN?? "1234567890ABCDEF"; 
if (!API_URL) throw new Error("API_URL is missing!");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": `${API_TOKEN}`,
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
   const finalUrl = `${API_URL}${endpoint}`;

  const res = await fetch(finalUrl, options);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Laravel API Error: ${res.status} - ${error}`);
  }

  return res.json();
}
