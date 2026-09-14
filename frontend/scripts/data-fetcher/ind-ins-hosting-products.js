import { fetchHostingProducts } from './general.js';

/**
 * Fills the shared hosting table with data.
 * @param {Object} sharedHostingObject - The shared hosting data object.
 */
function fillSharedHosting(sharedHostingObject) {
  const sharedHostingTableBody = document.querySelector('.shared-hosting-table-js tbody');
  if (!sharedHostingTableBody) {
    console.error('Element .shared-hosting-table-js tbody not found');
    return;
  }
  let addedHtml = '';
  const packagesArray = sharedHostingObject.packagesArray;
  for (const packageObj of packagesArray) {
    addedHtml += `
      <tr>
        <td>${packageObj.name}</td>
        <td>${packageObj.annualPrice} DH/an</td>
        <td>${packageObj.monthlyPrice} DH/mo</td>
        <td>${packageObj.storage}</td>
        <td>${packageObj.emailAccounts}</td>
        <td>${packageObj.domain}</td>
        <td>${packageObj.simultaneousConnections}</td>
        <td>${packageObj.processorDetails}</td>
        <td>${packageObj.ram}</td>
        <td>${packageObj.transfer}</td>
      </tr>
    `;
  }
  sharedHostingTableBody.innerHTML = addedHtml;
}

/**
 * Fills the VPS cloud table with data.
 * @param {Object} vpsCloudObject - The VPS cloud data object.
 */
function fillVPSCloud(vpsCloudObject) {
  const vpsCloudTableBody = document.querySelector('.vps-cloud-table-js tbody');
  if (!vpsCloudTableBody) {
    console.error('Element .vps-cloud-table-js tbody not found');
    return;
  }
  let addedHtml = '';
  const packagesArray = vpsCloudObject.packagesArray;
  for (const packageObj of packagesArray) {
    addedHtml += `
      <tr>
        <td>${packageObj.name}</td>
        <td>${packageObj.annualPrice} DH/an</td>
        <td>${packageObj.monthlyPrice} DH/mo</td>
        <td>${packageObj.processorDetails}</td>
        <td>${packageObj.ram}</td>
        <td>${packageObj.storage}</td>
        <td>${packageObj.transfer}</td>
      </tr>
    `;
  }
  vpsCloudTableBody.innerHTML = addedHtml;
}

/**
 * Fills the WHM reseller table with data.
 * @param {Object} whmResellerObject - The WHM reseller data object.
 */
function fillWHMReseller(whmResellerObject) {
  const whmResellerTableBody = document.querySelector('.whm-reseller-table-js tbody');
  if (!whmResellerTableBody) {
    console.error('Element .whm-reseller-table-js tbody not found');
    return;
  }
  let addedHtml = '';
  const packagesArray = whmResellerObject.packagesArray;
  for (const packageObj of packagesArray) {
    addedHtml += `
      <tr>
        <td>${packageObj.name}</td>
        <td>${packageObj.annualPrice} DH/an</td>
        <td>${packageObj.monthlyPrice} DH/mo</td>
        <td>${packageObj.accounts}</td>
        <td>${packageObj.processorDetails}</td>
        <td>${packageObj.ram}</td>
        <td>${packageObj.storage}</td>
        <td>${packageObj.transfer}</td>
        <td>${packageObj.ipAddress}</td>
        <td>${packageObj.simultaneousConnections}</td>
      </tr>
    `;
  }
  whmResellerTableBody.innerHTML = addedHtml;
}

/**
 * Fills the dedicated servers table with data.
 * @param {Object} dedicatedServersObject - The dedicated servers data object.
 */
function fillDedicatedServers(dedicatedServersObject) {
  const dedicatedServersTableBody = document.querySelector('.dedicated-servers-table-js tbody');
  if (!dedicatedServersTableBody) {
    console.error('Element .dedicated-servers-table-js tbody not found');
    return;
  }
  let addedHtml = '';
  const packagesArray = dedicatedServersObject.packagesArray;
  for (const packageObj of packagesArray) {
    addedHtml += `
      <tr>
        <td>${packageObj.name}</td>
        <td>${packageObj.annualPrice} DH/an</td>
        <td>${packageObj.monthlyPrice} DH/mo</td>
        <td>${packageObj.processorDetails}</td>
        <td>${packageObj.ram}</td>
        <td>${packageObj.storage}</td>
        <td>${packageObj.dataRate}</td>
        <td>${packageObj.dataCenter}</td>
      </tr>
    `;
  }
  dedicatedServersTableBody.innerHTML = addedHtml;
}

/**
 * Fills the hosting products tables with data.
 * @param {string} companyName - The name of the company.
 * @param {Array} hostingProductsArray - The array of hosting products data.
 */
function fillHostingProducts(companyName, hostingProductsArray) {
  let hostingProductsObject;
  for (const el of hostingProductsArray) {
    if (el.companyName === companyName) {
      hostingProductsObject = el;
      break;
    }
  }
  if (!hostingProductsObject) {
    console.error(`No hosting products found for company: ${companyName}`);
    return;
  }
  fillSharedHosting(hostingProductsObject.productsArray[0]);
  fillVPSCloud(hostingProductsObject.productsArray[1]);
  fillWHMReseller(hostingProductsObject.productsArray[2]);
  fillDedicatedServers(hostingProductsObject.productsArray[3]);
}

/**
 * Fetches and fills the hosting products tables with data.
 * @param {string} companyName - The name of the company.
 */
export async function fetchFillHostingProducts(companyName) {
  try {
    const hostingProductsArray = await fetchHostingProducts();
    fillHostingProducts(companyName, hostingProductsArray);
  } catch (error) {
    console.error('Error fetching hosting products:', error);
  }
}