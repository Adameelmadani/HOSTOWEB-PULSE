import { fetchCompanies } from './general.js';
import { fetchFillIndivNav, styleDefaultCompany, styleFirstDefaultCompany } from './ind-ins-general.js';
import { fetchFillExtensionPrices } from './ind-ins-extension-prices.js';
import { fetchFillHostingProducts } from './ind-ins-hosting-products.js';
import { fetchFillSecurityOffers } from './ind-ins-security-offers.js';

/**
 * Fetches and fills data with the default company.
 * @async
 * @function fetchFillWithDefaultCompany
 * @returns {Promise<void>}
 */
async function fetchFillWithDefaultCompany() {
  try {
    const companyName = localStorage.getItem('defaultCompany');
    await fetchFillExtensionPrices(companyName);
    await fetchFillHostingProducts(companyName);
    await fetchFillSecurityOffers(companyName);
    await styleWithColorOfCompany(companyName);
  } catch (error) {
    console.error('Error fetching and filling with default company:', error);
  }
}

/**
 * Styles elements with the colors of the specified company.
 * @async
 * @function styleWithColorOfCompany
 * @param {string} companyName - The name of the company.
 * @returns {Promise<void>}
 */
async function styleWithColorOfCompany(companyName) {
  try {
    let companyObj;
    const companies = await fetchCompanies();
    for (const el of companies) {
      if (el.name === companyName) {
        companyObj = el;
        break;
      }
    }

    const domainNames = document.querySelectorAll('.table-extensions-price-ht tbody tr .domain-names div');
    domainNames.forEach((d) => {
      d.style.color = companyObj.secondaryColor;
      d.style.backgroundColor = companyObj.primaryColor;  
    });

    const div = document.querySelectorAll('.shared-hosting, .cloud-vps, .whm-reseller, .dedicated-servers');
    div.forEach((d) => {
      d.querySelector('.hosting-products-titles').style.backgroundColor = companyObj.secondaryColor;
      d.querySelectorAll('tr').forEach((tr) => {
        tr.style.borderColor = companyObj.primaryColor;
      });
    });
  } catch (error) {
    console.error('Error styling with color of company:', error);
  }
}

/**
 * Adds event listeners to navigation elements to fetch and fill data with the selected company.
 * @async
 * @function fetchFillWithRightCompany
 * @returns {Promise<void>}
 */
async function fetchFillWithRightCompany() {
  try {
    const indivNavElems = document.querySelectorAll('.indiv-nav-js a');
    for (const indivNavElem of indivNavElems) {
      indivNavElem.addEventListener('click', async () => {
        try {
          const companyName = indivNavElem.getAttribute('data-name');
          styleDefaultCompany(indivNavElems, companyName);
          localStorage.setItem('defaultCompany', companyName);
          await fetchFillWithDefaultCompany();
        } catch (error) {
          console.error('Error fetching and filling with right company on click:', error);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching and filling with right company:', error);
  }
}

/**
 * Initializes the page by setting the default company and fetching necessary data.
 * @async
 * @function window.onload
 * @returns {Promise<void>}
 */
window.onload = async function() {
  try {
    localStorage.setItem('defaultCompany', 'hostoweb');
    await fetchFillIndivNav();
    styleFirstDefaultCompany();
    await fetchFillWithDefaultCompany();
    await fetchFillWithRightCompany();
  } catch (error) {
    console.error('Error during window onload initialization:', error);
  }
}
