const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Extensions {
  constructor(name, pricePerYear, transfer) {
    this.name = name;
    this.pricePerYear = pricePerYear;
    this.transfer = transfer;
  }
}

class ExtensionPrices {
  constructor(companyId, companyName, extensionsArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.extensionsArray = extensionsArray;
  }
}

/**
 * @description Scrapes extension prices from Hostoweb website
 * @param {string} url - The URL to scrape
 * @param {number} numberColumns - Number of columns in the table
 * @param {string} bodyElementsClass - CSS selector for table body elements
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingHostoweb(url, numberColumns, bodyElementsClass) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const innerHTMLArray = await page.$$eval(bodyElementsClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < extensions.length; j++) {
      for(let i = 0; i < innerHTMLArray.length; i += numberColumns) {
        if (innerHTMLArray[i] === extensions[j].name) {
          extensions[j].pricePerYear = parseFloat(innerHTMLArray[i + 1]) || 0;
          extensions[j].transfer = parseFloat(innerHTMLArray[i + 2]) || 0;
          break;
        }
      }
    }
  } catch (error) {
    console.log(`Error during web scraping for Hostoweb:`, error);
  } finally {
    await browser.close();
  }

  return extensions;
}

/**
 * @description Scrapes extension prices from CapConnect website
 * @param {string} url - The URL to scrape
 * @param {number} numberColumns - Number of columns in the table
 * @param {string} bodyElementsClass - CSS selector for table body elements
 * @param {string} tdElementsClass - CSS selector for table data elements
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingCapconnect(url, numberColumns, bodyElementsClass, tdElementsClass) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const innerHTMLArray = await page.$$eval(bodyElementsClass, els => els.map(el => el.innerHTML));
    const innerHTMLArrayTd = await page.$$eval(tdElementsClass, els => els.map(el => el.innerHTML));

    for (let j = 0; j < extensions.length; j++) {
      for(let i = 0, k = 0; i < innerHTMLArray.length && k < innerHTMLArrayTd.length; i += 7, k += numberColumns) {
        if (innerHTMLArrayTd[k].includes('>' + extensions[j].name) && innerHTMLArrayTd[k].endsWith(extensions[j].name)) {
          extensions[j].pricePerYear = parseFloat(innerHTMLArray[i + 2]) || 0;
          extensions[j].transfer = parseFloat(innerHTMLArray[i + 6]) || 0;
          break;
        }
      }
    }
  } catch (error) {
    console.log(`Error during web scraping for CapConnect:`, error);
  } finally {
    await browser.close();
  }

  return extensions;
}

/**
 * @description Scrapes extension prices from Genious website
 * @param {string} url - The URL to scrape
 * @param {number} numberColumns - Number of columns in the table
 * @param {string} bodyElementsClass - CSS selector for table body elements
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingGenious(url, numberColumns, bodyElementsClass) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const innerHTMLArray = await page.$$eval(bodyElementsClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < extensions.length; j++) {
      for(let i = 0; i < innerHTMLArray.length; i += numberColumns) {
        if (innerHTMLArray[i].includes(` ${extensions[j].name}\n`)) {
          extensions[j].pricePerYear = parseFloat(innerHTMLArray[i + 2]) || 0;
          extensions[j].transfer = parseFloat(innerHTMLArray[i + 4]) || 0;
          break;
        }
      }
    }
  } catch (error) {
    console.log(`Error during web scraping for Genious:`, error);
  } finally {
    await browser.close();
  }

  return extensions;
}

/**
 * @description Scrapes extension prices from Nindohost website
 * @param {string} url - The URL to scrape
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingNindohost(url) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  try {
    const extensionResults = await Promise.allSettled([
      webScrapingNindohostPart(url, 'thisisnotadomain', extensions),
      webScrapingNindohostPart(url, 'exist', extensions)
    ]);

    for (let i = 0; i < extensions.length; i++) {
      extensions[i].pricePerYear = extensionResults[0].value[i];
      extensions[i].transfer = extensionResults[1].value[i];
    }
  } catch (error) {
    console.log(`Error during web scraping for Nindohost:`, error);
  }

  return extensions;
}

/**
 * @description Helper function to scrape extension prices from Nindohost website
 * @param {string} url - The URL to scrape
 * @param {string} domainName - The domain name to search for
 * @param {Extensions[]} extensions - Array of Extensions objects
 * @returns {Promise<number[]>} - Array of prices
 */
async function webScrapingNindohostPart(url, domainName, extensions) {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();

  await page.goto(url);

  try {
    if (domainName === 'exist') {
      await page.click('.switcher-wrapper .switcher');
      await page.waitForSelector('.switcher-item.transfer-item.active');
    }
    
    await page.waitForSelector('.container .flex .flex-grow .input');
    await page.type('.container .flex .flex-grow .input', domainName);
    await page.click('.container .flex .w-full button');

    await Promise.allSettled([
      page.waitForSelector('.lookup-result-wrapper .suggestion-item'),
      page.waitForSelector('.domain-suggestions-list .suggestion-item')
    ]);
    const container = await page.$eval('.w-full', el => el.innerHTML);
    
    const dom = new JSDOM(container);
    const document = dom.window.document;

    const domainArrays = [];
    domainArrays.push(document.querySelector('.lookup-result-wrapper .suggestion-item'));
    domainArrays.push(...Array.from(document.querySelectorAll('.domain-suggestions-list .suggestion-item')));

    const returnedArray = [];
    for (const extension of extensions) {
      for (const domain of domainArrays) {
        if (extension.name === domain.querySelector('.domain-info .domain .tld').innerHTML) {
          returnedArray.push(parseFloat(domain.querySelector('.pricing-info .price .price').innerHTML));
        }
      }
    }
    return returnedArray;
  } catch (error) {
    console.log(`Error during web scraping part for Nindohost:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

/**
 * @description Scrapes extension prices from Heberfacile website
 * @param {string} url - The URL to scrape
 * @param {number} numberColumns - Number of columns in the table
 * @param {string} bodyElementsClass - CSS selector for table body elements
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingHeberfacile(url, numberColumns, bodyElementsClass) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const innerHTMLArray = await page.$$eval(bodyElementsClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < extensions.length; j++) {
      for(let i = 0; i < innerHTMLArray.length; i += numberColumns) {
        if (innerHTMLArray[i] === extensions[j].name) {
          extensions[j].pricePerYear = parseFloat(innerHTMLArray[i + 1]) || 0;
          extensions[j].transfer = parseFloat(innerHTMLArray[i + 2]) || 0;
          break;
        }
      }
    }
  } catch (error) {
    console.log(`Error during web scraping for Heberfacile:`, error);
  } finally {
    await browser.close();
  }

  return extensions;
}

/**
 * @description Scrapes extension prices from Adkmedia website
 * @param {string} url - The URL to scrape
 * @param {number} numberColumns - Number of columns in the table
 * @param {string} bodyElementsClass - CSS selector for table body elements
 * @returns {Promise<Extensions[]>} - Array of Extensions objects
 */
async function webScrapingAdkmedia(url, numberColumns, bodyElementsClass) {
  const extensions = [
    new Extensions('.com'),
    new Extensions('.net'),
    new Extensions('.ma'),
    new Extensions('.org')
  ];

  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const innerHTMLArray = await page.$$eval(bodyElementsClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < extensions.length; j++) {
      for(let i = 0; i < innerHTMLArray.length; i += numberColumns) {
        if (innerHTMLArray[i].includes(extensions[j].name)) {
          extensions[j].pricePerYear = parseFloat(innerHTMLArray[i + 3]) || 0;
          extensions[j].transfer = parseFloat(innerHTMLArray[i + 5]) || 0;
          break;
        }
      }
    }
  } catch (error) {
    console.log(`Error during web scraping for Adkmedia:`, error);
  } finally {
    await browser.close();
  }

  return extensions;
}

let extensionPricesArray = [];

/**
 * @description Runs web scraping tasks sequentially
 */
async function runWebScrapingSequentially() {
  const companiesNames = ['hostoweb', 'capconnect', 'genious', 'nindohost', 'heberfacile', 'adkmedia'];
  const companiesIds = [];
  
  // Get all company IDs first
  for (const companyName of companiesNames) {
    try {
      const company = await dbClient.getCompany({ name: companyName });
      const companyId = company._id.toString();
      companiesIds.push(companyId);
    } catch (error) {
      console.log(`Error fetching company ID for ${companyName}:`, error);
    }
  }
  
  // Define web scraping functions in order
  const webScrapingTasks = [
    () => webScrapingHostoweb('https://www.hostoweb.com/noms-de-domaine', 6, '.pricing_table_domain tbody tr td'),
    () => webScrapingCapconnect('https://www.capconnect.com/noms-de-domaine', 4, '#domainnames tbody tr td span', '#domainnames tbody tr td'),
    () => webScrapingGenious('https://www.genious.ma/fr/noms-de-domaine/extensions', 1, '.table-extensions tbody tr th a, .table-extensions tbody tr td'),
    () => webScrapingNindohost('https://order.nindohost.ma/domain/lookup'),
    () => webScrapingHeberfacile('https://www.heberfacile.com/nom-de-domaine/extensions/', 5, '#tablepress-17 tbody tr td'),
    () => webScrapingAdkmedia('https://www.adk-media.com/fr/nom-domaine-maroc.html', 10, '.table_extensions tbody tr td span')
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      extensionPricesArray.push(new ExtensionPrices(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} extension prices` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @description Checks if extension prices have been updated
 * @param {ExtensionPrices} obj1 - New extension prices object
 * @param {ExtensionPrices} obj2 - Existing extension prices object
 */
async function checkExtensionPricesUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({type: 'extension-prices', text: `${obj1.companyName} company: extension prices have been added.`});
  } else {
    for (let i = 0; i < obj1.extensionsArray.length; i++) {
      if (obj1.extensionsArray[i].pricePerYear !== obj2.extensionsArray[i].pricePerYear) {
        await dbClient.setNotifications({
          type: 'extension-prices',
          text: `${obj1.companyName} company: extension prices price per year of ${obj1.extensionsArray[i].name} have been updated from ${obj2.extensionsArray[i].pricePerYear} to ${obj1.extensionsArray[i].pricePerYear}`
        });
      }
      if (obj1.extensionsArray[i].transfer !== obj2.extensionsArray[i].transfer) {
        await dbClient.setNotifications({
          type: 'extension-prices',
          text: `${obj1.companyName} company: extension prices transfer of ${obj1.extensionsArray[i].name} have been updated from ${obj2.extensionsArray[i].transfer} to ${obj1.extensionsArray[i].transfer}`
        });
      }
    }
  }
}

/**
 * @description Sets extension prices in the database
 */
async function setExtensionPrices() {
  await runWebScrapingSequentially();
  for (const extensionPricesEl of extensionPricesArray) {
    try {
      let extensionPricesId = await dbClient.getExtensionPrices({ companyId: extensionPricesEl.companyId });
      await checkExtensionPricesUpdate(extensionPricesEl, extensionPricesId);
      if (!extensionPricesId) {
        extensionPricesId = await dbClient.setExtensionPrices(extensionPricesEl);
        console.log(`Extension prices of ${extensionPricesEl.companyName} added in database with ID: ${extensionPricesId}`);
      } else {
        extensionPricesId = await dbClient.getExtensionPrices(extensionPricesEl);
        if (!extensionPricesId) {
          await dbClient.updateExtensionPrices({ companyId: extensionPricesEl.companyId }, extensionPricesEl);
          console.log(`Extension prices of ${extensionPricesEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      await dbClient.setNotifications({type: 'error', text: `Error during web scraping for ${extensionPricesEl.companyName} extension prices`});
      console.log(`Error adding extension prices for ${extensionPricesEl.companyName}:`, error);
      continue;
    }
  }
  console.log('Extension prices: Done');
}

module.exports = setExtensionPrices;
