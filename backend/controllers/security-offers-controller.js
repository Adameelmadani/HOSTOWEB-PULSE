const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class SecurityOffersPackage {
  constructor(name, annualPrice, monthlyPrice, validation) {
    this.name = name;
    this.annualPrice = annualPrice;
    this.monthlyPrice = monthlyPrice;
    this.validation = validation;
  }
}

class RapidSSL {
  constructor(packagesArray) {
    this.name = 'rapid-ssl';
    this.packagesArray = packagesArray;
  }
}

class GeoTrust {
  constructor(packagesArray) {
    this.name = 'geotrust';
    this.packagesArray = packagesArray;
  }
}

class Digicert {
  constructor(packagesArray) {
    this.name = 'digicert';
    this.packagesArray = packagesArray;
  }
}

class SecurityOffers {
  constructor(companyId, companyName, productsArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.productsArray = productsArray;
  }
}

/**
 * @function webScrapingHostoweb
 * @description Scrapes security offers from Hostoweb website.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingHostoweb(url, containerClass) {
  try {
    const securityTypesArray = [];

    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const packagesArray = [];

      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const containerElemArray = document.querySelectorAll('.server-tabls-body');
      for (let i = 0; i < containerElemArray.length; i++) {
        const infosArray = [...containerElemArray[i].querySelectorAll('.col-md-3, .col-md-2, .col-md-1')].map(el => el.innerHTML);
        const name = infosArray[0];
        const annualPrice = parseFloat(infosArray[4].match(/<b>(.*)/)[1]) || 0;
        const monthlyPrice = '-';
        const validation = infosArray[1];
    
        const createdPackage = new SecurityOffersPackage(name, annualPrice, monthlyPrice, validation);
        packagesArray.push(createdPackage);
      }

      securityTypesArray.push(packagesArray);
    }

    const securityOffersArray = [new RapidSSL(securityTypesArray[0]), new GeoTrust(securityTypesArray[1]), new Digicert(securityTypesArray[2])];

    return securityOffersArray;
  } catch (error) {
    console.log(`Error during web scraping Hostoweb:`, error);
    throw error;
  }
}

/**
 * @function webScrapingCapconnect
 * @description Scrapes security offers from Capconnect website.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingCapconnect(url, containerClass) {
  try {
    const packagesArray = [];

    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {

      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;

      const name = document.querySelector('.col-sm-6 h4').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.col-sm-3 .price strong').innerHTML) || 0;
      const monthlyPrice = '-';
      const validation = '-';

      packagesArray.push(new SecurityOffersPackage(name, annualPrice, monthlyPrice, validation));
    }

    const securityOffersArray = [
      new RapidSSL(packagesArray.filter(el => el.name.toLowerCase().includes('rapidssl'))),
      new GeoTrust(packagesArray.filter(el => el.name.toLowerCase().includes('geotrust'))),
      new Digicert(packagesArray.filter(el => el.name.toLowerCase().includes('digicert')))
    ];

    return securityOffersArray;
  } catch (error) {
    console.log(`Error during web scraping Capconnect:`, error);
    throw error;
  }
}

/**
 * @function webScrapingGenious
 * @description Scrapes security offers from Genious website.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingGenious(url, containerClass) {
  try {
    const securityOffersArray = [];
    const containerArrays = [];

    const url1 = url + 'geotrust';
    const url2 = url + 'digicert';
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();

    await page.goto(url1);
    containerArrays.push(await page.$$eval(containerClass, els => els.map(el => el.innerHTML)));
    await page.goto(url2);
    containerArrays.push(await page.$$eval(containerClass, els => els.map(el => el.innerHTML)));

    await browser.close();

    for (const containerArray of containerArrays) {
      const packagesArray = [];
      for (let j = 0; j < containerArray.length; j++) {
        const dom = new JSDOM(containerArray[j]);
        const document = dom.window.document;
    
        const name = document.querySelector('.for-x-30 a').innerHTML;
        const annualPriceDoc = document.querySelector('.price-radio .for-x-p-24') || document.querySelector('.price-pack-white.for-x-36');
        const annualPrice = parseFloat(annualPriceDoc.innerHTML) || 0;
        const monthlyPrice = '-';
        const validation = document.querySelector('.check-list-feature .right-packing span').innerHTML;
    
        packagesArray.push(new SecurityOffersPackage(name, annualPrice, monthlyPrice, validation));
      }
      securityOffersArray.push(packagesArray);
    }
    return [new RapidSSL([]), new GeoTrust(securityOffersArray[0]), new Digicert(securityOffersArray[1])];
  } catch (error) {
    console.log(`Error during web scraping Genious:`, error);
    throw error;
  }
}

/**
 * @function webScrapingNindohost
 * @description Scrapes security offers from Nindohost website.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingNindohost(url, containerClass) {
  try {
    const packagesArray = [];

    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(`<table>${containerArray[j]}</table>`);
      const document = dom.window.document;

      const infosArray = document.querySelectorAll('td');
      const name = infosArray[0].querySelector('a').innerHTML;
      const annualPrice = parseFloat(infosArray[4].innerHTML) || 0;
      const monthlyPrice = '-';
      const validation = infosArray[3].innerHTML;

      packagesArray.push(new SecurityOffersPackage(name, annualPrice, monthlyPrice, validation));
    }

    const securityOffersArray = [
      new RapidSSL(packagesArray.filter(el => el.name.toLowerCase().includes('rapidssl'))),
      new GeoTrust(packagesArray.filter(el => el.name.toLowerCase().includes('geotrust'))),
      new Digicert(packagesArray.filter(el => el.name.toLowerCase().includes('digicert')))
    ];

    return securityOffersArray;
  } catch (error) {
    console.log(`Error during web scraping Nindohost:`, error);
    throw error;
  }
}

/**
 * @function webScrapingHeberfacile
 * @description Scrapes security offers from Heberfacile website.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingHeberfacile(url, containerClass) {
  try {
    const securityOffersArray = [];
    const containerArrays = [];

    const url1 = url + 'rapidssl/';
    const url2 = url + 'geotrust/';
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();

    await page.goto(url1);
    containerArrays.push(await page.$$eval(containerClass, els => els.map(el => el.innerHTML)));
    await page.goto(url2);
    containerArrays.push(await page.$$eval(containerClass, els => els.map(el => el.innerHTML)));

    await browser.close();

    for (const containerArray of containerArrays) {
      const packagesArray = [];
      for (let j = 0; j < containerArray.length; j++) {
        const dom = new JSDOM(containerArray[j]);
        const document = dom.window.document;
    
        const name = document.querySelector('.plan-title').innerHTML;
        const annualPrice = parseFloat(document.querySelector('.plan-price span').innerHTML) || 0;
        const monthlyPrice = '-';
        const validation = document.querySelector('.feature-item').innerHTML;
    
        packagesArray.push(new SecurityOffersPackage(name, annualPrice, monthlyPrice, validation));
      }
      securityOffersArray.push(packagesArray);
    }
    return [new RapidSSL(securityOffersArray[0]), new GeoTrust(securityOffersArray[1]), new Digicert([])];
  } catch (error) {
    console.log(`Error during web scraping Heberfacile:`, error);
    throw error;
  }
}

/**
 * @function webScrapingAdkmedia
 * @description Placeholder function for Adkmedia web scraping.
 * @returns {Array} securityOffersArray - Array of security offers.
 */
async function webScrapingAdkmedia() {
  try {
    return [new RapidSSL([]), new GeoTrust([]), new Digicert([])];
  } catch (error) {
    console.log(`Error during web scraping Adkmedia:`, error);
    throw error;
  }
}

// Run web scraping Sequentially
const securityOffersArray = [];

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for different companies.
 */
async function runWebScrapingSequentially() {
  const companiesNames = ['hostoweb', 'capconnect', 'genious', 'nindohost', 'heberfacile', 'adkmedia'];
  const companiesIds = [];
  
  // Get all company IDs first
  for (const companyName of companiesNames) {
    const company = await dbClient.getCompany({ name: companyName });
    const companyId = company._id.toString();
    companiesIds.push(companyId);
  }

  // Define web scraping tasks in order
  const webScrapingTasks = [
    () => webScrapingHostoweb('https://www.hostoweb.com/securite/certificats-ssl', '#nav-rapidssl, #nav-geotrust, #nav-digicert'),
    () => webScrapingCapconnect('https://client.capconnect.com/index.php/store/ssl-certificates', '#collapseAllCerts .panel-body .ssl-certs-all li'),
    () => webScrapingGenious('https://www.genious.ma/fr/certificats-ssl/', '#offers .row .col-12'),
    () => webScrapingNindohost('https://nindohost.ma/certificats-ssl/', '#uc_ssl_cert_table_elementor_ddc706c tbody tr'),
    () => webScrapingHeberfacile('https://www.heberfacile.com/certificats-ssl/', '.w-pricing-table.pt-type6'),
    () => webScrapingAdkmedia()
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      securityOffersArray.push(new SecurityOffers(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} security offers` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @function checkSecurityOffersUpdate
 * @description Checks if security offers have been updated and sets notifications.
 * @param {Object} obj1 - New security offers object.
 * @param {Object} obj2 - Existing security offers object.
 */
async function checkSecurityOffersUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({type: 'security-offers', text: `${obj1.companyName} company: security offers have been added.`});
  } else {
    let index = 0;
    for (const productEl of obj1.productsArray) {
      if (productEl.packagesArray.length !== obj2.productsArray[index].packagesArray.length) {
        await dbClient.setNotifications({type: 'security-offers', text: `${obj1.companyName} company: security offers: ${productEl.name} number of packages have been updated`});
        index += 1;
        continue;
      }
      let j = 0;
      for (const packageEl of productEl.packagesArray) {
        if (packageEl.annualPrice !== obj2.productsArray[index].packagesArray[j].annualPrice) {
          await dbClient.setNotifications({type: 'security-offers', text: `${obj1.companyName} company: security offers: ${productEl.name} annual price have been updated from ${obj2.productsArray[index].packagesArray[j].annualPrice} to ${packageEl.annualPrice}`});
        }
        if (packageEl.monthlyPrice !== obj2.productsArray[index].packagesArray[j].monthlyPrice) {
          await dbClient.setNotifications({type: 'security-offers', text: `${obj1.companyName} company: security offers: ${productEl.name} monthly price have been updated from ${obj2.productsArray[index].packagesArray[j].monthlyPrice} to ${packageEl.monthlyPrice}`});
        }
        j += 1;
      }
      index += 1;
    }
  }
}

/**
 * @function setSecurityOffers
 * @description Sets security offers in the database.
 */
async function setSecurityOffers() {
  await runWebScrapingSequentially();
  for (const securityOffersEl of securityOffersArray) {
    try {
      let securityOffersId = await dbClient.getSecurityOffers({ companyId: securityOffersEl.companyId });
      await checkSecurityOffersUpdate(securityOffersEl, securityOffersId);
      if (!securityOffersId) {
        securityOffersId = await dbClient.setSecurityOffers(securityOffersEl);
        console.log(`Security offers of ${securityOffersEl.companyName} added in database with ID: ${securityOffersId}`);
      } else {
        securityOffersId = await dbClient.getSecurityOffers(securityOffersEl);
        if (!securityOffersId) {
          await dbClient.updateSecurityOffers({ companyId: securityOffersEl.companyId }, securityOffersEl);
          console.log(`Security offers of ${securityOffersEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      await dbClient.setNotifications({type: 'error', text: `Error during web scraping for ${securityOffersEl.companyName} security offers`});
      console.log(`Error adding security offers for ${securityOffersEl.companyName}:`, error);
      continue;
    }
  }
  console.log('Security offers: Done');
}

module.exports = setSecurityOffers;
