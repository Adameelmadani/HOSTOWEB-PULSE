const dbClient = require('../utils/db');

class Company {
  constructor(name, logoSrc, primaryColor, secondaryColor) {
    this.name = name;
    this.logoSrc = logoSrc;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
  }
}

const companies = [
  new Company('hostoweb', 'hostoweb-logo.png','rgb(136, 212, 23)', 'rgb(10, 46, 65)'),
  new Company('capconnect', 'capconnect-logo.png', 'rgb(86, 107, 111)', 'rgb(26, 147, 205)'),
  new Company('genious', 'genious-logo.svg', 'rgb(1, 15, 56)', 'rgb(0, 97, 212)'),
  new Company('nindohost', 'nindohost-logo.svg', '#0db6b6', 'rgb(5, 20, 75)'),
  new Company('heberfacile', 'heberfacile-logo.png', 'rgb(48, 48, 48)', 'rgb(150, 180, 49)'),
  new Company('adkmedia', 'adkmedia-logo.svg', 'rgb(0, 161, 132)', 'rgb(192, 41, 66)')
];

/**
 * @function checkCompanyUpdate
 * @description Checks if the company details have been updated and sets notifications accordingly.
 * @param {Object} obj1 - The new company object.
 * @param {Object} obj2 - The existing company object from the database.
 */
async function checkCompanyUpdate(obj1, obj2) {
  try {
    if (!obj2) {
      await dbClient.setNotifications({type: 'company', text: `${obj1.name} company has been added.`});
    } else {
      if (obj1.logoSrc !== obj2.logoSrc) {
        await dbClient.setNotifications({type: 'company', text: `${obj1.name} logo source has been updated.`});
      }
      if (obj1.primaryColor !== obj2.primaryColor) {
        await dbClient.setNotifications({type: 'company', text: `${obj1.name} primary color has been updated.`});
      }
      if (obj1.secondaryColor !== obj2.secondaryColor) {
        await dbClient.setNotifications({type: 'company', text: `${obj1.name} secondary color has been updated.`});
      }
    }
  } catch (error) {
    console.log(`Error checking company update for ${obj1.name}:`, error);
    await dbClient.setNotifications({type: 'error', text: `Error checking company update for ${obj1.name}`});
  }
}

/**
 * @function setCompanies
 * @description Sets the companies in the database and updates notifications.
 */
async function setCompanies() {
  for (const company of companies) {
    try {
      let companyId = await dbClient.getCompany({name: company.name});
      await checkCompanyUpdate(company, companyId);
      if (!companyId) {
        companyId = await dbClient.setCompany(company);
        console.log(`Company ${company.name} added in database with ID: ${companyId}`);
      } else {
        companyId = await dbClient.getCompany(company);
        if (!companyId) {
          await dbClient.updateCompany({name: company.name}, company);
          console.log(`Company ${company.name} updated in database`);
        }
      }
    } catch (error) {
      let companyName = company.name || 'companies';
      console.log(`Error during web scraping for ${companyName} company data:`, error);
      await dbClient.setNotifications({type: 'error', text: `Error during web scraping for ${companyName} company data`});
      continue;
    } 
  }
  console.log('Companies: Done');
}

module.exports = setCompanies;
