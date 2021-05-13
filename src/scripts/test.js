const childProcess = require('child_process');
const path = require('path');


const eventName = "HeadHunt";
const templateType = "SB Template";
const recipientType = "Participants";
// const filePath = path.join(__dirname, '../..', 'fileSystem', `participants.csv`);
const filePath = path.join(__dirname, 'participants.csv');
const pyProcess = childProcess.spawn('python3', [path.join(__dirname, 'main.py'), templateType, recipientType, eventName, filePath]);
pyProcess.stderr.pipe(process.stderr);
pyProcess.stdout.on('data', (data) => {
    data = data.toString();
    console.log(data);
})
