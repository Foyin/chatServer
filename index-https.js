// Setup basic express server
var fs = require('fs');
var express = require('express');
var session = require('express-session');
var path = require('path');
var multer  = require('multer')
var storage = multer.memoryStorage()
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var upload = multer({ storage: storage})
app.locals.sslOptions = {
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/primary.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

if (app.locals.sslOptions) {
    var httpOrhttps = require('https');
} else {
    var httpOrhttps = require('http');
}

if (app.locals.sslOptions) {
    var server = httpOrhttps.createServer(app.locals.sslOptions, app);
} else {
    var server = httpOrhttps.createServer(app);
}

var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var shell = require('shelljs');
var seconds = 900000;



server.listen(port, () => {
  console.log('Server listening at port %d', port);

});

/////////////////////////////////////////////////////////////

// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload');

 
// Make your Express server:
app.use(SocketIOFileUpload.router);
app.use(express.static(path.join(__dirname, 'public')));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({secret: 'superSekretHere!',
                 resave: false,
                 saveUninitialized: false,}));
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.locals.pretty = true;  // made Jade HTML pretty
  
    app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	    message: err.message,
	    error: err
	});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function uploadText(req, res) {
    if (req.file) {
      	       req.session.files.push(req.file);
	       req.session.stats.push({name: req.file.originalname,
	   			size: req.file.size});
               createP(toString(theFile));
	       console.log(req.file);
	       console.log("First 80 bytes as text:");
	       console.log(req.file.buffer.toString('utf8',0,80));

               } 
  }

*/

// Chatroom

var numUsers = 0;

io.on('connection',(socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  
  socket.on('drawing', function(data){
    socket.broadcast.emit('drawing', data)
  });
  
 
  /*
  //Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = "/srv/uploads";
    uploader.listen(socket);
 
    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });
 
    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
*/
});


