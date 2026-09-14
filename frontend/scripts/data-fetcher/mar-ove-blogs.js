import {fetchBlogs} from './general.js';
import { chartCreator } from './mar-ove-general.js';

/**
 * Fetches blogs data and creates a chart.
 * @async
 * @function fillBlogs
 * @returns {Promise<void>}
 */
async function fillBlogs() {
  try {
    const blogsArray = await fetchBlogs();
    const chartId = 'blogs';
    const dataLabels = [];
    const labelTitle = 'Number of blogs';
    const dataSets = [];
    for (const el of blogsArray) {
      dataLabels.push(el.companyName);
      dataSets.push(el.blogsPackageArray.length);
    }
    let dataMin = dataSets.reduce((min, current) => (current < min ? current : min), dataSets[0]);
    if (dataMin !== 0) {
      dataMin--;
    }
    const dataMax = dataSets.reduce((max, current) => (current > max ? current : max), dataSets[0]) + 1;
    const step = 5;
    chartCreator(chartId, dataLabels, labelTitle, dataSets, dataMin, dataMax, step);
  } catch (error) {
    console.error('Error fetching or processing blogs data:', error);
  }
}

/**
 * Initializes the page by filling blogs data on window load.
 * @async
 * @function
 * @returns {Promise<void>}
 */
window.onload = async function() {
  try {
    await fillBlogs();
  } catch (error) {
    console.error('Error during window onload:', error);
  }
}
