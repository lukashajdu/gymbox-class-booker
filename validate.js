const GX = require('./selectors');

const processInputValues = function(className, classTime, club) {
    if (typeof className === 'undefined') {
        console.log('Missing class name');
        process.exit(9);
    }

    if (GX.class.hasOwnProperty(className) === false) {
        console.log('Class name was not recognised');
        process.exit(9);
    }

    if (typeof classTime === 'undefined') {
        console.log('Missing class time');
        process.exit(9);
    }

    if (!isTimeValid(classTime)) {
        console.log('Invalid class time');
        process.exit(9);
    }

    if (typeof club === 'undefined') {
        console.log('Missing club');
        process.exit(9);
    }

    if (GX.gym.hasOwnProperty(club) === false) {
        console.log('Club was not recognised');
        process.exit(9);
    }

    return [className, classTime, club];
};

const isTimeValid = function (time) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
};

module.exports.processInputValues = processInputValues;
module.exports.isTimeValid = isTimeValid;
