const sendRouter = require('express').Router();
const fileUpload = require('express-fileupload');
const childProcess = require('child_process');
const path = require('path');
const crypto = require('crypto');
const events = require('../../models/events');
const admin = require('../../firebaseAdmin/admin');

sendRouter.use(fileUpload());

const resolveTemplateName = (templateName) => {
    const validTemplateTypes = [
        "SB Template - Coordinators",
        "SB Template - Participants",
        "SB Template - Volunteers",
        "SB Template - Winners",
        "CS Template - Participants",
        "CS Template - Winners",
        "IAS Template - Participants",
        "IAS Template - Winners",
        "WIE Template - Participants",
        "WIE Template - Winners"
    ];

    if (validTemplateTypes.includes(templateName)) {
        const parts = templateName.split(" - ");
        return ({
            templateType: parts[0],
            recipientType: parts[1],
            isWinner: (parts[1] === "Winners") ? '1' : '0',
        });
    }
    else {
        return false;
    }
};


sendRouter.post('/', (req, res) => {
    res.setTimeout(300000, () => {
        console.log("/send Timeout");
        res.send(408);
    })
    const {eventID, templateName} = req.body;
    const resolvedTemplateName = resolveTemplateName(templateName);
    if (resolvedTemplateName === false) {
        res.status(400).send("Invalid Request");
    }
    else {
        const {templateType, recipientType, isWinner} = resolvedTemplateName;
        const {file} = req.files;
        const {uid, email} = req.decodedToken;
        const dateObj = new Date();
        const actionTime = dateObj.toString();
        const firestore = admin.firestore();
        firestore.collection('users').doc(uid).get()
            .then((user) => {
                events.findByPk(eventID)
                    .then((event) => {
                        const {eventName, eventStartDate} = event.dataValues;
                        const filePath = path.join(__dirname, '../../../', 'fileSystem', `${crypto.randomBytes(4).toString('hex')}${file.name}`);
                        file.mv(filePath)
                            .then(() => {
                                const pyProcess = childProcess.spawn('python3', [path.join(__dirname + '/../../scripts/main.py'), templateType, recipientType, eventName, filePath, user._fieldsProto.name.stringValue, email, actionTime, eventID, eventStartDate, isWinner]);
                                pyProcess.stdout.on('data', (data) => {
                                    data = data.toString();
                                    console.log(data);
                                    if (["CSV File Poorly Formatted", "Certificate Template Not Found", "There was an issue."].includes(data)) {
                                        res.status(200).send(data);
                                    }
                                    else if (data === 'exit') {
                                        res.status(200).send("Action completed successfully. Please Check your email for more info.");
                                    }
                                    else {
                                        req.io.emit("log", `${data}`);
                                    }
                                });

                                pyProcess.stderr.pipe(process.stderr);
                                pyProcess.stderr.on('error', error => {
                                    error = error.toString();
                                    if (["CSV Poorly Formatted", "Cert Template Not Found"].includes(error)) {
                                        res.status(200).send("Some Issues Occurred");
                                    }
                                    res.status(200).send("Some Issues Occurred");
                                });
                            })
                            .catch((err) => {
                                console.log("File MV error: " + err);
                                res.status(500).send("Some Issues Occurred");
                            });
                    })
                    .catch(err => {
                        console.log("Unable to fetch events from Heroku DB\n" + err.toString());
                        res.status(500).send("There was a problem while Processing, please contact Website admin.")
                    });
            })
            .catch(err => {
                console.log("Unable to fetch user data from firestore\n" + err.toString())
                res.status(500).send("There was a problem while Processing, please contact Website admin.")
            })
    }

});

sendRouter.get('*', (req, res) => {
    res.redirect('/error404');
});

module.exports = sendRouter;
