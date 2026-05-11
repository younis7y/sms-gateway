const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMS Gateway Running");
});

app.post("/send", async (req, res) => {
  try {
    const { phone, message } = req.body;

    const response = await axios.post(
      "https://api.taqnyat.sa/v1/messages",
      {
        recipients: [phone],
        body: message,
        sender: "Taqnyat"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TAQNYAT_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
