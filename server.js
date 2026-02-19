const path = require('path');
const express = require('express');
const { buildApp } = require('./app');

const app = buildApp();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

// SPA用fallback設定 - API以外のすべてのGETリクエストでindex.htmlを返す
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
