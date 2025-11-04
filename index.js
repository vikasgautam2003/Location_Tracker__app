const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();


const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

io.on("connection", (socket) => {

    console.log("✅ New user connected:", socket.id);
    socket.on("locationUpdate", function(data) {
        io.emit("Received-location", {id: socket.id, ...data})
    })
});



app.get('/config', (req, res) => {
  res.json({
    mapKey: process.env.ACCESS_KEY
  });
});


app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
