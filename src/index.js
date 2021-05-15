const express = require('express');
const path = require('path');
const sequelize = require('./sequelizeConfig/config');
const sequelizeAuthenticate = require('./sequelizeConfig/sequelizeInit');


const privateRouter = require('./privateRoutes');


const app = express();
sequelizeAuthenticate(sequelize);
app.use(express.urlencoded());  // To parse URL-encoded bodies
app.use(express.json()); //To parse JSON bodies

app.use(express.static(path.join(__dirname,'../',  'build')));



const PORT = process.env.PORT || 4000;

app.use('/private', privateRouter);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`)
});
