import {fetchBlogs} from './general.js';
import {slideSlider} from '../styling/ind-ins-digital-marketing.js';

/**
 * Fills the specific blogs into the slider.
 * @param {Array} blogsArray - Array of blog objects to be displayed.
 */
function fillSpecificBlogs(blogsArray) {
  try {
    const blogsContainer = document.querySelector(`.blogs-slider`);
    const blogsNotFound = document.querySelector('.blogs-not-found');
    const blogsSlides = document.querySelector('.blogs-slides');
    
    // Check if the required elements are present in the DOM
    if (!blogsContainer) {
      console.error('Element .blogs-slider not found');
      return;
    }
    if (!blogsNotFound) {
      console.error('Element .blogs-not-found not found');
      return;
    }
    if (!blogsSlides) {
      console.error('Element .blogs-slides not found');
      return;
    }

    // Generate HTML for each blog and append to the blogsSlides container
    let addedHtml = '';
    for (const blogObj of blogsArray) {
      addedHtml += `
        <div class="blogs-slide">
          <div class="slide-text">
            <div class="slide-text-title">${blogObj.title}</div>
            <div class="slide-text-description">${blogObj.text}</div>
            <div class="slide-text-date">${blogObj.date}</div>
          </div>
          <div class="slide-media">${blogObj.image}</div>
        </div>
      `;
    }
    blogsSlides.innerHTML = addedHtml;

    // Display or hide the blogs container based on the presence of blogs
    if (blogsArray.length === 0) {
      blogsContainer.style.display = 'none';
      blogsNotFound.style.display = 'flex';
    } else {
      blogsContainer.style.display = 'block';
      blogsNotFound.style.display = 'none';
    }
  } catch (error) {
    console.error('Error filling specific blogs:', error);
  }
}

/**
 * Fills all blogs into the all-blogs-container.
 * @param {Array} blogsArray - Array of blog objects to be displayed.
 */
function fillAllBlogs(blogsArray) {
  try {
    const allBlogsContainer = document.querySelector('.all-blogs-container');
    const numberOfBlogs = document.querySelector('.number-of-blogs');

    // Update the number of blogs
    numberOfBlogs.innerHTML = `Number of blogs: ${blogsArray.length}`;

    // Generate HTML for each blog and append to the allBlogsContainer
    let addedHtml = '';
    for (const blogObj of blogsArray) {
      addedHtml += `
        <div class="blog-elem">
          <div class="blog-title">${blogObj.title}</div>
          <div class="blog-media">${blogObj.image}</div>
        </div>
      `;
    }
    allBlogsContainer.innerHTML = addedHtml;
  } catch (error) {
    console.error('Error filling all blogs:', error);
  }
}

/**
 * Fills blogs based on the company name.
 * @param {string} companyName - The name of the company whose blogs are to be displayed.
 * @param {Array} blogsArray - Array of blog objects.
 */
function fillBlogs(companyName, blogsArray) {
  try {
    let blogsObject;

    // Find the blogs object for the specified company
    for (const el of blogsArray) {
      if (el.companyName === companyName) {
        blogsObject = el;
        break;
      }
    }

    if (!blogsObject) {
      console.error(`No blogs found for company: ${companyName}`);
      return;
    }

    // Fill specific and all blogs using the found blogs object
    fillSpecificBlogs(blogsObject.blogsPackageArray);
    fillAllBlogs(blogsObject.blogsPackageArray);
  } catch (error) {
    console.error('Error filling blogs:', error);
  }
}

/**
 * Fetches blogs and fills them into the DOM.
 * @param {string} companyName - The name of the company whose blogs are to be displayed.
 */
export async function fetchFillBlogs(companyName) {
  try {
    const blogsArray = await fetchBlogs();
    fillBlogs(companyName, blogsArray);
    slideSlider('.blogs-slides', '.blogs-slide', '.blogs-prev', '.blogs-next');
  } catch (error) {
    console.error('Error fetching and filling blogs:', error);
  }
}