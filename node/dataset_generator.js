const constants = {};

constants.DAT_DIR="../data";
constants.RAW_DIR=constants.DAT_DIR+'/raw';
constants.DATASET_DIR=constants.DAT_DIR+'/dataset';
constants.JSON_DIR=constants.DATASET_DIR+'/json';
constants.IMG_DIR=constants.DATASET_DIR+'/img';
constants.SAMPLES=constants.DATASET_DIR+'/samples.json';

const fs = require('fs');

// read the content of the "raw" folder
const fileNames = fs.readdirSync(constants.RAW_DIR);

const samples = [];
let id = 1;
fileNames.forEach(fn => {
    const content = fs.readFileSync(
        constants.RAW_DIR+'/'+fn
    );
    const { session, student, drawings } = JSON.parse(content);

    for(let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });
        id++
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples))