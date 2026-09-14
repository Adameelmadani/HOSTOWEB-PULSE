import {fetchFacebookAds} from './general.js';
import {slideSlider} from '../styling/ind-ins-digital-marketing.js';

/**
 * Fills the Facebook Ads section with specific ads data.
 * @param {Array} facebookAdsArray - Array of Facebook ads objects.
 * @param {string} companyName - Name of the company.
 */
function fillSpecificFacebookAds(facebookAdsArray, companyName) {
  const facebookAdsContainer = document.querySelector(`.facebook-ads-slides-container`);
  const facebookAdsNotFound = document.querySelector('.ads-not-found');
  const facebookAdsSlides = document.querySelector('.facebook-ads-slides');
  if (!facebookAdsContainer) {
    console.error('Element .facebook-ads-slides-container not found');
    return;
  }
  if (!facebookAdsNotFound) {
    console.error('Element .ads-not-found not found');
    return;
  }
  if (!facebookAdsSlides) {
    console.error('Element .facebook-ads-slides not found');
    return;
  }
  let addedHtml = '';
  for (const adObj of facebookAdsArray) {
    let platformArray = '';
    adObj.platformArray.forEach((el) => {
      platformArray += el;
    });
    addedHtml += `
      <div class="ads-slide facebook-ads-slide">
        <div class="slide-text">
          <div class="slide-text-title">${companyName}</div>
          <div class="slide-text-description">${adObj.text}</div>
          <div class="slide-text-links">
            <div class="slide-text-links-title">Plateformes:</div>
            <ul class="slide-text-links-container">
              ${platformArray}
            </ul>
          </div>
          <div class="slide-text-date">${adObj.date}</div>
        </div>
        <div class="slide-media">${adObj.image}</div>
      </div>
    `;
  }
  facebookAdsSlides.innerHTML = addedHtml;
  if (facebookAdsArray.length === 0) {
    facebookAdsContainer.style.display = 'none';
    facebookAdsNotFound.style.display = 'flex';
  } else {
    facebookAdsContainer.style.display = 'block';
    facebookAdsNotFound.style.display = 'none';
  }
}

/**
 * Filters and fills the Facebook Ads section for a specific company.
 * @param {string} companyName - Name of the company.
 * @param {Array} facebookAdsArray - Array of Facebook ads objects.
 */
function fillFacebookAds(companyName, facebookAdsArray) {
  let facebookAdsObject;
  for (const el of facebookAdsArray) {
    if (el.companyName === companyName) {
      facebookAdsObject = el;
      break;
    }
  }
  if (facebookAdsObject) {
    fillSpecificFacebookAds(facebookAdsObject.facebookAdsArray, companyName);
  } else {
    console.error(`No Facebook ads found for company: ${companyName}`);
  }
}

/**
 * Fetches Facebook Ads data and fills the section for a specific company.
 * @param {string} companyName - Name of the company.
 */
export async function fetchFillFacebookAds(companyName) {
  try {
    const facebookAdsArray = await fetchFacebookAds();
    fillFacebookAds(companyName, facebookAdsArray);
    slideSlider('.facebook-ads-slides', '.facebook-ads-slide', '.facebook-ads-prev', '.facebook-ads-next');
  } catch (error) {
    console.error('Error fetching Facebook ads:', error);
  }
}