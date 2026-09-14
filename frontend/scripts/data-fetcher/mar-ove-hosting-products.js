import {fetchHostingProducts} from './general.js';
import { chartCreator } from './mar-ove-general.js';

/**
 * Fills the shared hosting chart with data.
 * @param {Array} hostingProductsArray - Array of hosting products.
 */
function fillSharedHosting(hostingProductsArray) {
  try {
    const companiesNames = hostingProductsArray.map(el => el.companyName);
    const sharedHostingArray = hostingProductsArray.map(el => el.productsArray[0].packagesArray);
    const labelTitle = 'Price/Year';

    const minChartClass = 'shared-hosting-min';
    const minArray = sharedHostingArray.map(el => el.reduce((min, current) => (current.annualPrice < min ? current.annualPrice : min), el[0].annualPrice));
    let minMin = minArray.reduce((min, current) => (current < min ? current : min), minArray[0]);
    if (minMin > 20) {
      minMin -= 20;
    }
    const maxMin = minArray.reduce((max, current) => (current > max ? current : max), minArray[0]) + 20;
    chartCreator(minChartClass, companiesNames, labelTitle, minArray, minMin, maxMin, 20);

    const maxChartClass = 'shared-hosting-max';
    const maxArray = sharedHostingArray.map(el => el.reduce((max, current) => (current.annualPrice > max ? current.annualPrice : max), el[0].annualPrice));
    let minMax = maxArray.reduce((min, current) => (current < min ? current : min), maxArray[0]);
    if (minMax > 100) {
      minMax -= 100;
    }
    const maxMax = maxArray.reduce((max, current) => (current > max ? current : max), maxArray[0]) + 100;
    chartCreator(maxChartClass, companiesNames, labelTitle, maxArray, minMax, maxMax, 100);
  } catch (error) {
    console.error('Error filling shared hosting data:', error);
  }
}

/**
 * Fills the VPS/Cloud hosting chart with data.
 * @param {Array} hostingProductsArray - Array of hosting products.
 */
function fillVPSCloud(hostingProductsArray) {
  try {
    const companiesNames = hostingProductsArray.map(el => el.companyName);
    const vpsCloudArray = hostingProductsArray.map(el => el.productsArray[1].packagesArray);
    const labelTitle = 'Price/Month';

    const minChartClass = 'vps-cloud-min';
    const minArray = vpsCloudArray.map(el => el.reduce((min, current) => (current.monthlyPrice < min ? current.monthlyPrice : min), el[0].monthlyPrice));
    let minMin = minArray.reduce((min, current) => (current < min ? current : min), minArray[0]);
    if (minMin > 20) {
      minMin -= 20;
    }
    const maxMin = minArray.reduce((max, current) => (current > max ? current : max), minArray[0]) + 20;
    chartCreator(minChartClass, companiesNames, labelTitle, minArray, minMin, maxMin, 20);

    const maxChartClass = 'vps-cloud-max';
    const maxArray = vpsCloudArray.map(el => el.reduce((max, current) => (current.monthlyPrice > max ? current.monthlyPrice : max), el[0].monthlyPrice));
    let minMax = maxArray.reduce((min, current) => (current < min ? current : min), maxArray[0]);
    if (minMax > 100) {
      minMax -= 100;
    }
    const maxMax = maxArray.reduce((max, current) => (current > max ? current : max), maxArray[0]) + 100;
    chartCreator(maxChartClass, companiesNames, labelTitle, maxArray, minMax, maxMax, 100);
  } catch (error) {
    console.error('Error filling VPS/Cloud hosting data:', error);
  }
}

/**
 * Fills the WHM Reseller hosting chart with data.
 * @param {Array} hostingProductsArray - Array of hosting products.
 */
function fillWHMReseller(hostingProductsArray) {
  try {
    const companiesNames = hostingProductsArray.map(el => el.companyName);
    const whmResellerArray = hostingProductsArray.map(el => el.productsArray[2].packagesArray);
    for (let i = 0; i < companiesNames.length; i++) {
      if (whmResellerArray[i].length === 0) {
        companiesNames.splice(i, 1);
        whmResellerArray.splice(i, 1);
        i--;
      } else if (whmResellerArray[i][0].monthlyPrice === '-') {
        companiesNames.splice(i, 1);
        whmResellerArray.splice(i, 1);
        i--;
      }
    }
    const labelTitle = 'Price/Month';

    const minChartClass = 'whm-reseller-min';
    const minArray = whmResellerArray.map(el => el.reduce((min, current) => (current.monthlyPrice < min ? current.monthlyPrice : min), el[0].monthlyPrice));
    let minMin = minArray.reduce((min, current) => (current < min ? current : min), minArray[0]);
    if (minMin > 20) {
      minMin -= 20;
    }
    const maxMin = minArray.reduce((max, current) => (current > max ? current : max), minArray[0]) + 20;
    chartCreator(minChartClass, companiesNames, labelTitle, minArray, minMin, maxMin, 20);

    const maxChartClass = 'whm-reseller-max';
    const maxArray = whmResellerArray.map(el => el.reduce((max, current) => (current.monthlyPrice > max ? current.monthlyPrice : max), el[0].monthlyPrice));
    let minMax = maxArray.reduce((min, current) => (current < min ? current : min), maxArray[0]);
    if (minMax > 100) {
      minMax -= 100;
    }
    const maxMax = maxArray.reduce((max, current) => (current > max ? current : max), maxArray[0]) + 100;
    chartCreator(maxChartClass, companiesNames, labelTitle, maxArray, minMax, maxMax, 100);
  } catch (error) {
    console.error('Error filling WHM Reseller hosting data:', error);
  }
}

/**
 * Fills the Dedicated Servers hosting chart with data.
 * @param {Array} hostingProductsArray - Array of hosting products.
 */
function fillDedicatedServers(hostingProductsArray) {
  try {
    const companiesNames = hostingProductsArray.map(el => el.companyName);
    const dedicatedServersArray = hostingProductsArray.map(el => el.productsArray[3].packagesArray);
    for (let i = 0; i < companiesNames.length; i++) {
      if (dedicatedServersArray[i].length === 0) {
        companiesNames.splice(i, 1);
        dedicatedServersArray.splice(i, 1);
        i--;
      } else if (dedicatedServersArray[i][0].monthlyPrice === '-') {
        companiesNames.splice(i, 1);
        dedicatedServersArray.splice(i, 1);
        i--;
      }
    }
    const labelTitle = 'Price/Month';

    const minChartClass = 'dedicated-servers-min';
    const minArray = dedicatedServersArray.map(el => el.reduce((min, current) => (current.monthlyPrice < min ? current.monthlyPrice : min), el[0].monthlyPrice));
    let minMin = minArray.reduce((min, current) => (current < min ? current : min), minArray[0]);
    if (minMin > 20) {
      minMin -= 20;
    }
    const maxMin = minArray.reduce((max, current) => (current > max ? current : max), minArray[0]) + 20;
    chartCreator(minChartClass, companiesNames, labelTitle, minArray, minMin, maxMin, 20);

    const maxChartClass = 'dedicated-servers-max';
    const maxArray = dedicatedServersArray.map(el => el.reduce((max, current) => (current.monthlyPrice > max ? current.monthlyPrice : max), el[0].monthlyPrice));
    let minMax = maxArray.reduce((min, current) => (current < min ? current : min), maxArray[0]);
    if (minMax > 100) {
      minMax -= 100;
    }
    const maxMax = maxArray.reduce((max, current) => (current > max ? current : max), maxArray[0]) + 100;
    chartCreator(maxChartClass, companiesNames, labelTitle, maxArray, minMax, maxMax, 100);
  } catch (error) {
    console.error('Error filling Dedicated Servers hosting data:', error);
  }
}

/**
 * Fetches hosting products and fills all hosting charts with data.
 */
async function fillHostingProducts() {
  try {
    const hostingProductsArray = await fetchHostingProducts();
    fillSharedHosting(hostingProductsArray);
    fillVPSCloud(hostingProductsArray);
    fillWHMReseller(hostingProductsArray);
    fillDedicatedServers(hostingProductsArray);
  } catch (error) {
    console.error('Error fetching hosting products:', error);
  }
}

fillHostingProducts();
