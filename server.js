var connect = require('connect'),
    parse = require('url').parse,
    querystring = require('querystring').parse,
    ws = require(__dirname + '/websocket-server'),
    connections = [],
    connected = 0;

function router(app) {
  app.get('/test', function (req, res, next) {
    var url = parse(req.url);

    socket.broadcast(url.query);
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Your message has been posted\n');
  });

  app.post('/test', function (req, res, next) {
    socket.broadcast(req.rawBody);
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Your message has been posted\n');
  });
}

var server = connect.createServer(
  connect.bodyParser(),
  //connect.logger(),
  connect.static(__dirname + '/public'),
  connect.router(router)
);

var socket = ws.createServer({
  server: server
});

socket.addListener('listening', function(){
  console.log('Socket ready on ' + process.ARGV[2]);
});

// Handle WebSocket Requests
socket.addListener('connection', function(conn){
  connected++;
  socket.broadcast('Connected users: ' + connected);
  
  conn.addListener('message', function(message){
    socket.broadcast(message);
  });

  conn.addListener('close', function(conn){
    connected--;
    socket.broadcast('User left, connected now: ' + connected);
  });
});

console.log('Listening on ' + (process.ARGV[2] || 80));
server.listen(parseInt(process.ARGV[2]) || 80);
