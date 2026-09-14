const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class WHMReseller {
  constructor(packagesArray) {
    this.name = 'whm-reseller';
    this.packagesArray = packagesArray;
  }
}

class WHMResellerPackage {
  constructor(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections) {
    this.name = name;
    this.annualPrice = annualPrice;
    this.monthlyPrice = monthlyPrice;
    this.accounts = accounts;
    this.processorDetails = processorDetails;
    this.ram = ram;
    this.storage = storage;
    this.transfer = transfer;
    this.ipAddress = ipAddress;
    this.simultaneousConnections = simultaneousConnections;
  }
}

/**
 * @function wsWHMResellerHostoweb
 * @description Scrapes WHM reseller packages from Hostoweb
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<WHMReseller>} - Returns a WHMReseller object
 */
async function wsWHMResellerHostoweb(url, containerClass) {
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
      
      const infosArray = [...document.querySelectorAll('.body-ress-v2 p')].map(el => el.innerHTML);
      const name = document.querySelector('.res-titl').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.res-price b').innerHTML) || 0;
      const accounts = infosArray[0];
      const processorDetails = infosArray[1];
      const ram = infosArray[2];
      const storage = infosArray[3];
      const transfer = infosArray[4];
      const ipAddress = infosArray[5];
      const simultaneousConnections = infosArray[6];
      const createdPackage = new WHMResellerPackage(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections);

      packagesArray.push(createdPackage);
    }

    const whmReseller = new WHMReseller(packagesArray);
    return whmReseller;
  } catch (error) {
    console.log('Error in wsWHMResellerHostoweb:', error);
    throw error;
  }
}

/**
 * @function wsWHMResellerCapconnect
 * @description Scrapes WHM reseller packages from Capconnect
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<WHMReseller>} - Returns a WHMReseller object
 */
async function wsWHMResellerCapconnect(url, containerClass) {
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
      
      const infosArray = [...document.querySelectorAll('.generic_feature_list ul li')].map(el => el.innerHTML);
      const name = document.querySelector('.generic_head_content .head span').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.generic_price_tag .price .currency').innerHTML.split(',').join('')) || 0;
      const accounts = infosArray[0];
      const processorDetails = infosArray[3];
      const ram = infosArray[4];
      const storage = infosArray[1];
      const transfer = infosArray[2];
      const ipAddress = infosArray[5];
      const simultaneousConnections = '-';
      const createdPackage = new WHMResellerPackage(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections);

      packagesArray.push(createdPackage);
    }

    const whmReseller = new WHMReseller(packagesArray);
    return whmReseller;
  } catch (error) {
    console.log('Error in wsWHMResellerCapconnect:', error);
    throw error;
  }
}

/**
 * @function wsWHMResellerGenious
 * @description Scrapes WHM reseller packages from Genious
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<WHMReseller>} - Returns a WHMReseller object
 */
async function wsWHMResellerGenious(url, containerClass) {
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
      
      const infosArray = [...document.querySelectorAll('.check-list-feature p')].map(el => el.innerHTML);
      const name = document.querySelector('.for-x-40.mb-4').innerHTML;
      const annualPrice = parseFloat(document.querySelectorAll('.price-radio .left-price-radio')[1].innerHTML) || 0;
      const monthlyPrice = parseFloat(document.querySelectorAll('.price-radio .left-price-radio')[0].innerHTML) || 0;
      const accounts = infosArray[0];
      const processorDetails = infosArray[5];
      const ram = infosArray[6];
      const storage = infosArray[1];
      const transfer = infosArray[2];
      const ipAddress = infosArray[4];
      const simultaneousConnections = infosArray[7];
      const createdPackage = new WHMResellerPackage(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections);

      packagesArray.push(createdPackage);
    }

    const whmReseller = new WHMReseller(packagesArray);
    return whmReseller;
  } catch (error) {
    console.log('Error in wsWHMResellerGenious:', error);
    throw error;
  }
}

/**
 * @function wsWHMResellerNindohost
 * @description Scrapes WHM reseller packages from Nindohost
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<WHMReseller>} - Returns a WHMReseller object
 */
async function wsWHMResellerNindohost(url, containerClass) {
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
      
      const infosArray = [...document.querySelectorAll('.elementor-widget-wrap.elementor-element-populated .elementor-widget-ucaddon_features_list ul li div')].map(el => el.innerHTML);
      const name = document.querySelector('.elementor-heading-title.elementor-size-default').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.advanced-pricing-card .current-price-info .price-value').innerHTML) || 0;
      const accounts = infosArray[0];
      const processorDetails = infosArray[19];
      const ram = infosArray[20];
      const storage = infosArray[2];
      const transfer = infosArray[3];
      const ipAddress = '-';
      const simultaneousConnections = infosArray[21];
      const createdPackage = new WHMResellerPackage(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections);

      packagesArray.push(createdPackage);
    }

    const whmReseller = new WHMReseller(packagesArray);
    return whmReseller;
  } catch (error) {
    console.log('Error in wsWHMResellerNindohost:', error);
    throw error;
  }
}

/**
 * @function wsWHMResellerHeberfacile
 * @description Scrapes WHM reseller packages from Heberfacile
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<WHMReseller>} - Returns a WHMReseller object
 */
async function wsWHMResellerHeberfacile(url, containerClass) {
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
      
      const infosArray = [...document.querySelectorAll('.pt-features .feature-item h4')].map(el => el.innerHTML);
      const name = document.querySelector('.pt-header .plan-title').innerHTML;
      const annualPrice = parseFloat(document.querySelector('.pt-header .plan-price span').innerHTML) || 0;
      const monthlyPrice = annualPrice / 12;
      const accounts = infosArray[0];
      const processorDetails = infosArray[7];
      const ram = infosArray[8];
      const storage = infosArray[1];
      const transfer = infosArray[2];
      const ipAddress = infosArray[3];
      const simultaneousConnections = infosArray[10];
      const createdPackage = new WHMResellerPackage(name, annualPrice, monthlyPrice, accounts, processorDetails, ram, storage, transfer, ipAddress, simultaneousConnections);

      packagesArray.push(createdPackage);
    }

    const whmReseller = new WHMReseller(packagesArray);
    return whmReseller;
  } catch (error) {
    console.log('Error in wsWHMResellerHeberfacile:', error);
    throw error;
  }
}

module.exports = {
  WHMReseller,
  wsWHMResellerHostoweb,
  wsWHMResellerCapconnect,
  wsWHMResellerGenious,
  wsWHMResellerNindohost,
  wsWHMResellerHeberfacile
}
