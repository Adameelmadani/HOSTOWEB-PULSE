const setCompanies = require("./controllers/company-controller");
const setExtensionPrices = require("./controllers/extension-prices-controller");
const setHostingProducts = require("./controllers/hosting-products-controller");
const setSecurityOffers = require("./controllers/security-offers-controller");
const setBlogs = require("./controllers/blogs-controller");
const setFacebookAds = require("./controllers/facebook-ads-controller");
const setGoogleAds = require("./controllers/google-ads-controller");

const interval = 86400000;  // 1 day = 86,400,000 ms

async function executeTasks() {
	setCompanies();
	await setExtensionPrices();
	await setHostingProducts();
	await setSecurityOffers();
	await setBlogs();
	await setFacebookAds();
	await setGoogleAds();
	console.log("Done");
}

setInterval(executeTasks, interval);
