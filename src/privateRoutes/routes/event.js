const addEventRouter = require('express').Router();
const Events = require('../../models/events');
const crypto = require('crypto');


addEventRouter.post('/add', (req, res) => {
    const startDate = req.body.startDate;
    const eventName = req.body.eventName;
    const id = crypto.randomBytes(8).toString('hex');
    Events.create({
        id: id,
        eventName: eventName,
        eventStartDate: startDate,
        addedBy: req.decodedToken.user_id
    })
        .then(() => {
            console.log("added event");
            res.status(200).send("Event added successfully");
        })
        .catch((err) => {
            console.log(err + "couldn't add event");
            res.status(500).send("Sorry, there was a problem");
        })
});

addEventRouter.get('/fetch-all', (req, res) => {
    Events.findAll({
        attributes: ['id', 'eventName']
    })
        .then((events) => {
            const data = events.map((event) => event.dataValues);
            res.status(200).send(data);
        })
        .catch(err => {
            console.log("An error occurred during fetching events\n----------------------");
            console.log(err);
            console.log('\n----------------------');
            res.status(500).send("Server error");
        })
});


module.exports = addEventRouter;
