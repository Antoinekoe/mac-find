import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${q}, France&format=json&limit=5&country_codes=fr`,
      {
        headers: {
          "User-Agent": "MacFind/1.0",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
