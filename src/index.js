const express = require('express');
const path = require('path');
const sequelize = require('./sequelizeConfig/config');
const sequelizeAuthenticate = require('./sequelizeConfig/sequelizeInit');
const socketIO = require('socket.io');
const admin = require('./firebaseAdmin/admin.js');

const privateRouter = require('./privateRoutes');


const app = express();
const httpServer = require('http').createServer(app);
const io = socketIO(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

const firestore = admin.firestore();

io.use((socket, next) => {
    const uid = socket.handshake.auth.userID;
    if (!uid) {
        return next(new Error("unauthenticated socket"));
    }
    socket.uid = uid;
    next();
});

io.on("connection", socket => {
    firestore.collection('users').doc(socket.handshake.auth.userID).get()
        .then((user) => {
            console.log(`${user.uid} Connected...`);
        })
        .catch(err => {
            console.log(`--------------\nCouldn't real-time connect ${socket.auth}\nReason: ${err}--------------\n`);
        })

    socket.on("disconnect", () => {
        console.log(`${socket.auth} Disconnected...`);
    });
});


sequelizeAuthenticate(sequelize);
app.use(express.urlencoded());  // To parse URL-encoded bodies
app.use(express.json()); //To parse JSON bodies

app.use(express.static(path.join(__dirname,'../',  'build')));

app.use("*", (req, res, next) => {
    req.io = io;
    next();
});


const PORT = process.env.PORT || 4000;


app.use('/private', privateRouter);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


httpServer.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`)
});
