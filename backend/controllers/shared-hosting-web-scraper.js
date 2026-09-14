const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class SharedHosting {
  constructor(packagesArray) {
    this.name = 'shared-hosting';
    this.packagesArray = packagesArray;
  }
}

class SharedHostingPackage {
  constructor(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer) {
    this.name = name;
    this.annualPrice = annualPrice;
    this.monthlyPrice = monthlyPrice;
    this.storage = storage;
    this.emailAccounts = emailAccounts;
    this.domain = domain;
    this.simultaneousConnections = simultaneousConnections;
    this.processorDetails = processorDetails;
    this.ram = ram;
    this.transfer = transfer;
  }
}

/**
 * @function wsSharedHostingHostoweb
 * @description Scrapes shared hosting packages from Hostoweb.
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<SharedHosting>} - Shared hosting packages.
 */
async function wsSharedHostingHostoweb(url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const name = document.querySelector('.res-titl').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.res-price b').innerHTML) || 0;
      const monthlyPrice = '-';
      const otherInfosArray = [...document.querySelectorAll('.body-ress-v2 p')].map(el => el.innerHTML);
      const storage = otherInfosArray[0];
      const emailAccounts = otherInfosArray[2];
      const domain = otherInfosArray[3];
      const simultaneousConnections = otherInfosArray[5];
      const processorDetails = '-';
      const ram = '-';
      const transfer = otherInfosArray[1];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Hostoweb:`, error);
  } finally {
    await browser.close();
  }

  return new SharedHosting(packagesArray);
}

/**
 * @function wsSharedHostingCapconnect
 * @description Scrapes shared hosting packages from Capconnect.
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<SharedHosting>} - Shared hosting packages.
 */
async function wsSharedHostingCapconnect(url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const name = document.querySelector('.pt-head .pt-plan').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.pt-footer p span b').innerHTML) || 0;
      const monthlyPrice = parseFloat(document.querySelector('.pt-footer p .pt-footer-price').innerHTML) || 0;
      const otherInfosArray = [...document.querySelectorAll('.pt-body .pt-features ul li')].map(el => el.innerHTML);
      const storage = otherInfosArray[0];
      const emailAccounts = otherInfosArray[2];
      const domain = otherInfosArray[6];
      const simultaneousConnections = otherInfosArray[11];
      const processorDetails = otherInfosArray[7];
      const ram = otherInfosArray[8];
      const transfer = otherInfosArray[1];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Capconnect:`, error);
  } finally {
    await browser.close();
  }

  return new SharedHosting(packagesArray);
}

/**
 * @function wsSharedHostingGenious
 * @description Scrapes shared hosting packages from Genious.
 * @param {string} packageType - Type of package (Linux/Windows).
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<Array<SharedHostingPackage>>} - Shared hosting packages.
 */
async function wsSharedHostingGenious(packageType, url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const name = packageType + ' ' + document.querySelector('.for-x-40').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.for-x-45').innerHTML) || 0;
      const monthlyPrice = "-";
      const otherInfosArray = [...document.querySelectorAll('.check-list-feature p')].map(el => el.innerHTML);
      const storage = otherInfosArray[0];
      const emailAccounts = otherInfosArray[2];
      let domain;
      let simultaneousConnections;
      let processorDetails;
      let ram;
      if (packageType === 'Linux') {
        domain = otherInfosArray[11] + ' ' + otherInfosArray[12];
        simultaneousConnections = otherInfosArray[10];
        processorDetails = otherInfosArray[8];
        ram = otherInfosArray[7];
      } else {
        domain = otherInfosArray[7] + ' ' + otherInfosArray[8];
        simultaneousConnections = '-';
        processorDetails = '-';
        ram = '-';
      }
      const transfer = otherInfosArray[1];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Genious:`, error);
  } finally {
    await browser.close();
  }

  return packagesArray;
}

/**
 * @function wsSharedHostingHeberfacile
 * @description Scrapes shared hosting packages from Heberfacile.
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<SharedHosting>} - Shared hosting packages.
 */
async function wsSharedHostingHeberfacile(url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;

      const name = document.querySelector('.pt-header .plan-title').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.pt-header .plan-price span').innerHTML) || 0;
      const monthlyPrice = '-';
      const otherInfosArray = [...document.querySelectorAll('.feature-item h4')].map(el => el.innerHTML);
      const storage = otherInfosArray[0];
      const emailAccounts = otherInfosArray[3];
      const domain = otherInfosArray[4] + ' ' + otherInfosArray[7];
      const simultaneousConnections = otherInfosArray[12];
      const processorDetails = otherInfosArray[9];
      const ram = otherInfosArray[10];
      const transfer = otherInfosArray[2];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Heberfacile:`, error);
  } finally {
    await browser.close();
  }

  return new SharedHosting(packagesArray);
}

/**
 * @function wsSharedHostingAdkmedia
 * @description Scrapes shared hosting packages from Adkmedia.
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<SharedHosting>} - Shared hosting packages.
 */
async function wsSharedHostingAdkmedia(url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containers = await page.$eval(containerClass, el => el.innerHTML);
    const dom = new JSDOM(containers);
    const document = dom.window.document;
    const document1 = document.querySelector('.content-wrap #prices .pricing');
    const document2 = document.querySelector('.content-wrap #detailstechniques');

    const document1Elms = Array.from(document1.querySelectorAll('.col-md-6'));
    for (let j = 0; j < document1Elms.length; j++) {
      const name = document1Elms[j].querySelector('.pricing-title h3').innerHTML;
      const annualPrice = parseFloat(document1Elms[j].querySelector('.pricing-price:not(.hidden)').innerHTML.match(/<span class="price-unit"><\/span>(.*)/s)[1]) || 0;
      const monthlyPrice = '-'; 
      const otherInfosArray = Array.from(document2.querySelectorAll('#detailstechniques .toggle .table-responsive .table tbody'));
      const storage = (Array.from(Array.from(otherInfosArray[0].querySelectorAll('tr'))[0].querySelectorAll('td'))[j + 1]).innerHTML.match(/.*?(?=<a)/)[0];
      const emailAccounts = (Array.from(Array.from(otherInfosArray[4].querySelectorAll('tr'))[0].querySelectorAll('td'))[j + 1]).innerHTML;
      const domain = (Array.from(Array.from(otherInfosArray[2].querySelectorAll('tr'))[0].querySelectorAll('td'))[j + 1]).innerHTML;
      const simultaneousConnections = (Array.from(Array.from(otherInfosArray[1].querySelectorAll('tr'))[2].querySelectorAll('td'))[j + 1]).innerHTML;
      const processorDetails = (Array.from(Array.from(otherInfosArray[1].querySelectorAll('tr'))[0].querySelectorAll('td'))[j + 1]).innerHTML;
      const ram = (Array.from(Array.from(otherInfosArray[1].querySelectorAll('tr'))[1].querySelectorAll('td'))[j + 1]).innerHTML;
      const transfer = (Array.from(Array.from(otherInfosArray[0].querySelectorAll('tr'))[2].querySelectorAll('td'))[j + 1]).innerHTML.match(/.*?(?=<a)/)[0];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Adkmedia:`, error);
  } finally {
    await browser.close();
  }

  return new SharedHosting(packagesArray);
}

/**
 * @function wsSharedHostingNindohost
 * @description Scrapes shared hosting packages from Nindohost.
 * @param {string} url - URL to scrape.
 * @param {string} containerClass - CSS class of the container.
 * @returns {Promise<SharedHosting>} - Shared hosting packages.
 */
async function wsSharedHostingNindohost(url, containerClass) {
  const packagesArray = [];
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;

      const nameArray = Array.from(document.querySelectorAll('.elementor-heading-title'));
      let name = nameArray[0].innerHTML;
      if (nameArray.length > 5) {
        name = nameArray[1].innerHTML;
      }
      const annualPrice = parseFloat(document.querySelector('.elementor-widget-container .current-price-info .price-value').innerHTML) || 0;
      const monthlyPrice = '-';
      const otherInfosArray = [...document.querySelectorAll('.elementor-element.elementor-widget.elementor-widget-ucaddon_features_list ul li div')].map(el => el.innerHTML);
      const storage = otherInfosArray[1];
      const emailAccounts = otherInfosArray[2];
      const domain = '-';
      const simultaneousConnections = '-';
      const processorDetails = '-';
      const ram = '-';
      const transfer = otherInfosArray[4];
      const createdPackage = new SharedHostingPackage(name, annualPrice, monthlyPrice, storage, emailAccounts, domain, simultaneousConnections, processorDetails, ram, transfer);

      packagesArray.push(createdPackage);
    }
  } catch (error) {
    console.log(`Error scraping Nindohost:`, error);
  } finally {
    await browser.close();
  }

  return new SharedHosting(packagesArray);
}

module.exports = {
  SharedHosting,
  wsSharedHostingHostoweb,
  wsSharedHostingCapconnect,
  wsSharedHostingGenious,
  wsSharedHostingHeberfacile,
  wsSharedHostingNindohost,
  wsSharedHostingAdkmedia
};
