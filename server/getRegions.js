
const puppeteer = require('puppeteer');


async function GET_COUNTREIS(name, year) {
    try {
        let testurl = `${process.env.PART_A_GETCOUNTRIES}${name}${process.env.PART_B_GETCOUNTRIES}`
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
            headless: true
        });
        const page = (await browser.pages())[0];

        await page.setRequestInterception(true);
        page.on('request', req => {
            if (req.resourceType() == 'image') {
                req.abort();
            } else {
                req.continue();
            }
        });

        var checkArray;
        await page.goto(testurl, { waitUntil: 'networkidle2' });

        if (await page.waitForSelector('body > div.results > div.listdiv > div > div > div > strong ') !== null) {
            const msgs = await page.$$("body > div.results > div.listdiv > div > div > div > strong ")
            for (const msg of msgs) {
                const message = await msg.$eval('span', span => span.innerText);
                if (message == "0" || message == 0) {
                    await browser.close();
                    return;
                }
            }
        }



        if (await page.waitForSelector('body > div.results > div.listdiv > div:nth-child(2) > div > div:nth-child(4) > b > span') !== null) {

            const titles = await page.$$('.videodiv  > div:nth-child(4) > b');
            let countriesArray = await [];
            var check = false;

            for (const title of titles) {
                const t = await title.$eval('span', span => span.innerText);
                const moveNameLowerCase = await t.toLowerCase();
                let newName;
                const arr = name.split(' ');
                if (arr[0] === 'the') {
                    arr.shift()
                    newName = arr.join(' ')
                }
                if (moveNameLowerCase == name || moveNameLowerCase == newName) {
                    await title.click();
                    await page.waitForSelector('.listdiv> div.img-rounded');
                    const countriesList = await page.$$('.listdiv> div.img-rounded');
                    for (const country of countriesList) {
                        const nameCountry = await country.$eval('span', span => span.innerText);
                        countriesArray.push(nameCountry);
                    }
                    check = true;
                } else {
                }
                checkArray = countriesArray
                if (check) {
                    await browser.close();
                    return countriesArray;
                }
            }

            if (check == false) {
                await browser.close();
                return false
            }

        } else {
            await browser.close();
            return false
        }
    } catch (err) {
        // console.log(err);
        return false

    }
}

module.exports = { GET_COUNTREIS }