import {fetchGoogleAds} from './general.js';

/**
 * Fills the Google Ads container with specific ads.
 * @param {Array} googleAdsArray - Array of Google Ads to be displayed.
 */
function fillSpecificGoogleAds(googleAdsArray) {
  const googleAdsContainer = document.querySelector(`.google-ads-container-js`);
  if (!googleAdsContainer) {
    console.error('Element .google-ads-container-js not found');
    return;
  }
  let addedHtml = '';
  for (const adObj of googleAdsArray) {
    addedHtml += `
      <div class="ads-elem">
        <div class="ads-img-container">
          ${adObj}
        </div>
      </div>
    `;
  }
  if (googleAdsArray.length === 0) {
    googleAdsContainer.innerHTML = `
      <div class="ads-not-found">
        <div>
          No ads found
        </div>
      </div>
    `;
    googleAdsContainer.classList.remove('google-ads-container-found');
  } else {
    googleAdsContainer.innerHTML = addedHtml;
    googleAdsContainer.classList.add('google-ads-container-found');
  }
}

/**
 * Fills the Google Ads container with ads for a specific company.
 * @param {string} companyName - Name of the company to filter ads.
 * @param {Array} googleAdsArray - Array of Google Ads objects.
 */
function fillGoogleAds(companyName, googleAdsArray) {
  let googleAdsObject;
  for (const el of googleAdsArray) {
    if (el.companyName === companyName) {
      googleAdsObject = el;
      break;
    }
  }
  if (!googleAdsObject) {
    console.error(`No ads found for company: ${companyName}`);
    return;
  }
  fillSpecificGoogleAds(googleAdsObject.googleAdsArray);
}

/**
 * Fetches Google Ads and fills the container with ads for a specific company.
 * @param {string} companyName - Name of the company to filter ads.
 */
export async function fetchFillGoogleAds(companyName) {
  try {
    const googleAdsArray = await fetchGoogleAds();
    fillGoogleAds(companyName, googleAdsArray);
  } catch (error) {
    console.error('Error fetching Google Ads:', error);
  }
}
