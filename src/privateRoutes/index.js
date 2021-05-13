const privateRouter = require('express').Router();
const authVerify = require('../middlewares/authVerify')
const csvTemplateRouter = require('./routes/csvTemplate');
const sendRouter = require('./routes/send');
const eventRouter = require('./routes/event');


privateRouter.use(authVerify);
privateRouter.use('/csv-template', csvTemplateRouter);
privateRouter.use('/event', eventRouter);
privateRouter.use('/send', sendRouter);


privateRouter.get('*', (req, res) => {
    res.redirect('/error404');
});


module.exports = privateRouter;
