import { makeInteractive } from "./general.js";

makeInteractive('ind-ins');

/**
 * Function to handle the "See All Blogs" button click event.
 * @function seeAllBlogs
 */
function seeAllBlogs() {
  try {
    const body = document.querySelector('body');
    const seeAllBlogsButton = document.querySelector('.see-all-blogs-button');
    const xCloseAllBlogs = document.querySelector('.x-close-all-blogs');
    const allBlogsElem = document.querySelector('.see-all-blogs');

    if (!seeAllBlogsButton || !xCloseAllBlogs || !allBlogsElem) {
      throw new Error('Required elements not found');
    }

    seeAllBlogsButton.addEventListener('click', () => {
      allBlogsElem.style.display = 'block';
      body.style.overflow = 'hidden';
    });

    xCloseAllBlogs.addEventListener('click', () => {
      allBlogsElem.style.display = 'none';
      body.style.overflow = 'visible';
    });
  } catch (error) {
    console.error('Error in seeAllBlogs function:', error);
  }
}
seeAllBlogs();

/**
 * Function to handle the slider functionality.
 * @function slideSlider
 * @param {string} slidesClass - The class of the slides container.
 * @param {string} slideCountClass - The class of the individual slides.
 * @param {string} prevButtonClass - The class of the previous button.
 * @param {string} nextButtonClass - The class of the next button.
 */
export function slideSlider(slidesClass, slideCountClass, prevButtonClass, nextButtonClass) {
  try {
    let currentIndex = 0;

    const slides = document.querySelector(slidesClass);
    const slideCount = document.querySelectorAll(slideCountClass).length;
    const prevButton = document.querySelector(prevButtonClass);
    const nextButton = document.querySelector(nextButtonClass);

    if (!slides || !prevButton || !nextButton) {
      throw new Error('Required elements not found');
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
      updateSlidePosition();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
      updateSlidePosition();
    });

    function updateSlidePosition() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  } catch (error) {
    console.error('Error in slideSlider function:', error);
  }
}
