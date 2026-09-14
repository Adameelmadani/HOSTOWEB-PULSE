const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class DedicatedServers {
  constructor(packagesArray) {
    this.name = 'dedicated-servers';
    this.packagesArray = packagesArray;
  }
}

class DedicatedServersPackage {
  constructor(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter) {
    this.name = name;
    this.annualPrice = annualPrice;
    this.monthlyPrice = monthlyPrice;
    this.processorDetails = processorDetails;
    this.ram = ram;
    this.storage = storage;
    this.dataRate = dataRate;
    this.dataCenter = dataCenter;
  }
}

/**
 * @function wsDedicatedServersHostoweb
 * @description Scrapes dedicated server packages from Hostoweb.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersHostoweb(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('ul li')].map(el => el.innerHTML);
      const name = document.querySelector('.text-uppercase').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.plan-price.monthly .main-price').innerHTML) || 0;
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const dataRate = infosArray[3];
      const dataCenter = '-';
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Hostoweb:`, error);
  }
}

/**
 * @function wsDedicatedServersCapconnect
 * @description Scrapes dedicated server packages from Capconnect.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersCapconnect(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(`<table>${containerArray[j]}</table>`);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('td')].map(el => el.innerHTML);
      const name = infosArray[0];
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('[data-label="COST"] b').innerHTML.split(',').join('')) || 0;
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const dataRate = infosArray[3];
      const dataCenter = '-';
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Capconnect:`, error);
  }
}

/**
 * @function wsDedicatedServersGenious
 * @description Scrapes dedicated server packages from Genious.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersGenious(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(`<table>${containerArray[j]}</table>`);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('.check-list-feature p')].map(el => el.innerHTML);
      const name = document.querySelector('.for-x-40').innerHTML;
      const annualPrice = parseFloat(document.querySelectorAll('.left-price-radio')[3].innerHTML) || 0;
      const monthlyPrice = parseFloat(document.querySelectorAll('.left-price-radio')[0].innerHTML) || 0;
      const processorDetails = `${infosArray[0]} ${infosArray[1]} ${infosArray[2]} ${infosArray[3]}`;
      const ram = infosArray[4];
      const storage = infosArray[5];
      const dataRate = infosArray[6];
      const dataCenter = '-';
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Genious:`, error);
  }
}

/**
 * @function wsDedicatedServersNindohost
 * @description Scrapes dedicated server packages from Nindohost.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersNindohost(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(`<table>${containerArray[j]}</table>`);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('td')].map(el => el.innerHTML);
      const name = document.querySelector('td .main-content').innerHTML;
      const annualPrice = '-';
      let monthlyPrice = '-';
      if (!infosArray[5].includes('-')) {
        monthlyPrice = parseFloat(infosArray[5]) || 0;
      }
      const processorDetails = infosArray[1];
      const ram = infosArray[2];
      const storage = infosArray[3];
      const dataRate = '-';
      const dataCenter = infosArray[4];
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Nindohost:`, error);
  }
}

/**
 * @function wsDedicatedServersHeberfacile
 * @description Scrapes dedicated server packages from Heberfacile.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersHeberfacile(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(containerArray[j]);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('.pt-features .feature-item')].map(el => el.innerHTML);
      const name = document.querySelector('.pt-header .plan-title').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.plan-price span').innerHTML) || 0;
      const processorDetails = `${infosArray[0]} ${infosArray[1]} ${infosArray[2]}`;
      const ram = infosArray[3];
      const storage = infosArray[4];
      const dataRate = '-';
      const dataCenter = '-';
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Heberfacile:`, error);
  }
}

/**
 * @function wsDedicatedServersAdkmedia
 * @description Scrapes dedicated server packages from Adkmedia.
 * @param {string} url - The URL to scrape.
 * @param {string} containerClass - The container class to select elements.
 * @returns {DedicatedServers} - The scraped dedicated server packages.
 */
async function wsDedicatedServersAdkmedia(url, containerClass) {
  const packagesArray = [];

  try {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
    const page = await browser.newPage();
    await page.goto(url);

    const containerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));

    await browser.close();

    for (let j = 0; j < containerArray.length; j++) {
      const dom = new JSDOM(`<table>${containerArray[j]}</table>`);
      const document = dom.window.document;
      
      const infosArray = [...document.querySelectorAll('td')].map(el => el.innerHTML);
      const name = infosArray[0];
      const annualPrice = '-';
      const monthlyPrice = '-';
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const dataRate = infosArray[3] + ' ' + infosArray[5];
      const dataCenter = infosArray[4].replace(/src="[^"]*"/, '');
      const createdPackage = new DedicatedServersPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, dataRate, dataCenter);

      packagesArray.push(createdPackage);
    }

    const dedicatedServers = new DedicatedServers(packagesArray);

    return dedicatedServers;
  } catch (error) {
    console.log(`Error during web scraping for Adkmedia:`, error);
  }
}

module.exports = {
  DedicatedServers,
  wsDedicatedServersHostoweb,
  wsDedicatedServersCapconnect,
  wsDedicatedServersGenious,
  wsDedicatedServersNindohost,
  wsDedicatedServersHeberfacile,
  wsDedicatedServersAdkmedia
}
