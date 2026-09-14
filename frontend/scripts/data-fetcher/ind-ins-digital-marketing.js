import { fetchFillIndivNav, styleDefaultCompany, styleFirstDefaultCompany } from './ind-ins-general.js';
import { fetchFillGoogleAds } from './ind-ins-google-ads.js';
import { fetchFillFacebookAds } from './ind-ins-facebook-ads.js';
import { fetchFillSocialMediaReach } from './ind-ins-social-media-reach.js';
import { fetchFillBlogs } from './ind-ins-blogs.js';

/**
 * Fetches and fills data for the default company.
 * @async
 * @function fetchFillWithDefaultCompany
 * @returns {Promise<void>}
 */
async function fetchFillWithDefaultCompany() {
  try {
    const companyName = localStorage.getItem('defaultCompany');
    await fetchFillGoogleAds(companyName);
    await fetchFillFacebookAds(companyName);
    await fetchFillSocialMediaReach(companyName);
    await fetchFillBlogs(companyName);
  } catch (error) {
    console.error('Error fetching data for the default company:', error);
  }
}

/**
 * Adds event listeners to individual navigation elements and fetches data for the selected company.
 * @async
 * @function fetchFillWithRightCompany
 * @returns {Promise<void>}
 */
async function fetchFillWithRightCompany() {
  const indivNavElems = document.querySelectorAll('.indiv-nav-js a');
  for (const indivNavElem of indivNavElems) {
    indivNavElem.addEventListener('click', async () => {
      try {
        const companyName = indivNavElem.getAttribute('data-name');

        // Style default company
        styleDefaultCompany(indivNavElems, companyName);

        localStorage.setItem('defaultCompany', companyName);
        await fetchFillWithDefaultCompany();
      } catch (error) {
        console.error('Error fetching data for the selected company:', error);
      }
    });
  }
}

/**
 * Initializes the page by setting the default company and fetching initial data.
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
    console.error('Error during page initialization:', error);
  }
}
