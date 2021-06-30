const admin = require('./src/firebaseAdmin/admin');


const bucketRef = admin.storage().bucket(process.env.STORAGE_BUCKET);

const certTemplateFileNames = [
    'certificateTemplates/SB Template Participants.png',
    'certificateTemplates/SB Template Coordinators.png',
    'certificateTemplates/SB Template Volunteers.png',
    'certificateTemplates/SB Template Winners.png',
    'certificateTemplates/CS Template Winners.png',
    'certificateTemplates/CS Template Participants.png',
    'certificateTemplates/IAS Template Participants.png',
    'certificateTemplates/IAS Template Winners.png',
    'certificateTemplates/WIE Template Participants.png',
    'certificateTemplates/WIE Template Winners.png',
    'certificateTemplates/Excelsior21 Template Participants.png',
    'certificateTemplates/Excelsior21 Template Winners.png',
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
