const puppeteer = require('puppeteer');
const CREDENTIALS = require('./credentials');
const GX = require('./selectors');

let className = process.argv[2];
if (className.length === 0) {
    console.log('Missing class name');
    return;
}

if (GX.class.hasOwnProperty(className) === false) {
    console.log('Class was no recognised');
    return;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(GX.baseUrl + '/account/Login');

    // Login
    await page.click(GX.login.username);
    await page.keyboard.type(CREDENTIALS.username);
    await page.click(GX.login.password);
    await page.keyboard.type(CREDENTIALS.password);
    await page.click(GX.login.button);

    // Timetable
    await page.goto(GX.baseUrl + '/BookingsCentre/MemberTimetable?clubId=' + GX.gym.oldStreet);

    const linkHandlers = await page.$x("//a[contains(text(), '" + GX.class[className] + "')][1]/ancestor::tr/td[7]/a[contains(text(), 'Book')]");
    if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
    } else {
        console.log('Book link was not found.');
        await browser.close();
        return;
    }

    // Complete
    await page.goto(GX.baseUrl + '/Basket/Pay');

    await browser.close();
})();
