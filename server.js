const path = require('path');
const express = require('express');
const { buildApp } = require('./app');

const app = buildApp();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
