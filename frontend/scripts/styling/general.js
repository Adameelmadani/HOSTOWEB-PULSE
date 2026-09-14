import { displayNotifications, countUnreadMessages } from '../data-fetcher/notifications.js';
import { url } from '../data-fetcher/general.js';

/**
 * Change the body's overflow style based on the checkbox state.
 * @function changeBodyOverflow
 */
function changeBodyOverflow() {
  const checkElem = document.querySelector('#check');
  const bodyElem = document.querySelector('body');
  checkElem.addEventListener('change', function() {
    if (this.checked) {
      bodyElem.style.overflow = 'hidden';
    } else {
      bodyElem.style.overflow = 'visible';
    }
  });
}

/**
 * Fetch user data from the server.
 * @async
 * @function fetchUserData
 * @returns {Promise<Object>} The user data.
 * @throws Will throw an error if the network response is not ok.
 */
async function fetchUserData() {
  try {
    const token = localStorage.getItem('token');
    const userDataUrl = url + 'user/get-user-data';
    const data = { token: token };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(userDataUrl, options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

/**
 * Display individual insights, market overview parts, and notifications when clicking.
 * @async
 * @function displayIndOveParts
 * @param {HTMLElement} showedElem - The element to show/hide.
 * @param {HTMLElement} showedElem2 - The second element to show/hide.
 * @param {HTMLElement} buttonElem - The button element to attach the click event.
 */
export function displayIndOveParts(showedElem, showedElem2, buttonElem) {
  let isShowed = false;
  buttonElem.addEventListener("click", async () => {
    try {
      const userData = await fetchUserData();
      const userId = userData.userId;
      const lastMessageId = userData.lastMessageId;

      await countUnreadMessages(lastMessageId);

      if (!isShowed) {
        showedElem2.style.display = 'block';
        showedElem.style.display = 'block';
        if (buttonElem.classList.contains('header-notification')) {
          await displayNotifications(userId, lastMessageId);
        }
        isShowed = true;
      } else {
        showedElem2.style.display = 'none';
        showedElem.style.display = 'none';
        isShowed = false;
      }
    } catch (error) {
      console.error('Error displaying parts:', error);
    }
  });
}

/**
 * Apply hover styling to individual insights and market overview parts.
 * @function hoverIndOveParts
 * @param {string} partClass - The class of the part element.
 * @param {string} imgDivClass - The class of the image div element.
 */
function hoverIndOveParts(partClass, imgDivClass) {
  const partElem = document.querySelector(partClass);
  const imgDivElem = document.querySelector(imgDivClass);
  const imgElem = document.querySelector(imgDivClass + ' i');
  partElem.addEventListener('mouseover', () => {
    imgDivElem.style.backgroundColor = 'rgb(1, 83, 116)';
    imgElem.style.color = 'white';
  });
  partElem.addEventListener('mouseout', () => {
    imgDivElem.style.backgroundColor = 'rgb(243, 247, 249)';
    imgElem.style.color = 'rgb(1, 83, 116)';
  });
}

/**
 * Modify the header styling when scrolling.
 * @function modifyHeaderWhenScroll
 * @param {HTMLElement} header - The header element.
 * @param {HTMLElement} headerButton1 - The first header button element.
 * @param {HTMLElement} headerButton2 - The second header button element.
 * @param {HTMLElement} headerPartsFirst - The first header parts element.
 * @param {HTMLElement} headerPartsSecond - The second header parts element.
 * @param {HTMLElement} headerLogoW - The white logo element.
 * @param {HTMLElement} headerLogoB - The black logo element.
 * @param {HTMLElement} checkbtn - The check button element.
 * @param {HTMLElement} specificDiv - The specific div element.
 * @param {HTMLElement} notificationButton - The notification button element.
 * @param {HTMLElement} notificationIcon - The notification icon element.
 * @param {HTMLElement} showedElemNot - The notification element to show/hide.
 */
function modifyHeaderWhenScroll(header, headerButton1, headerButton2, headerPartsFirst, headerPartsSecond, headerLogoW, headerLogoB, checkbtn, specificDiv, notificationButton, notificationIcon, showedElemNot) {
  const specificDivPosition = specificDiv.getBoundingClientRect().top;
  if (specificDivPosition <= 0) {
    header.classList.add('change-header-background-color');
    if (window.innerWidth > 850) {
      headerButton1.style.color = 'rgb(40, 46, 49)';
      headerButton2.style.color = 'rgb(40, 46, 49)';
    } else {
      headerButton1.style.color = 'white';
      headerButton2.style.color = 'white';
    }
    notificationButton.style.borderColor = 'rgb(10, 46, 65)';
    notificationIcon.style.color = 'rgb(10, 46, 65)';
    headerPartsFirst.style.borderColor = 'rgba(0, 0, 0, 0.15)';
    headerPartsSecond.style.borderColor = 'rgba(0, 0, 0, 0.15)';
    headerLogoW.style.opacity = '0';
    headerLogoB.style.opacity = '1';
    checkbtn.style.color = 'rgb(10, 46, 65)';
    showedElemNot.style.borderColor = 'rgba(0, 0, 0, 0.15)';
  } else {
    header.classList.remove('change-header-background-color');
    headerButton1.style.color = 'white';
    headerButton2.style.color = 'white';
    notificationButton.style.borderColor = 'white';
    notificationIcon.style.color = 'white';
    headerPartsFirst.style.borderColor = 'transparent';
    headerPartsSecond.style.borderColor = 'transparent';
    headerLogoW.style.opacity = '1';
    headerLogoB.style.opacity = '0';
    checkbtn.style.color = 'white';
    showedElemNot.style.borderColor = 'transparent';
  }
}

/**
 * Fix the navigation bar when scrolling.
 * @function fixNavWhenScroll
 */
function fixNavWhenScroll() {
  const navDiv = document.querySelector('.indiv-nav-container');
  const dashboardDiv = document.querySelector('.indiv-dashboard');
  const navSpecificDiv = document.querySelector('.indiv-specific-div');
  const navSpecificDivPosition = navSpecificDiv.getBoundingClientRect().top;
  if (navSpecificDivPosition <= 0 && !navDiv.classList.contains('indiv-nav-container-dynamic')) {
    navDiv.classList.add('indiv-nav-container-dynamic');
    navDiv.classList.remove('indiv-nav-container-static');
    dashboardDiv.style.marginTop = '130px';
  } else if (navSpecificDivPosition > 0 && navDiv.classList.contains('indiv-nav-container-dynamic')) {
    navDiv.classList.add('indiv-nav-container-static');
    navDiv.classList.remove('indiv-nav-container-dynamic');
    dashboardDiv.style.marginTop = '30px';
  }
}

/**
 * Make the page interactive based on the type.
 * @function makeInteractive
 * @param {string} type - The type of interaction.
 */
export function makeInteractive(type) {
  // Executing code from indInsGeneral.js
  changeBodyOverflow();

  // Individual insights
  const showedElemFirst = document.querySelector('.individual-insights-container .ind-ove-parts');
  const showedElem2First = document.querySelector('.individual-insights-container .ind-ove-dropdown');
  const buttonElemFirst = document.querySelector('.individual-insights-container .ind-ove-button');

  displayIndOveParts(showedElemFirst, showedElem2First, buttonElemFirst);
  hoverIndOveParts('.individual-insights-container .ind-ove-part-first', '.individual-insights-container .ind-ove-part-img1');
  hoverIndOveParts('.individual-insights-container .ind-ove-part-last', '.individual-insights-container .ind-ove-part-img2');

  // Market Overview
  const showedElemSecond = document.querySelector('.market-overview-container .ind-ove-parts');
  const showedElem2Second = document.querySelector('.market-overview-container .ind-ove-dropdown');
  const buttonElemSecond = document.querySelector('.market-overview-container .ind-ove-button');

  displayIndOveParts(showedElemSecond, showedElem2Second, buttonElemSecond);
  hoverIndOveParts('.market-overview-container .ind-ove-part-first', '.market-overview-container .ind-ove-part-img1');
  hoverIndOveParts('.market-overview-container .ind-ove-part-second', '.market-overview-container .ind-ove-part-img2');
  hoverIndOveParts('.market-overview-container .ind-ove-part-third', '.market-overview-container .ind-ove-part-img3');
  hoverIndOveParts('.market-overview-container .ind-ove-part-fourth', '.market-overview-container .ind-ove-part-img4');
  hoverIndOveParts('.market-overview-container .ind-ove-part-last', '.market-overview-container .ind-ove-part-img5');

  // Notification
  const showedElemNot = document.querySelector('.header-notification-container .notification-messages');
  const showedElem2Not = document.querySelector('.header-notification-container .notification-dropdown');
  const buttonElemNot = document.querySelector('.header-notification-container .header-notification');

  displayIndOveParts(showedElemNot, showedElem2Not, buttonElemNot);

  // Individual insights and market overview and notification
  const header = document.querySelector('header');
  const headerButton1 = document.querySelector('.individual-insights-container .ind-ove-button p');
  const headerButton2 = document.querySelector('.market-overview-container .ind-ove-button p');
  const headerPartsFirst = document.querySelector('.individual-insights-container .ind-ove-parts');
  const headerPartsSecond = document.querySelector('.market-overview-container .ind-ove-parts');
  const headerLogoW = document.querySelector('.header-title .logo-w');
  const headerLogoB = document.querySelector('.header-title .logo-b');
  const checkbtn = document.querySelector('.checkbtn .fa-bars');
  const notificationButton = document.querySelector('.header-notification');
  const notificationIcon = document.querySelector('.header-notification .fa-bell');
  const specificDiv = document.querySelector('.change-header-background');

  modifyHeaderWhenScroll(header, headerButton1, headerButton2, headerPartsFirst, headerPartsSecond, headerLogoW, headerLogoB, checkbtn, specificDiv, notificationButton, notificationIcon, showedElemNot);
  if (type === 'ind-ins') {
    fixNavWhenScroll();
  }
  window.addEventListener('scroll', () => {
    modifyHeaderWhenScroll(header, headerButton1, headerButton2, headerPartsFirst, headerPartsSecond, headerLogoW, headerLogoB, checkbtn, specificDiv, notificationButton, notificationIcon, showedElemNot);
    if (type === 'ind-ins') {
      fixNavWhenScroll();
    }
  });
  window.addEventListener('resize', () => {
    modifyHeaderWhenScroll(header, headerButton1, headerButton2, headerPartsFirst, headerPartsSecond, headerLogoW, headerLogoB, checkbtn, specificDiv, notificationButton, notificationIcon, showedElemNot);
    if (type === 'ind-ins') {
      fixNavWhenScroll();
    }
  });
}

/**
 * Adjust the count of unread messages.
 * @async
 * @function adjustCount
 */
async function adjustCount() {
  try {
    const userData = await fetchUserData();
    const lastMessageId = userData.lastMessageId;
    await countUnreadMessages(lastMessageId);
  } catch (error) {
    console.error('Error adjusting count:', error);
  }
}

adjustCount();
