const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { buildApp } = require('./app');

const app = buildApp();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

let latestMessage = '';

io.on('connection', (socket) => {
  socket.emit('chat:update', latestMessage);

  socket.on('chat:send', (payload) => {
    const headerMessage =
      typeof payload?.message === 'string' ? payload.message : '';

    if (!headerMessage) return;
    if (headerMessage.length > 200) return;
    // 便宜的にキーワードでcleanup
    if (headerMessage === 'clearAll') {
      latestMessage = '';
      io.emit('chat:update', latestMessage);
      return;
    } else {
      latestMessage += `   ${headerMessage}`;
    }
    io.emit('chat:update', latestMessage);
  });
});

app.use(express.static(path.join(__dirname, '/public')));

// SPA用fallback設定 - API以外のすべてのGETリクエストでindex.htmlを返す
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
