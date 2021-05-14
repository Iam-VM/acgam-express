const sendRouter = require('express').Router();
const fileUpload = require('express-fileupload');
const childProcess = require('child_process');
const path = require('path');
const crypto = require('crypto');
const events = require('../../models/events');
const admin = require('../../firebaseAdmin/admin');

sendRouter.use(fileUpload());


sendRouter.post('/', (req, res) => {
    const {eventID, templateType, recipientType} = req.body;
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
                            const pyProcess = childProcess.spawn('python3', [path.join(__dirname + '/../../scripts/main.py'), templateType, recipientType, eventName, filePath, user._fieldsProto.name.stringValue, email, actionTime, eventID, eventStartDate]);
                            pyProcess.stdout.on('data', (data) => {
                                // TEST
                                console.log(data.toString());
                                switch (data) {
                                    case 'Invalid CSV File':
                                        res.status(415).send("Please input a valid CSV");
                                        break;
                                    default:
                                        break;
                                }
                            });
                            pyProcess.stderr.pipe(process.stderr);
                        })
                        .catch((err) => {
                            console.log("File MV error: " + err);
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
});

sendRouter.get('*', (req, res) => {
    res.redirect('/error404');
});

module.exports = sendRouter;
