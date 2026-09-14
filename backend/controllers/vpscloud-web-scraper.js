const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class VPSCloud {
  constructor(packagesArray) {
    this.name = 'vps-cloud';
    this.packagesArray = packagesArray;
  }
}

class VPSCloudPackage {
  constructor(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer) {
    this.name = name;
    this.annualPrice = annualPrice;
    this.monthlyPrice = monthlyPrice;
    this.processorDetails = processorDetails;
    this.ram = ram;
    this.storage = storage;
    this.transfer = transfer;
  }
}

/**
 * @function wsVPSCloudHostoweb
 * @description Scrapes VPS Cloud packages from Hostoweb
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloud>} - The VPSCloud object containing the packages
 */
async function wsVPSCloudHostoweb(url, containerClass) {
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
      const infosArray = [...document.querySelectorAll('div')].map(el => el.innerHTML);
      const name = infosArray[0];
      const annualPrice = '-';
      const monthlyPrice = parseFloat(infosArray[5].match(/<b>(.*)/)[1]) || 0;
      const processorDetails = infosArray[1];
      const ram = infosArray[2];
      const storage = infosArray[3];
      const transfer = infosArray[4];
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    const vpsCloud = new VPSCloud(packagesArray);
    return vpsCloud;
  } catch (error) {
    console.log('Error in wsVPSCloudHostoweb:', error);
    throw error;
  }
}

/**
 * @function wsVPSCloudCapconnect
 * @description Scrapes VPS Cloud packages from Capconnect
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloud>} - The VPSCloud object containing the packages
 */
async function wsVPSCloudCapconnect(url, containerClass) {
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
      const infosArray = [...document.querySelectorAll('td')].map(el => el.innerHTML);
      const name = j + 1;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(infosArray[4].match(/<b>(.*)/)[1]) || 0;
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const transfer = infosArray[3];
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    const vpsCloud = new VPSCloud(packagesArray);
    return vpsCloud;
  } catch (error) {
    console.log('Error in wsVPSCloudCapconnect:', error);
    throw error;
  }
}

/**
 * @function wsVPSCloudGenious
 * @description Scrapes VPS Cloud packages from Genious
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloud>} - The VPSCloud object containing the packages
 */
async function wsVPSCloudGenious(url, containerClass) {
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
      const name = document.querySelector('.for-x-30').innerHTML;
      const annualPrice = parseFloat(Array.from(document.querySelectorAll('.label-for-price .price-radio .left-price-radio'))[1].innerHTML) || 0;
      const monthlyPrice = parseFloat(Array.from(document.querySelectorAll('.label-for-price .price-radio .left-price-radio'))[0].innerHTML) || 0;
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const transfer = infosArray[3];
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    const vpsCloud = new VPSCloud(packagesArray);
    return vpsCloud;
  } catch (error) {
    console.log('Error in wsVPSCloudGenious:', error);
    throw error;
  }
}

/**
 * @function wsVPSCloudHeberfacile
 * @description Scrapes VPS Cloud packages from Heberfacile
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloud>} - The VPSCloud object containing the packages
 */
async function wsVPSCloudHeberfacile(url, containerClass) {
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
      const infosArray = [...document.querySelectorAll('td')].map(el => el.innerHTML);
      const name = infosArray[0];
      const annualPrice = '-';
      const monthlyPrice = parseFloat(infosArray[3].match(/<strong>(.*)/)[1]) || 0;
      const processorDetails = '-';
      const ram = infosArray[1];
      const storage = infosArray[2];
      const transfer = '-';
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    const vpsCloud = new VPSCloud(packagesArray);
    return vpsCloud;
  } catch (error) {
    console.log('Error in wsVPSCloudHeberfacile:', error);
    throw error;
  }
}

/**
 * @function wsVPSCloudAdkmedia
 * @description Scrapes VPS Cloud packages from Adkmedia
 * @param {string} packageType - The type of package
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloudPackage[]>} - The array of VPSCloudPackage objects
 */
async function wsVPSCloudAdkmedia(packageType, url, containerClass) {
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
      const infosArray = [...document.querySelectorAll('ul li')].map(el => el.innerHTML);
      const name = `${packageType} ${document.querySelector('#product-title').innerHTML}`;
      const annualPrice = parseFloat(document.querySelectorAll('.form-group option')[1].innerHTML.match(/- (.*)/)[1]) || 0;
      const monthlyPrice = parseFloat(document.querySelectorAll('.form-group option')[0].innerHTML.match(/- (.*)/)[1]) || 0;
      const processorDetails = infosArray[0];
      const ram = infosArray[1];
      const storage = infosArray[2];
      const transfer = infosArray[3];
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    return packagesArray;
  } catch (error) {
    console.log('Error in wsVPSCloudAdkmedia:', error);
    throw error;
  }
}

/**
 * @function wsVPSCloudNindohost
 * @description Scrapes VPS Cloud packages from Nindohost
 * @param {string} url - The URL to scrape
 * @param {string} containerClass - The container class to select elements
 * @returns {Promise<VPSCloud>} - The VPSCloud object containing the packages
 */
async function wsVPSCloudNindohost(url, containerClass) {
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
      const infosArray = [...document.querySelectorAll('.elementor-element.elementor-widget.elementor-widget-ucaddon_features_list ul li div')].map(el => el.innerHTML);
      const name = document.querySelector('.elementor-heading-title.elementor-size-default').innerHTML;
      const annualPrice = '-';
      const monthlyPrice = parseFloat(document.querySelector('.price-value').innerHTML) || 0;
      const processorDetails = infosArray[5];
      const ram = infosArray[6];
      const storage = infosArray[1];
      const transfer = infosArray[4];
      const createdPackage = new VPSCloudPackage(name, annualPrice, monthlyPrice, processorDetails, ram, storage, transfer);
      packagesArray.push(createdPackage);
    }

    const vpsCloud = new VPSCloud(packagesArray);
    return vpsCloud;
  } catch (error) {
    console.log('Error in wsVPSCloudNindohost:', error);
    throw error;
  }
}

module.exports = {
  VPSCloud,
  wsVPSCloudHostoweb,
  wsVPSCloudCapconnect,
  wsVPSCloudGenious,
  wsVPSCloudNindohost,
  wsVPSCloudHeberfacile,
  wsVPSCloudAdkmedia
}
