const express = require('express');
const path = require('path');
const sequelize = require('./sequelizeConfig/config');
const sequelizeAuthenticate = require('./sequelizeConfig/sequelizeInit');
const socketIO = require('socket.io');

const privateRouter = require('./privateRoutes');


const app = express();
const httpServer = require('http').createServer(app);
const io = socketIO(httpServer);


io.on("connection", socket => {
    console.log("Connected");

    socket.on("disconnect", () => {
        console.log("disconnected");
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
