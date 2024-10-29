const fs = require('fs');
const axios = require('axios');
const path = require('path');

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node urls.js <FILENAME>");
  process.exit(1);
}

fs.readFile(filename, 'utf8', async (err, data) => {
  if (err) {
    console.error(`Error reading file ${filename}:`, err.message);
    process.exit(1);
  }

  const urls = data.split('\n').filter(line => line.trim() !== '');

  await Promise.allSettled(
    urls.map(async (url) => {
      try {
      
        const response = await axios.get(url);
        
       
        const hostname = new URL(url).hostname;
        const outputFile = path.join(__dirname, hostname);

       
        await fs.promises.writeFile(outputFile, response.data);
        console.log(`Wrote to ${hostname}`);
      } catch (error) {
        console.error(`Couldn't download ${url}:`, error.message);
      }
    })
  );
});
