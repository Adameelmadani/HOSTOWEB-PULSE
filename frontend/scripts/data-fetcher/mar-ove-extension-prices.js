import {fetchExtensionPrices} from './general.js';
import { chartCreator } from './mar-ove-general.js';

/**
 * Fetches extension prices and populates the dashboard with charts.
 * @async
 * @function fillExtensionPrices
 * @returns {Promise<void>}
 */
async function fillExtensionPrices() {
  try {
    const extensionPricesArray = await fetchExtensionPrices();
    const domains = [];
    for (const el of extensionPricesArray[0].extensionsArray) {
      domains.push(el.name);
    }

    const labelTitle = 'Price/Year';
    // Price per year
    const priceYearDashboard = document.querySelector('.price-year-dashboard');
    let addedHTML = '';
    let chartObjects = [];
    for (const domain of domains) {
      const chartId = `price-year-domain-${domain.substring(1)}`;
      const dataLabels = [];
      const dataSets = [];
      let dataMin;
      let dataMax;
      for(const [i, el] of extensionPricesArray.entries()) {
        dataLabels.push(el.companyName);
        for (const extEl of el.extensionsArray) {
          if (extEl.name === domain) {
            dataSets.push(extEl.pricePerYear);
            if (i === 0) {
              dataMin = extEl.pricePerYear;
              dataMax = extEl.pricePerYear;
            } else {
              dataMin = Math.min(dataMin, extEl.pricePerYear);
              dataMax = Math.max(dataMax, extEl.pricePerYear);
            }
          }
        }
      }
      if (dataMin !== 0) {
        dataMin--;
      }
      dataMax++;

      addedHTML += `
        <div class="domain-container">
          <p class="domain-title">${domain}</p>
          <div class="domain-chart-container">
            <canvas id="${chartId}"></canvas>
          </div>
        </div>
      `;
      
      chartObjects.push({chartId, dataLabels, labelTitle, dataSets, dataMin, dataMax});
    }
    priceYearDashboard.innerHTML = addedHTML;
    for (const chartObject of chartObjects) {
      chartCreator(chartObject.chartId, chartObject.dataLabels, chartObject.labelTitle, chartObject.dataSets, chartObject.dataMin, chartObject.dataMax, 1);
    }

    // Transfer
    const transferDashboard = document.querySelector('.transfer-dashboard');
    addedHTML = '';
    chartObjects = [];
    for (const domain of domains) {
      const chartId = `transfer-domain-${domain.substring(1)}`;
      const dataLabels = [];
      const dataSets = [];
      let dataMin;
      let dataMax;
      for(const [i, el] of extensionPricesArray.entries()) {
        dataLabels.push(el.companyName);
        for (const extEl of el.extensionsArray) {
          if (extEl.name === domain) {
            dataSets.push(extEl.transfer);
            if (i === 0) {
              dataMin = extEl.transfer;
              dataMax = extEl.transfer;
            } else {
              dataMin = Math.min(dataMin, extEl.transfer);
              dataMax = Math.max(dataMax, extEl.transfer);
            }
          }
        }
      }
      if (dataMin !== 0) {
        dataMin--;
      }
      dataMax++;

      addedHTML += `
        <div class="domain-container">
          <p class="domain-title">${domain}</p>
          <div class="domain-chart-container">
            <canvas id="${chartId}"></canvas>
          </div>
        </div>
      `;
      
      chartObjects.push({chartId, dataLabels, labelTitle, dataSets, dataMin, dataMax});
    }
    transferDashboard.innerHTML = addedHTML;
    for (const chartObject of chartObjects) {
      chartCreator(chartObject.chartId, chartObject.dataLabels, chartObject.labelTitle, chartObject.dataSets, chartObject.dataMin, chartObject.dataMax, 1);
    }
  } catch (error) {
    console.error('Error fetching or processing extension prices:', error);
  }
}

/**
 * Initializes the page by filling extension prices on window load.
 * @async
 * @function
 * @returns {Promise<void>}
 */
window.onload = async function() {
  try {
    await fillExtensionPrices();
  } catch (error) {
    console.error('Error during window onload execution:', error);
  }
}
