import {fetchSocialMediaReach} from './general.js';

/**
 * Fills the specific social media reach data into the DOM.
 * @param {Array} socialMediaArray - Array of social media reach objects.
 */
function fillSpecificSocialMediaReach(socialMediaArray) {
  try {
    for (const el of socialMediaArray) {
      document.querySelector(`.${el.name}-container .number`).innerHTML = el.numberOfFollowers;
    }
  } catch (error) {
    console.error('Error filling specific social media reach:', error);
  }
}

/**
 * Fills the social media reach data for a specific company into the DOM.
 * @param {string} companyName - The name of the company.
 * @param {Array} socialMediaReachArray - Array of social media reach objects.
 */
function fillSocialMediaReach(companyName, socialMediaReachArray) {
  try {
    let socialMediaReachObject;
    for (const el of socialMediaReachArray) {
      if (el.companyName === companyName) {
        socialMediaReachObject = el;
        break;
      }
    }
    if (socialMediaReachObject) {
      fillSpecificSocialMediaReach(socialMediaReachObject.socialMediaArray);
    } else {
      console.warn(`No social media reach data found for company: ${companyName}`);
    }
  } catch (error) {
    console.error('Error filling social media reach:', error);
  }
}

/**
 * Fetches and fills the social media reach data for a specific company.
 * @param {string} companyName - The name of the company.
 */
export async function fetchFillSocialMediaReach(companyName) {
  try {
    const socialMediaReachArray = await fetchSocialMediaReach();
    fillSocialMediaReach(companyName, socialMediaReachArray);
  } catch (error) {
    console.error('Error fetching and filling social media reach:', error);
  }
}