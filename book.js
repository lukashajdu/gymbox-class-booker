const puppeteer = require('puppeteer-core');
const CONFIG = require('./config');
const GX = require('./selectors');
const validate = require('./validate');

if (process.argv.length === 2) {
    console.log('Usage: node book.js <CLASS_NAME> <HH:MM> <CLUB_NAME>');
    process.exit(9);
}

let className, classTime, club;
[className, classTime, club] = validate.processInputValues(process.argv[2], process.argv[3], process.argv[4]);

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: CONFIG.chromiumExecutable
    });
    const page = await browser.newPage();

    await page.goto(GX.baseUrl + '/account/Login');
    await page.click(GX.login.username);
    await page.keyboard.type(CONFIG.username);
    await page.click(GX.login.password);
    await page.keyboard.type(CONFIG.password);
    await page.click(GX.login.button);

    await page.goto(GX.baseUrl + '/BookingsCentre/MemberTimetable?clubId=' + GX.gym[club]);

    const linkHandlers = await page.$x(
        "//a[contains(text(), '" + GX.class[className] + "')][1]"
        + "/ancestor::tr/td[1]//span[contains(text(), '" + classTime +"')]"
        + "/ancestor::tr/td[7]/a[contains(text(), 'Book')]"
    );
    if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
    } else {
        console.log('Requested class was not found.');
        await browser.close();
        process.exit(9);
    }

    await page.goto(GX.baseUrl + '/Basket/Pay');
    await browser.close();

    console.log('You have been booked into the ' + GX.class[className] + ' at ' + classTime);
})();
