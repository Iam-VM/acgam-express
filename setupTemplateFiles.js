const admin = require('./src/firebaseAdmin/admin');


const bucketRef = admin.storage().bucket(process.env.STORAGE_BUCKET);

const certTemplateFileNames = [
    'certificateTemplates/SB Template Participants.png',
];

const csvTemplateFileNames = [
    'csvTemplates/participants.csv',
    'csvTemplates/coordinators.csv',
    'csvTemplates/winners.csv'
]

const download = (fileName) => {
    const file = bucketRef.file(`${fileName}`);

    const downloadOptions = {
        destination: `fileSystem/${fileName}`
    }

    file.download(downloadOptions)
        .then((x) => {
            console.log("Downloaded " + `/${fileName}` + " from gs.");
        })
        .catch(err => {
            console.log(err)
        })
};


certTemplateFileNames.forEach(fileName => download(fileName));
csvTemplateFileNames.forEach(fileName => download(fileName));
