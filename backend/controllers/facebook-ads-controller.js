const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class FacebookAds {
  constructor(companyId, companyName, facebookAdsArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.facebookAdsArray = facebookAdsArray;
  }
}

class FacebookAdsPackage {
  constructor(date, platformArray, text, image) {
    this.date = date;
    this.platformArray = platformArray;
    this.text = text;
    this.image = image;
  }
}

/**
 * @function webScrapingCompany
 * @description Scrapes Facebook ads for a given company ID.
 * @param {string} id - The company ID.
 * @returns {Array} - Array of FacebookAdsPackage objects.
 */
async function webScrapingCompany(id) {
  const url = `https://web.facebook.com/ads/library/?active_status=active&ad_type=all&country=MA&media_type=all&search_type=page&source=fb-logo&view_all_page_id=${id}`;

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('._8n_0', { visible: true });
    const containerClass = '.xh8yej3 ._7jvw';
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    const adsArray = [];
    for(let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      const headList = document.querySelectorAll('.x3nfvp2.x1e56ztr');

      const date = headList[2].innerHTML;
      const platformArray = Array.from(headList[3].querySelectorAll('.xtwfq29')).map(el => el.outerHTML);
      const truePlatformArray = [];
      platformArray.forEach((el) => {
        if (el.includes('LPxeSs3EqML.png')) {
          truePlatformArray.push('<i class="fa-brands fa-square-facebook"></i>');
        } else if (el.includes('v1mnY4Wr823.png')) {
          truePlatformArray.push('<i class="fa-brands fa-square-instagram"></i>');
        }
      });
      const text = document.querySelector('.x6ikm8r.x10wlt62 ._7jyr._a25-').innerHTML;
      const image = document.querySelector('.x6ikm8r.x10wlt62 img').outerHTML;
      adsArray.push(new FacebookAdsPackage(date, truePlatformArray, text, image));
    }

    return adsArray;
  } catch (error) {
    console.log(`Error during web scraping for company ID ${id}:`, error);
  }
}

// Run web scraping Sequentially
const facebookAdsArray = [];

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for multiple companies.
 */
async function runWebScrapingSequentially() {
  const companiesNames = ['hostoweb', 'capconnect', 'genious', 'nindohost', 'heberfacile', 'adkmedia'];
  const companiesIds = [];

  // Get all company IDs first
  for (companyName of companiesNames) {
    const company = await dbClient.getCompany({name: companyName});
    const companyId = company._id.toString();
    companiesIds.push(companyId);
  }

  // Define web scraping tasks in order
  const webScrapingTasks = [
    () => webScrapingCompany('30968051532'),
    () => webScrapingCompany('1889201664425563'),
    () => webScrapingCompany('488357811202030'),
    () => webScrapingCompany('320135171428808'),
    () => webScrapingCompany('286837018111136'),
    () => webScrapingCompany('14662360338')
  ];

  // Loop over each task and run them sequentially
  const facebookAdsResults = await Promise.allSettled([
  ]);
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      facebookAdsArray.push(new FacebookAds(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} security offers` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
  facebookAdsResults.forEach((facebookAdsResult, index) => {
    if (facebookAdsResult.status === "fulfilled") {
      facebookAdsArray.push(new FacebookAds(companiesIds[index], companiesNames[index], [...facebookAdsResult.value]));
    } else {
      console.log(`WebScraping of ${companiesNames[index]} failed with:`, facebookAdsResult.reason);
    }
  });
}

/**
 * @function setFacebookAds
 * @description Sets Facebook ads in the database.
 */
async function setFacebookAds() {
  await runWebScrapingSequentially();
  for (const facebookAdsEl of facebookAdsArray) {
    try {
      let facebookAdsId = await dbClient.getFacebookAds({ companyId: facebookAdsEl.companyId });
      if (!facebookAdsId) {
        facebookAdsId = await dbClient.setFacebookAds(facebookAdsEl);
        console.log(`Facebook ads of ${facebookAdsEl.companyName} added in database with ID: ${facebookAdsId}`);
      } else {
        facebookAdsId = await dbClient.getFacebookAds(facebookAdsEl);
        if (!facebookAdsId) {
          await dbClient.updateFacebookAds({ companyId: facebookAdsEl.companyId }, facebookAdsEl);
          console.log(`Facebook ads of ${facebookAdsEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      console.log('Error adding facebook ads:', error);
    }
  }
  console.log('Facebook ads: Done');
}

module.exports = setFacebookAds;
