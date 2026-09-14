const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');

class GoogleAds {
  constructor(companyId, companyName, googleAdsArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.googleAdsArray = googleAdsArray;
  }
}

const googleAdsArray = [];

/**
 * @function webScrapingCompany
 * @description Scrapes Google Ads from a company's domain.
 * @param {string} domain - The domain to scrape.
 * @returns {Array} Array of Google Ads.
 */
async function webScrapingCompany(domain) {
  try {
    const url = `https://adstransparency.google.com/?region=MA&domain=${domain}`;

    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerClass = 'priority-creative-grid creative-preview';
    const containerArray = await page.$$eval(containerClass, els => els.map(el => `<img src="${el.querySelector('img').src}">`));

    await browser.close();

    return containerArray;
  } catch (error) {
    console.log(`Error during web scraping for domain ${domain}:`, error);
    throw error;
  }
}

/**
 * @function checkGoogleAdsUpdate
 * @description Checks if Google Ads have been updated.
 * @param {Object} obj1 - New Google Ads object.
 * @param {Object} obj2 - Existing Google Ads object.
 */
async function checkGoogleAdsUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({type: 'google-ads', text: `${obj1.companyName} company: google ads have been added.`});
  } else {
    if (obj1.googleAdsArray.length !== obj2.googleAdsArray.length) {
      await dbClient.setNotifications({
        type: 'google-ads',
        text: `${obj1.companyName} company: google ads have been updated.`
      });
    }
  }
}

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for all companies.
 */
async function runWebScrapingSequentially() {
  const companiesNames = ['hostoweb', 'capconnect', 'genious', 'nindohost', 'heberfacile', 'adkmedia'];
  const companiesIds = [];

  // Get all company IDs first
  for (const companyName of companiesNames) {
    const company = await dbClient.getCompany({name: companyName});
    const companyId = company._id.toString();
    companiesIds.push(companyId);
  }

  // Define web scraping tasks in order
  const webScrapingTasks = [
    () => webScrapingCompany('hostoweb.com'),
    () => webScrapingCompany('capconnect.com'),
    () => webScrapingCompany('genious.ma'),
    () => webScrapingCompany('nindohost.ma'),
    () => webScrapingCompany('heberfacile.com'),
    () => webScrapingCompany('adk-media.com')
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      googleAdsArray.push(new GoogleAds(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} google ads` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @function setGoogleAds
 * @description Sets Google Ads in the database.
 */
async function setGoogleAds() {
  await runWebScrapingSequentially();
  for (const googleAdsEl of googleAdsArray) {
    try {
      let googleAdsId = await dbClient.getGoogleAds({ companyId: googleAdsEl.companyId });
      await checkGoogleAdsUpdate(googleAdsEl, googleAdsId);
      if (!googleAdsId) {
        googleAdsId = await dbClient.setGoogleAds(googleAdsEl);
        console.log(`Google ads of ${googleAdsEl.companyName} added in database with ID: ${googleAdsId}`);
      } else {
        googleAdsId = await dbClient.getGoogleAds(googleAdsEl);
        if (!googleAdsId) {
          await dbClient.updateGoogleAds({ companyId: googleAdsEl.companyId }, googleAdsEl);
          console.log(`Google ads of ${googleAdsEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      await dbClient.setNotifications({type: 'error', text: `Error during web scraping for ${googleAdsEl.companyName} google ads`});
      console.log(`Error adding google ads for ${googleAdsEl.companyName}:`, error);
    }
  }
  console.log('Google ads: Done');
}

module.exports = setGoogleAds;
