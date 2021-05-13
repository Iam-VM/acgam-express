const addEventRouter = require('express').Router();
const Events = require('../../models/events');


addEventRouter.post('/add', (req, res) => {
    const startDate = req.body.startDate;
    const eventName = req.body.eventName;
    Events.create({
        eventName,
        eventStartDate: startDate,
        addedBy: req.decodedToken.user_id
    })
        .then(() => {
            console.log("added event");
        })
        .catch((err) => {
            console.log(err + "couldn't add event");
        })
});

addEventRouter.get('/fetch-all', (req, res) => {
    Events.findAll({
        attributes: ['id', 'eventName']
    })
        .then((events) => {
            const data = events.map((event) => event.dataValues);
            res.send(data);
        })
        .catch(err => {
            console.log("An error occured during fetching");
        })
});


module.exports = addEventRouter;
