const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

const logoDirectory = path.join(__dirname, 'logos');

app.use(cors());

function isPngFile(filename) {
  return path.extname(filename).toLowerCase() === '.png';
}

app.get('/api/logos/random', (req, res) => {
  fs.readdir(logoDirectory, (err, files) => {
    if (err) {
      res.status(500).json({ message: 'Error reading logo files' });
    } else {
      const pngFiles = files.filter(isPngFile);

      if (pngFiles.length === 0) {
        res.status(404).json({ message: 'No PNG logos found' });
      } else {
        const randomFileName = pngFiles[Math.floor(Math.random() * pngFiles.length)];
        const randomLogo = {
          id: randomFileName.split('.')[0],
          url: `http://localhost:${PORT}/api/logos/${randomFileName.split('.')[0]}`,
        };
        res.json({
          id: randomLogo.id,
          url: randomLogo.url,
        });
      }
    }
  });
});

app.get('/api/logos/:id', (req, res) => {
  const logoId = req.params.id;
  const logoFileName = `${logoId}.png`;
  const logoPath = path.join(logoDirectory, logoFileName);

  fs.access(logoPath, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).json({ message: 'Logo not found' });
    } else {
      res.sendFile(logoPath);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
