const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN; 

export async function apiRequest(api, method = "GET", body = null) {
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
  const res = await fetch(`${API_URL}${api}`, options);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Laravel API Error: ${res.status} - ${error}`);
  }

  return res.json();
}
