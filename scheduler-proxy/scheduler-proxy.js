import https from "https";
import http from "http";
import { URL } from "url";

export const handler = async (event) => {
  const url = event.url;
  const method = event.method || "GET";
  const headers = event.headers || { "Content-Type": "application/json" };
  const body = event.body ? JSON.stringify(event.body) : null;

  const parsedUrl = new URL(url);
  const client = parsedUrl.protocol === "https:" ? https : http;

  const options = {
    method,
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = client.request(options, (res) => {
      console.log("→ URL:", url);
      console.log("→ STATUS CODE:", res.statusCode);
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("→ RESPONSE BODY:", data); // Muestra el cuerpo de la respuesta
        resolve({
          statusCode: res.statusCode,
          body: data,
        });
      });
    });

    req.on("error", (err) => {
      console.error("❌ REQUEST ERROR invoking:", url);
      console.error("❌ REQUEST ERROR:", err); // Muestra errores si ocurren
      reject(err);
    });

    if (body) req.write(body);
    req.end();
  });
};
