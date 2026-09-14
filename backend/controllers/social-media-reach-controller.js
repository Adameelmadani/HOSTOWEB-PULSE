const dbClient = require('../utils/db');
const puppeteer = require('puppeteer');

class SocialMediaReach {
  constructor(companyId, companyName, socialMediaArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.socialMediaArray = socialMediaArray;
  }
}

class SocialMediaPlateform {
  constructor(name, numberOfFollowers) {
    this.name = name;
    this.numberOfFollowers = numberOfFollowers;
  }
}

/**
 * @function webScrapingCompany
 * @description Scrapes social media follower counts for a given company.
 * @param {string} instagramUsername - Instagram username.
 * @param {string} linkedinUsername - LinkedIn username.
 * @param {string} twitterUsername - Twitter username.
 * @param {string} youtubeUrl - YouTube channel URL.
 * @returns {Promise<Array<SocialMediaPlateform>>} - Array of social media platforms with follower counts.
 */
async function webScrapingCompany(instagramUsername, linkedinUsername, twitterUsername, youtubeUrl) {
  try {
    const instagramUrl = `https://instrack.app/instagram/${instagramUsername}`;
    const linkedinUrl = `https://www.linkedin.com/company/${linkedinUsername}/jobs/`;
    const twitterUrl = `https://socialblade.com/twitter/user/${twitterUsername}`;

    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
    const page = await browser.newPage();

    let instagramContainerObj = '-';
    if (instagramUsername !== '-') {
      await page.goto(instagramUrl);
      let containerClass = 'h4[data-v-fa3bba90]';
      await page.waitForSelector(containerClass, { visible: true });
      instagramContainerObj = await page.$eval(containerClass, el => el.innerHTML);
      instagramContainerObj = parseFloat(instagramContainerObj.replace(',', ''));
    }

    let linkedinContainerObj = '-';
    if (linkedinUsername !== '-') {
      await page.goto(linkedinUrl);
      containerClass = '.top-card-layout__first-subline.font-sans.text-md.leading-open.text-color-text-low-emphasis';
      await page.waitForSelector(containerClass, { visible: true });
      linkedinContainerObj = await page.$eval(containerClass, el => el.innerHTML);
      linkedinContainerObj = parseFloat(linkedinContainerObj.match(/(?<=<\/span>\s*).*/)[0].replace(',', ''));
    }

    let twitterContainerObj = '-';
    if (twitterUsername !== '-') {
      await page.goto(twitterUrl);
      containerClass = '#YouTubeUserTopInfoBlock .YouTubeUserTopInfo span';
      await page.waitForSelector(containerClass, { visible: true });
      const twitterContainerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
      twitterContainerObj = parseFloat(twitterContainerArray[1].replace(',', ''));
    }

    let youtubeContainerObj = '-';
    if (youtubeUrl !== '-') {
      await page.goto(youtubeUrl);
      containerClass = '#YouTubeUserTopInfoBlock .YouTubeUserTopInfo span';
      await page.waitForSelector(containerClass, { visible: true });
      const youtubeContainerArray = await page.$$eval(containerClass, els => els.map(el => el.innerHTML));
      youtubeContainerObj = parseFloat(youtubeContainerArray[4].replace(',', ''));
    }

    await browser.close();

    return [
      new SocialMediaPlateform('instagram', instagramContainerObj),
      new SocialMediaPlateform('linkedin', linkedinContainerObj),
      new SocialMediaPlateform('twitter', twitterContainerObj),
      new SocialMediaPlateform('youtube', youtubeContainerObj)
    ];
  } catch (error) {
    console.log('Error during web scraping:', error);
    throw error;
  }
}

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for a list of companies.
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
    () => webScrapingCompany('-', 'hostoweb', 'HosToWeb', 'https://socialblade.com/youtube/channel/UCNc71XTy96n9-5X_G6EU4BA'),
    () => webScrapingCompany('capconnectcom', 'capconnect-com', 'connect_cap', 'https://socialblade.com/youtube/channel/UCoNp-MeI3SMEiu6NdFrmq8g'),
    () => webScrapingCompany('geniousnet', 'genious-communications', 'geniousnet', 'https://socialblade.com/youtube/c/geniousnet'),
    () => webScrapingCompany('nindohost', 'nindohost', 'Nindohost', 'https://socialblade.com/youtube/channel/UC2n56yVcSqzKHB8sX4HlSqQ'),
    () => webScrapingCompany('heberfacile', 'heberfacile', '-', 'https://socialblade.com/youtube/user/heberfacile'),
    () => webScrapingCompany('adk_media', 'adk-media-sarl', 'adkmedia', 'https://socialblade.com/youtube/c/adkmedia')
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      socialMediaReachArray.push(new SocialMediaReach(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} social media reach` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @function checkSocialMediaReachUpdate
 * @description Checks if social media reach has been updated and sets notifications accordingly.
 * @param {Object} obj1 - New social media reach object.
 * @param {Object} obj2 - Existing social media reach object.
 */
async function checkSocialMediaReachUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({ type: 'social-media-reach', text: `${obj1.companyName} company: social media reach has been added.` });
  } else {
    for (let i = 0; i < obj1.socialMediaArray.length; i++) {
      if (obj1.socialMediaArray[i].numberOfFollowers !== obj2.socialMediaArray[i].numberOfFollowers) {
        await dbClient.setNotifications({
          type: 'social-media-reach',
          text: `${obj1.companyName} company: social media reach of ${obj1.socialMediaArray[i].name} has been updated from ${obj2.socialMediaArray[i].numberOfFollowers} to ${obj1.socialMediaArray[i].numberOfFollowers}`
        });
      }
    }
  }
}

/**
 * @function setSocialMediaReach
 * @description Sets social media reach data in the database.
 */
async function setSocialMediaReach() {
  try {
    await runWebScrapingSequentially();
    for (const socialMediaReachEl of socialMediaReachArray) {
      try {
        let socialMediaReachId = await dbClient.getSocialMediaReach({ companyId: socialMediaReachEl.companyId });
        await checkSocialMediaReachUpdate(socialMediaReachEl, socialMediaReachId);
        if (!socialMediaReachId) {
          socialMediaReachId = await dbClient.setSocialMediaReach(socialMediaReachEl);
          console.log(`Social Media Reach of ${socialMediaReachEl.companyName} added in database with ID: ${socialMediaReachId}`);
        } else {
          socialMediaReachId = await dbClient.getSocialMediaReach(socialMediaReachEl);
          if (!socialMediaReachId) {
            await dbClient.updateSocialMediaReach({ companyId: socialMediaReachEl.companyId }, socialMediaReachEl);
            console.log(`Social Media Reach of ${socialMediaReachEl.companyName} updated in database`);
          }
        }
      } catch (error) {
        await dbClient.setNotifications({ type: 'error', text: `Error adding social media reach for ${socialMediaReachEl.companyName}` });
        console.log('Error adding social media reach:', error);
      }
    }
    console.log('Social media reach: Done');
  } catch (error) {
    console.log('Error in setSocialMediaReach:', error);
  }
}

module.exports = setSocialMediaReach;
