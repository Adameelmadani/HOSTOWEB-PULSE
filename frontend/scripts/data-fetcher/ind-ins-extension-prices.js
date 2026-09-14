import { fetchExtensionPrices } from './general.js';

/**
 * Fills the extension prices table with data for the specified company.
 * @param {string} companyName - The name of the company.
 * @param {Array} extensionPricesArray - The array of extension prices.
 */
function fillExtensionPrices(companyName, extensionPricesArray) {
  const extensionPricesTableBody = document.querySelector('.table-extensions-price-ht-js tbody');
  if (!extensionPricesTableBody) {
    console.error('Element .table-extensions-price-ht-js tbody not found');
    return;
  }
  let addedHtml = '';
  let extensionsObject;
  for (const el of extensionPricesArray) {
    if (el.companyName === companyName) {
      extensionsObject = el;
      break;
    }
  }
  if (!extensionsObject) {
    console.error(`No extension prices found for company: ${companyName}`);
    return;
  }
  const extensionsArray = extensionsObject.extensionsArray;
  for (const extension of extensionsArray) {
    addedHtml += `
      <tr>
        <td class="domain-names"><div>${extension.name}</div></td>
        <td>${extension.pricePerYear} DH</td>
        <td>${extension.transfer} DH</td>
      </tr>
    `;
  }
  extensionPricesTableBody.innerHTML = addedHtml;
}

/**
 * Fetches the extension prices and fills the table for the specified company.
 * @param {string} companyName - The name of the company.
 */
export async function fetchFillExtensionPrices(companyName) {
  try {
    const extensionPricesArray = await fetchExtensionPrices();
    fillExtensionPrices(companyName, extensionPricesArray);
  } catch (error) {
    console.error('Error fetching extension prices:', error);
  }
}