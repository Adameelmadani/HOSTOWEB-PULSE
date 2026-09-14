export const url = 'http://hostowebpulse.intellipow.me:5000/api/';
export const extensionPricesUrl = url + 'extension-prices';
export const companiesUrl = url + 'companies';
export const hostingProductsUrl = url + 'hosting-products';
export const securityOffersUrl = url + 'security-offers';
export const googleAdsUrl = url + 'google-ads';
export const facebookAdsUrl = url + 'facebook-ads';
export const socialMediaReachUrl = url + 'social-media-reach';
export const blogsUrl = url + 'blogs';

/**
 * Fetches companies data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the companies data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchCompanies() {
  try {
    const response = await fetch(companiesUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const companies = await response.json();
    return companies;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches extension prices data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the extension prices data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchExtensionPrices() {
  try {
    const response = await fetch(extensionPricesUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const extensionPrices = await response.json();
    return extensionPrices;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches hosting products data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the hosting products data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchHostingProducts() {
  try {
    const response = await fetch(hostingProductsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const hostingProducts = await response.json();
    return hostingProducts;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches security offers data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the security offers data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchSecurityOffers() {
  try {
    const response = await fetch(securityOffersUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const securityOffers = await response.json();
    return securityOffers;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches Google Ads data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the Google Ads data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchGoogleAds() {
  try {
    const response = await fetch(googleAdsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const googleAds = await response.json();
    return googleAds;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches Facebook Ads data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the Facebook Ads data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchFacebookAds() {
  try {
    const response = await fetch(facebookAdsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const facebookAds = await response.json();
    return facebookAds;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches social media reach data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the social media reach data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchSocialMediaReach() {
  try {
    const response = await fetch(socialMediaReachUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const socialMediaReach = await response.json();
    return socialMediaReach;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}

/**
 * Fetches blogs data from the API.
 * @returns {Promise<Object[]>} - A promise that resolves to the blogs data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchBlogs() {
  try {
    const response = await fetch(blogsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
    throw error;
  }
}
