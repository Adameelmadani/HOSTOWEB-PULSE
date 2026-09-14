import { url } from "./general.js";
const notificationsUrl = url + 'notifications';
const updateLastReadUrl = url + 'notifications/update-last-read';

/**
 * Fetches notifications from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of notifications.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchNotifications() {
  try {
    const response = await fetch(notificationsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const notifications = await response.json();
    return notifications.reverse();
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
}

/**
 * Updates the last read notification for a user.
 * @param {string} userId - The ID of the user.
 * @param {string} lastMessageId - The ID of the last read message.
 * @returns {Promise<void>}
 * @throws Will throw an error if the fetch operation fails.
 */
async function updateLastRead(userId, lastMessageId) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, lastMessageId })
  };
  try {
    const response = await fetch(updateLastReadUrl, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Failed to update last read notification:', error);
    throw error;
  }
}

/**
 * Counts the number of unread messages.
 * @param {string} lastMessageId - The ID of the last read message.
 * @returns {Promise<void>}
 * @throws Will throw an error if the fetch operation fails.
 */
async function countUnreadMessages(lastMessageId) {
  try {
    const notifications = await fetchNotifications();
    let unreadCount = 0;
    let lastMessageFound = false;

    for (const notification of notifications) {
      if (notification._id === lastMessageId) {
        lastMessageFound = true;
      }
      if (!lastMessageFound) {
        unreadCount++;
      }
    }

    const notificationCounterElem = document.querySelector('.header-notification-counter');
    if (unreadCount === 0) {
      notificationCounterElem.innerHTML = '';
      notificationCounterElem.style.padding = '0px';
    } else if (unreadCount < 10) {
      notificationCounterElem.innerHTML = `0${unreadCount}`;
      notificationCounterElem.style.padding = '2px 3px';
    } else {
      notificationCounterElem.innerHTML = unreadCount;
      notificationCounterElem.style.padding = '2px 3px';
    }
  } catch (error) {
    console.error('Failed to count unread messages:', error);
    throw error;
  }
}

/**
 * Displays notifications and updates the last read notification.
 * @param {string} userId - The ID of the user.
 * @param {string} lastMessageId - The ID of the last read message.
 * @returns {Promise<void>}
 * @throws Will throw an error if the fetch operation fails.
 */
async function displayNotifications(userId, lastMessageId) {
  try {
    const notifications = await fetchNotifications();
    const notificationMessagesDiv = document.querySelector('.notification-messages');
    notificationMessagesDiv.innerHTML = '';

    let lastMessageFound = false;

    notifications.forEach(notification => {
      const notificationDiv = document.createElement('div');
      notificationDiv.textContent = notification.text;
      if (notification._id === lastMessageId) {
        lastMessageFound = true;
      }
      if (!lastMessageFound) {
        notificationDiv.style.backgroundColor = 'lightblue';
      }
      notificationMessagesDiv.appendChild(notificationDiv);
    });

    const firstNotificationId = notifications[0]._id;
    await updateLastRead(userId, firstNotificationId);

    await countUnreadMessages(lastMessageId); // Call the function to count unread messages
  } catch (error) {
    console.error('Failed to display notifications:', error);
    throw error;
  }
}

export { displayNotifications, countUnreadMessages };