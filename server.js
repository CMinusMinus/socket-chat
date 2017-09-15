const express = require('express'),
app = express(),
methodOverride = require('method-override'),
morgan = require('morgan'),
serveStatic = require('serve-static'),
path = require('path'),
http = require('http').Server(app),
io = require('socket.io')(http);

const port = 8080;

io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // TODO
  });
  socket.on('chat message', (msg) => { socket.broadcast.emit('chat message', msg); console.log(`Message from ${msg.name}: ${msg.text}`); });
});

app.use(morgan('dev'));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/', express.static(__dirname + '/build'));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/data', function(req,res) {
  res.send(randomize(theData, 25));
});

http.listen(port, () => console.log('Magic happens on port ' + port));
exports = module.exports = app;