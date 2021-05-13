const csvTemplateRouter = require('express').Router();
const path = require('path');


csvTemplateRouter.get('/:templateName', (req, res) => {
    const templateName = req.params.templateName;
    const requestedFileStatus = [
        "coordinators",
        "participants",
        "winners"
    ].includes(templateName);
    if (!requestedFileStatus) {
        res.status(404).send("Requested resource not found");
    }
    res.download(path.join(__dirname, '../../..', 'fileSystem/csvTemplates', `${templateName}.csv`));
});

csvTemplateRouter.get('*', (req, res) => {
    res.redirect('/error404');
});

module.exports = csvTemplateRouter;
