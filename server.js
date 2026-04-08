const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Serve the built React atmospheric app at /react/
app.use('/react', express.static(path.join(__dirname, 'dist')));

// SPA fallback — any /react/* route serves the React app's index.html
app.get('/react/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NySa Design Sandbox running on port ${PORT}`);
});
