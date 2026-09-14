const dbClient = require('../utils/db');
const {
  SharedHosting,
  wsSharedHostingHostoweb,
  wsSharedHostingCapconnect,
  wsSharedHostingGenious,
  wsSharedHostingHeberfacile,
  wsSharedHostingNindohost,
  wsSharedHostingAdkmedia
} = require('./shared-hosting-web-scraper');
const {
  VPSCloud,
  wsVPSCloudHostoweb,
  wsVPSCloudCapconnect,
  wsVPSCloudGenious,
  wsVPSCloudNindohost,
  wsVPSCloudHeberfacile,
  wsVPSCloudAdkmedia
} = require('./vpscloud-web-scraper');
const {
  WHMReseller,
  wsWHMResellerHostoweb,
  wsWHMResellerCapconnect,
  wsWHMResellerGenious,
  wsWHMResellerNindohost,
  wsWHMResellerHeberfacile
} = require('./whm-reseller-web-scraper');
const {
  DedicatedServers,
  wsDedicatedServersHostoweb,
  wsDedicatedServersCapconnect,
  wsDedicatedServersGenious,
  wsDedicatedServersNindohost,
  wsDedicatedServersHeberfacile,
  wsDedicatedServersAdkmedia
} = require('./dedicated-servers-web-scraper');

class HostingProducts {
  constructor(companyId, companyName, productsArray) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.productsArray = productsArray;
  }
}

/**
 * @function webScrapingHostoweb
 * @description Scrapes hosting products from Hostoweb website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingHostoweb() {
  try {
    const sharedHosting = await wsSharedHostingHostoweb('https://www.hostoweb.com/hebergement/mutualise-linux', '.justify-content-start .col-md-3');
    const vpsCloud = await wsVPSCloudHostoweb('https://www.hostoweb.com/serveurs/kvm-vps', '.pad-bt-60 .server-tabls-body .server-tabls-row');
    const whmReseller = await wsWHMResellerHostoweb('https://www.hostoweb.com/hebergement/revendeurs', '.container .row .col-md-6.plan-ssl-special');
    const dedicatedServers = await wsDedicatedServersHostoweb('https://www.hostoweb.com/serveurs/serveurs-dedies', '#plans-section .dedicatedserver-plans-box');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Hostoweb:`, error);
    throw error;
  }
}

/**
 * @function webScrapingCapconnect
 * @description Scrapes hosting products from Capconnect website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingCapconnect() {
  try {
    const sharedHosting = await wsSharedHostingCapconnect('https://www.capconnect.com/hebergement-web', '.col-md-10 .col-md-3');
    const vpsCloud = await wsVPSCloudCapconnect('https://www.capconnect.com/serveur-cloud-ssd', '#compare .container tbody tr');
    const whmReseller = await wsWHMResellerCapconnect('https://www.capconnect.com/hebergement-web-revendeur', '#generic_price_table .container .row .col-md-4');
    const dedicatedServers = await wsDedicatedServersCapconnect('https://www.capconnect.com/serveurs-dedies', '#compare .container table tbody tr');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Capconnect:`, error);
    throw error;
  }
}

/**
 * @function webScrapingGenious
 * @description Scrapes hosting products from Genious website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingGenious() {
  try {
    const sharedHostingResults = await Promise.allSettled([
      wsSharedHostingGenious('Linux', 'https://www.genious.ma/fr/hebergement/mutualise-linux', '#accordionPanelsStayOpenExample .col-12'),
      wsSharedHostingGenious('Windows', 'https://www.genious.ma/fr/hebergement/mutualise-windows', '#offers .col-12')
    ]);
    const packagesArray = [...sharedHostingResults[0].value, ...sharedHostingResults[1].value];
    const sharedHosting = new SharedHosting(packagesArray);
    const vpsCloud = await wsVPSCloudGenious('https://www.genious.ma/fr/hebergement/cloud', '.container .mt-1 .col-12 .container-packing');
    const whmReseller = await wsWHMResellerGenious('https://www.genious.ma/fr/hebergement/hebergement-multi-site', '#offers .col-12')
    const dedicatedServers = await wsDedicatedServersGenious('https://www.genious.ma/fr/hebergement/serveurs-dedies', '#pack .pt-2 .col-12');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Genious:`, error);
    throw error;
  }
}

/**
 * @function webScrapingHeberfacile
 * @description Scrapes hosting products from Heberfacile website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingHeberfacile() {
  try {
    const sharedHosting = await wsSharedHostingHeberfacile('https://www.heberfacile.com/hebergement-web/hebergement-mutualise/', '.vc_row .pt-type1');
    const vpsCloud = await wsVPSCloudHeberfacile('https://www.heberfacile.com/hebergement-web/serveur-cloud-vps/', '#tablepress-20 tbody tr');
    const whmReseller = await wsWHMResellerHeberfacile('https://www.heberfacile.com/revendeur/hebergement-web/', '.wpb_row:has(.pt-features .feature-item) .wpb_column.vc_column_container.vc_col-sm-4');
    const dedicatedServers = await wsDedicatedServersHeberfacile('https://www.heberfacile.com/hebergement-web/serveurs-dedies/', '#Professionnels .vc_col-sm-4, #Entreprises .vc_col-sm-4');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Heberfacile:`, error);
    throw error;
  }
}

/**
 * @function webScrapingAdkmedia
 * @description Scrapes hosting products from Adkmedia website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingAdkmedia() {
  try {
    const sharedHosting = await wsSharedHostingAdkmedia('https://www.adk-media.com/fr/hebergement-web-maroc.html', '#content');
    const vpsCloudResults = await Promise.allSettled([
      wsVPSCloudAdkmedia('Unmanaged', 'https://www.adk-media.com/fr/serveur-vps-unmanaged-maroc.html', '#servers .product.vps'),
      wsVPSCloudAdkmedia('Managed', 'https://www.adk-media.com/fr/serveur-vps-managed-maroc.html', '#servers .product.vps')
    ]);
    const packagesArray = [...vpsCloudResults[0].value, ...vpsCloudResults[1].value];
    const vpsCloud = new VPSCloud(packagesArray);
    const whmReseller = new WHMReseller([]);
    const dedicatedServers = await wsDedicatedServersAdkmedia('https://www.adk-media.com/fr/serveur-dedie-maroc.html', '#extensions table tbody tr');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Adkmedia:`, error);
    throw error;
  }
}

/**
 * @function webScrapingNindohost
 * @description Scrapes hosting products from Nindohost website.
 * @returns {Array} Array of hosting products.
 */
async function webScrapingNindohost() {
  try {
    const sharedHosting = await wsSharedHostingNindohost('https://nindohost.ma/hebergement-web/windows/', '#uc_nh_content_toggle_elementor_a04e111_item2 .ue-template .elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default .elementor-container.elementor-column-gap-default .elementor-column.elementor-col-33.elementor-top-column.elementor-element');
    const vpsCloud = await wsVPSCloudNindohost('https://nindohost.ma/hebergement-web/cloud/', '#uc_nh_content_toggle_elementor_a04e111_item2 .elementor-column.elementor-col-33');
    const whmReseller = await wsWHMResellerNindohost('https://nindohost.ma/hebergement-web/multi-sites/', '[data-id="40b21fb7"] .elementor-column.elementor-col-33.elementor-top-column.elementor-element:has(.elementor-widget-ucaddon_features_list)');
    const dedicatedServers = await wsDedicatedServersNindohost('https://nindohost.ma/serveurs/serveurs-dedies/', '#uc_servers_table_elementor_c3728ca table tbody tr');

    return [sharedHosting, vpsCloud, whmReseller, dedicatedServers];
  } catch (error) {
    console.log(`Error during web scraping Nindohost:`, error);
    throw error;
  }
}

const hostingProductsArray = [];

/**
 * @function runWebScrapingSequentially
 * @description Runs web scraping tasks sequentially for all companies.
 */
async function runWebScrapingSequentially() {
  const companiesNames = ['hostoweb', 'capconnect', 'genious', 'nindohost', 'heberfacile', 'adkmedia'];
  const companiesIds = [];
  
  // Get all company IDs first
  for (const companyName of companiesNames) {
    const company = await dbClient.getCompany({ name: companyName });
    const companyId = company._id.toString();
    companiesIds.push(companyId);
  }

  // Define web scraping functions in order
  const webScrapingTasks = [
    () => webScrapingHostoweb(),
    () => webScrapingCapconnect(),
    () => webScrapingGenious(),
    () => webScrapingNindohost(),
    () => webScrapingHeberfacile(),
    () => webScrapingAdkmedia()
  ];

  // Loop over each task and run them sequentially
  for (let i = 0; i < webScrapingTasks.length; i++) {
    try {
      const result = await webScrapingTasks[i]();
      hostingProductsArray.push(new HostingProducts(companiesIds[i], companiesNames[i], [...result]));
    } catch (error) {
      // Handle error for each web scraping task
      await dbClient.setNotifications({ type: 'error', text: `Error during web scraping for ${companiesNames[i]} hosting products` });
      console.log(`WebScraping of ${companiesNames[i]} failed with:`, error);
    }
  }
}

/**
 * @function checkHostingProductsUpdate
 * @description Checks if hosting products have been updated.
 * @param {Object} obj1 - New hosting products object.
 * @param {Object} obj2 - Existing hosting products object.
 */
async function checkHostingProductsUpdate(obj1, obj2) {
  if (!obj2) {
    await dbClient.setNotifications({type: 'hosting-products', text: `${obj1.companyName} company: hosting products have been added.`});
  } else {
    let index = 0;
    for (const productEl of obj1.productsArray) {
      if (productEl.packagesArray.length !== obj2.productsArray[index].packagesArray.length) {
        await dbClient.setNotifications({type: 'hosting-products', text: `${obj1.companyName} company: hosting products: ${productEl.name} number of packages have been updated`});
        index += 1;
        continue;
      }
      let j = 0;
      for (const packageEl of productEl.packagesArray) {
        if (packageEl.annualPrice !== obj2.productsArray[index].packagesArray[j].annualPrice) {
          await dbClient.setNotifications({type: 'hosting-products', text: `${obj1.companyName} company: hosting products: ${productEl.name} annual price have been updated from ${obj2.productsArray[index].packagesArray[j].annualPrice} to ${packageEl.annualPrice}`});
        }
        if (packageEl.monthlyPrice !== obj2.productsArray[index].packagesArray[j].monthlyPrice) {
          await dbClient.setNotifications({type: 'hosting-products', text: `${obj1.companyName} company: hosting products: ${productEl.name} monthly price have been updated from ${obj2.productsArray[index].packagesArray[j].monthlyPrice} to ${packageEl.monthlyPrice}`});
        }
        j += 1;
      }
      index += 1;
    }
  }
}

/**
 * @function setHostingProducts
 * @description Sets hosting products in the database.
 */
async function setHostingProducts() {
  await runWebScrapingSequentially();
  for (const hostingProductsEl of hostingProductsArray) {
    try {
      let hostingProductsId = await dbClient.getHostingProducts({ companyId: hostingProductsEl.companyId });
      await checkHostingProductsUpdate(hostingProductsEl, hostingProductsId);
      if (!hostingProductsId) {
        hostingProductsId = await dbClient.setHostingProducts(hostingProductsEl);
        console.log(`Hosting products of ${hostingProductsEl.companyName} added in database with ID: ${hostingProductsId}`);
      } else {
        hostingProductsId = await dbClient.getHostingProducts(hostingProductsEl);
        if (!hostingProductsId) {
          await dbClient.updateHostingProducts({ companyId: hostingProductsEl.companyId }, hostingProductsEl);
          console.log(`Hosting products of ${hostingProductsEl.companyName} updated in database`);
        }
      }
    } catch (error) {
      await dbClient.setNotifications({type: 'error', text: `Error during web scraping for ${hostingProductsEl.companyName} hosting products`});
      console.log(`Error adding hosting products for ${hostingProductsEl.companyName}:`, error);
      continue;
    }
  }
  console.log('Hosting products: Done');
}

module.exports = setHostingProducts;
