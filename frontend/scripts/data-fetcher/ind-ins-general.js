import { fetchCompanies } from './general.js';
const logosPath = './assets/company-logos/';

// Indiv Ins Nav
/**
 * Fills the individual navigation with company logos.
 * @param {Array} companies - Array of company objects.
 */
function fillIndivNav(companies) {
  const indivNav = document.querySelector('.indiv-nav-js');
  if (!indivNav) {
    console.error('Element .indiv-nav-js not found');
    return;
  }
  let addedHtml = '';
  for (const company of companies) {
    addedHtml += `
      <a data-name="${company.name}" class="indiv-nav-not-clicked-js">
        <img src="${logosPath}${company.logoSrc}" alt="img-${company.name}" width="150px">
      </a>
    `;
  }
  indivNav.innerHTML = addedHtml;
}

/**
 * Fetches companies and fills the individual navigation.
 * @returns {Promise<void>}
 */
export async function fetchFillIndivNav() {
  try {
    const companies = await fetchCompanies();
    fillIndivNav(companies);
  } catch (error) {
    console.error('Error fetching and filling individual navigation:', error);
  }
}

// Choose Company
/**
 * Styles the default company in the navigation.
 * @param {NodeList} indivNavElems - List of navigation elements.
 * @param {string} companyName - Name of the company to style.
 */
export function styleDefaultCompany(indivNavElems, companyName) {
  const defaultCompany = localStorage.getItem('defaultCompany');
  if (defaultCompany === companyName) {
    return;
  }
  for (const companyATag of indivNavElems) {
    if (companyATag.getAttribute('data-name') === companyName) {
      companyATag.classList.remove('indiv-nav-not-clicked-js');
      companyATag.classList.add('indiv-nav-clicked-js');
    } else if (companyATag.getAttribute('data-name') === defaultCompany) {
      companyATag.classList.remove('indiv-nav-clicked-js');
      companyATag.classList.add('indiv-nav-not-clicked-js');
    }
  }
}

/**
 * Styles the first default company in the navigation.
 */
export function styleFirstDefaultCompany() {
  const defaultCompany = localStorage.getItem('defaultCompany');
  const indivNavElems = document.querySelectorAll('.indiv-nav-js a');
  let companyName;
  for (const companyATag of indivNavElems) {
    companyName = companyATag.getAttribute('data-name');
    if (companyName === defaultCompany) {
      companyATag.classList.remove('indiv-nav-not-clicked-js');
      companyATag.classList.add('indiv-nav-clicked-js');
    }
  }
}