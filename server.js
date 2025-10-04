// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// 🔹 Search APKs using Keith API
app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "No query provided" });

  try {
    const response = await fetch(`https://apis-keith.vercel.app/apk/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    res.json(data); // data.results contains array of apps with download_link
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// 🔹 Optional: Download APK (proxy to Keith API)
app.get("/download", async (req, res) => {
  const { appUrl } = req.query;
  if (!appUrl) return res.status(400).json({ error: "No app URL provided" });

  try {
    const response = await fetch(`https://apis-keith.vercel.app/download/apk?url=${encodeURIComponent(appUrl)}`);
    const data = await response.json();
    res.json(data); // contains download_link, app name, etc.
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch download link" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
