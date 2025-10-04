import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Search apps endpoint
app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "No query provided" });

  try {
    const response = await fetch(`https://www.dark-yasiya-api.site/search/playstory?text=${encodeURIComponent(q)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// Download APK endpoint
app.get("/download", async (req, res) => {
  const { appName } = req.query;
  if (!appName) return res.status(400).json({ error: "No app name provided" });

  try {
    const response = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(appName)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch download link" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
