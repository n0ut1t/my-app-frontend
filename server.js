const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// SERVIR FRONTEND
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
});