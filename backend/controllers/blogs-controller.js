const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Blogs {
  constructor(companyId, companyName, blogsPackageArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.blogsPackageArray = blogsPackageArray;
  }
}

class BlogsPackage {
  constructor(title, date, text, image) {
    this.title = title;
    this.date = date;
    this.text = text;
    this.image = image;
  }
}

/**
 * @function webScrapingCapconnect
 * @description Scrapes blog posts from Capconnect.
 * @returns {Array} - Array of BlogsPackage objects.
 */
async function webScrapingCapconnect() {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto('https://www.capconnect.com/blog/');

  // Scroll to the bottom of the page with repeated checks
  await page.evaluate(async () => {
    let lastHeight = document.body.scrollHeight;

    while (true) {
      window.scrollTo(0, document.body.scrollHeight);

      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds

      let newHeight = document.body.scrollHeight;
      if (newHeight === lastHeight) {
        break; // Stop if no more scrolling is possible
      }
      lastHeight = newHeight;
    }
  });

  // Do other tasks after scrolling to the bottom...
  const containerArray = await page.$$eval('.penci-wrapper-data.penci-grid .list-post.list-boxed-post', els => els.map(el => el.innerHTML));
  await browser.close();

  const packageArray = [];
  for (const el of containerArray) {
    const dom = new JSDOM(el);
    const document = dom.window.document;

    const title = document.querySelector('.header-list-style .penci-entry-title').innerHTML;
    const date = document.querySelector('.header-list-style .grid-post-box-meta').innerHTML;
    const text = document.querySelector('.item-content.entry-content p').innerHTML;
    const imageSrc = document.querySelector('.thumbnail').innerHTML.match(/&quot;(.*?)&quot;/) || document.querySelector('a').getAttribute('data-src') || '';
    let image = `<img src="${imageSrc}" >`;
    if (Array.isArray(imageSrc)) {
      image = `<img src="${imageSrc[1]}" >`;
    }
    
    packageArray.push(new BlogsPackage(title, date, text, image));
  }

  return packageArray;
}

// Genious
async function webScrapingGenious() {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();

  const packageArray = [];
  for (let i = 1; true; i++) {
    if (i === 1) {
      await page.goto('https://www.genious.blog');
    } else {
      await page.goto(`https://www.genious.blog/page/${i}/`);
    }

    const pageArray = await page.$$eval('.row .col-md-8 .post', els => els.map(el => el.innerHTML));
    if (pageArray.length === 0) {
      break;
    }

    for (const el of pageArray) {
      const dom = new JSDOM(el);
      const document = dom.window.document;
      const title = document.querySelector('.title').innerHTML;
      const date = document.querySelector('.informations strong').innerHTML;
      const text = document.querySelector('.content').innerHTML;
      const image = `<img src=${document.querySelector('.post-thumbnail img').getAttribute('src')}>`;

      packageArray.push(new BlogsPackage(title, date, text, image));
    }
  }
  await browser.close();

  return packageArray;
}

// Nindohost
async function webScrapingNindohost() {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();

  const packageArray = [];
  for (let i = 1; true; i++) {
    if (i === 1) {
      await page.goto('https://nindohost.ma/blog/');
    } else {
      await page.goto(`https://nindohost.ma/blog/page/${i}/`);
    }

    const pageArray = await page.$$eval('.elementor-widget-container .elementor-posts-container .elementor-post', els => els.map(el => el.innerHTML));
    if (pageArray.length === 0) {
      break;
    }

    for (const el of pageArray) {
      const dom = new JSDOM(el);
      const document = dom.window.document;
      const title = document.querySelector('.elementor-post__title').innerHTML;
      const date = '-';
      const text = document.querySelector('.elementor-post__excerpt').innerHTML;
      let imageSrc = document.querySelector('.elementor-post__thumbnail img').getAttribute('data-lazy-src') || document.querySelector('.elementor-post__thumbnail img').getAttribute('src');
      const image = `<img src=${imageSrc}>`;

      packageArray.push(new BlogsPackage(title, date, text, image));
    }
  }
  await browser.close();

  return packageArray;
}

// Heberfacile
async function webScrapingHeberfacile() {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto('https://www.heberfacile.com/blog/');

  const packageArray = [];
  const pageArray = await page.$$eval('.row .col-md-6.blg-typ3', els => els.map(el => el.innerHTML));

  await browser.close();

  for (const el of pageArray) {
    const dom = new JSDOM(el);
    const document = dom.window.document;
    const title = document.querySelector('.blg-typ3-content h3 a').outerHTML;
    const date = document.querySelector('.blog-date a').innerHTML;
    const text = document.querySelector('.blg-typ3-content p').innerHTML;
    let imageSrc = document.querySelector('.blg-typ3-thumb img').getAttribute('src');
    const image = `<img src=${imageSrc}>`;

    packageArray.push(new BlogsPackage(title, date, text, image));
  }

  return packageArray;
}

// Adkmedia
async function webScrapingAdkmedia() {
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
  const page = await browser.newPage();
  await page.goto('https://blog.adk-media.com/');

  const packageArray = [];
  const pageArray = await page.$$eval('.content-wrap .col-md-4, .col-md-3', els => els.map(el => el.innerHTML));

  await browser.close();

  for (const el of pageArray) {
    const dom = new JSDOM(el);
    const document = dom.window.document;
    const title = document.querySelector('h3').outerHTML;
    const dateElem = document.querySelector('.mt-3.mb-3');
    let date = '';
    if (dateElem) {
      date = dateElem.innerHTML;
    }
    const text = '';
    let imageSrc = document.querySelector('a img').getAttribute('src');
    const image = `<img src=${imageSrc}>`;

    packageArray.push(new BlogsPackage(title, date, text, image));
  }
  
  return packageArray;
}

const blogsArray = [];

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for multiple companies.
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
  
  // Define web scraping functions in order
  const webScrapingTasks = [
    () => [],
    () => webScrapingCapconnect(),
    () => webScrapingGenious(),
    () => webScrapingNindohost(),
    () => webScrapingHeberfacile(),
    () => webScrapingAdkmedia()
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      blogsArray.push(new Blogs(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} blogs` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @function checkBlogsUpdate
 * @description Checks if blogs are updated and sets notifications.
 * @param {Object} obj1 - The new blogs object.
 * @param {Object} obj2 - The existing blogs object.
 */
async function checkBlogsUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({type: 'blogs', text: `${obj1.companyName} company: blogs have been added.`});
  } else {
    for (let i = 0; i < obj1.blogsPackageArray.length; i++) {
      if (!obj2.blogsPackageArray[i]) {
        await dbClient.setNotifications({
          type: 'blogs',
          text: `${obj1.companyName} company: new blog has been added.`
        });
      }
    }
  }
}

/**
 * @function setBlogs
 * @description Sets blogs in the database.
 */
async function setBlogs() {
  await runWebScrapingSequentially();
  for (const blogsEl of blogsArray) {
    try {
      let blogsId = await dbClient.getBlogs({ companyId: blogsEl.companyId });
      await checkBlogsUpdate(blogsEl, blogsId);
      if (!blogsId) {
        blogsId = await dbClient.setBlogs(blogsEl);
        console.log(`Blogs of ${blogsEl.companyName} added in database with ID: ${blogsId}`);
      } else {
        blogsId = await dbClient.getBlogs(blogsEl);
        if (!blogsId) {
          await dbClient.updateBlogs({ companyId: blogsEl.companyId }, blogsEl);
          console.log(`Blogs of ${blogsEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      await dbClient.setNotifications({ type: 'error', text: `Error adding blogs for ${blogsEl.companyName}` });
      console.log('Error adding blogs:', error);
    }
  }
  console.log('Blogs: Done');
}

module.exports = setBlogs;
