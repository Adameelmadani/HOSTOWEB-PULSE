import {fetchSocialMediaReach} from './general.js';
import { chartCreator } from './mar-ove-general.js';

/**
 * Fetches social media reach data and fills the charts.
 * @async
 * @function fetchFillSocialMediaReach
 * @returns {Promise<void>}
 */
async function fetchFillSocialMediaReach() {
  try {
    const socialMediaReachArray = await fetchSocialMediaReach();
    fillSocialMediaReach(socialMediaReachArray);
  } catch (error) {
    console.error('Error fetching social media reach data:', error);
  }
}

/**
 * Fills the social media reach charts with data.
 * @function fillSocialMediaReach
 * @param {Array} socialMediaReachArray - Array of social media reach data.
 */
function fillSocialMediaReach(socialMediaReachArray) {
  for (let i = 0; i < 4; i++) {
    const chartId = socialMediaReachArray[0].socialMediaArray[i].name;
    const dataLabels = [];
    const labelTitle = 'Number of followers';
    const dataSets = [];
    for (const el of socialMediaReachArray) {
      const numberFollowers = el.socialMediaArray[i].numberOfFollowers;
      if (numberFollowers === '-') {
        continue;
      }
      dataLabels.push(el.companyName);
      dataSets.push(numberFollowers);
    }
    const dataMin = dataSets.reduce((min, current) => (current < min ? current : min), dataSets[0]) - 1;
    const dataMax = dataSets.reduce((max, current) => (current > max ? current : max), dataSets[0]) + 1;
    const step = 50;
    chartCreator(chartId, dataLabels, labelTitle, dataSets, dataMin, dataMax, step);
  }
}

/**
 * Initializes the fetching and filling of social media reach data on window load.
 * @async
 * @function onload
 * @returns {Promise<void>}
 */
window.onload = async function() {
  try {
    await fetchFillSocialMediaReach();
  } catch (error) {
    console.error('Error during window onload:', error);
  }
}
