import { fetchSecurityOffers } from './general.js';

/**
 * Fills the table with specific security offers.
 * @param {Object} securityOffersObject - The security offers object containing the packages array.
 */
function fillSpecificSecurityOffers(securityOffersObject) {
  try {
    const securityOffersTableBody = document.querySelector(`.${securityOffersObject.name}-table-js tbody`);
    if (!securityOffersTableBody) {
      console.error(`Element .${securityOffersObject.name}-table-js tbody not found`);
      return;
    }
    let addedHtml = '';
    const packagesArray = securityOffersObject.packagesArray;
    for (const packageObj of packagesArray) {
      addedHtml += `
        <tr>
          <td>${packageObj.name}</td>
          <td>${packageObj.annualPrice} DH/an</td>
          <td>${packageObj.validation}</td>
        </tr>
      `;
    }
    securityOffersTableBody.innerHTML = addedHtml;
  } catch (error) {
    console.error('Error filling specific security offers:', error);
  }
}

/**
 * Fills the security offers for a specific company.
 * @param {string} companyName - The name of the company.
 * @param {Array} securityOffersArray - The array of security offers.
 */
function fillSecurityOffers(companyName, securityOffersArray) {
  try {
    let securityOffersObject;
    for (const el of securityOffersArray) {
      if (el.companyName === companyName) {
        securityOffersObject = el;
        break;
      }
    }
    if (!securityOffersObject) {
      console.error(`Security offers for company ${companyName} not found`);
      return;
    }
    for (let i = 0; i < securityOffersObject.productsArray.length; i++) {
      fillSpecificSecurityOffers(securityOffersObject.productsArray[i]);
    }
  } catch (error) {
    console.error('Error filling security offers:', error);
  }
}

/**
 * Fetches and fills the security offers for a specific company.
 * @param {string} companyName - The name of the company.
 */
export async function fetchFillSecurityOffers(companyName) {
  try {
    const securityOffersArray = await fetchSecurityOffers();
    fillSecurityOffers(companyName, securityOffersArray);
  } catch (error) {
    console.error('Error fetching and filling security offers:', error);
  }
}