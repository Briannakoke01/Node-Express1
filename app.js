const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); 

async function fetchDeveloperData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const { name, bio } = response.data;
    return { name, bio };
  } catch (error) {
    console.error(`Error fetching data for ${username}: ${error.message}`);
    return { name: null, bio: "Error fetching bio" }; 
  }
}

app.post('/', async (req, res) => {
  const { developers } = req.body;

  if (!Array.isArray(developers) || developers.length === 0) {
    return res.status(400).json({ error: "Invalid or empty 'developers' array" });
  }

  try {
    const devData = await Promise.all(developers.map(fetchDeveloperData));
    res.json(devData);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
