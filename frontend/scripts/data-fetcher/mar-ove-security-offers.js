import {fetchSecurityOffers} from './general.js';
import { chartCreator } from './mar-ove-general.js';

/**
 * Fills the security offers part by creating charts for minimum and maximum annual prices.
 * @param {Array} securityOffersArray - Array of security offers.
 * @param {string} securityOffersType - Type of security offers.
 * @param {number} securityOffersIndex - Index of the security offers.
 */
function fillSecurityOffersPart(securityOffersArray, securityOffersType, securityOffersIndex) {
  try {
    const companiesNames = securityOffersArray.map(el => el.companyName);
    const securityOffersPartArray = securityOffersArray.map(el => el.productsArray[securityOffersIndex].packagesArray);
    for (let i = 0; i < companiesNames.length; i++) {
      if (securityOffersPartArray[i].length === 0) {
        companiesNames.splice(i, 1);
        securityOffersPartArray.splice(i, 1);
        i--;
      } else if (securityOffersPartArray[i][0].annualPrice === '-') {
        companiesNames.splice(i, 1);
        securityOffersPartArray.splice(i, 1);
        i--;
      }
    }
    const labelTitle = 'Price/Year';

    const minChartClass = `${securityOffersType}-min`;
    const minArray = securityOffersPartArray.map(el => el.reduce((min, current) => (current.annualPrice < min ? current.annualPrice : min), el[0].annualPrice));
    let minMin = minArray.reduce((min, current) => (current < min ? current : min), minArray[0]);
    if (minMin > 20) {
      minMin -= 20;
    }
    const maxMin = minArray.reduce((max, current) => (current > max ? current : max), minArray[0]) + 20;
    chartCreator(minChartClass, companiesNames, labelTitle, minArray, minMin, maxMin, 20);

    const maxChartClass = `${securityOffersType}-max`;
    const maxArray = securityOffersPartArray.map(el => el.reduce((max, current) => (current.annualPrice > max ? current.annualPrice : max), el[0].annualPrice));
    let minMax = maxArray.reduce((min, current) => (current < min ? current : min), maxArray[0]);
    if (minMax > 100) {
      minMax -= 100;
    }
    const maxMax = maxArray.reduce((max, current) => (current > max ? current : max), maxArray[0]) + 100;
    chartCreator(maxChartClass, companiesNames, labelTitle, maxArray, minMax, maxMax, 100);
  } catch (error) {
    console.error('Error in fillSecurityOffersPart:', error);
  }
}

/**
 * Fetches security offers and fills the security offers parts.
 */
async function fillSecurityOffers() {
  try {
    const securityOffersArray = await fetchSecurityOffers();
    fillSecurityOffersPart(securityOffersArray, 'rapid-ssl', 0);
    fillSecurityOffersPart(securityOffersArray, 'geotrust', 1);
    fillSecurityOffersPart(securityOffersArray, 'digicert', 2);
  } catch (error) {
    console.error('Error in fillSecurityOffers:', error);
  }
}

window.onload = async function() {
  try {
    await fillSecurityOffers();
  } catch (error) {
    console.error('Error in window.onload:', error);
  }
}
