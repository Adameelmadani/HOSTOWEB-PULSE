const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'hostoweb-pulse';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url);
    this.connectClient()
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch(err => {
        console.log('Error connecting to MongoDB: ', err.message);
      });
  }

  async connectClient() {
    try {
      this.db = this.client.db(DB_DATABASE);
      this.companies = this.db.collection('companies');
      this.extensionPrices = this.db.collection('extension-prices');
      this.hostingProducts = this.db.collection('hosting-products');
      this.securityOffers = this.db.collection('security-offers');
      this.googleAds = this.db.collection('google-ads');
      this.facebookAds = this.db.collection('facebook-ads');
      this.socialMediaReach = this.db.collection('social-media-reach');
      this.blogs = this.db.collection('blogs');
      this.user = this.db.collection('user');
      await this.createCappedNotificationsCollection();
    } catch (err) {
      console.error('Error connecting to the database: ', err.message);
    }
  }

  isAlive() { return !!this.db; }

  // Companies
  async getCompanies(query) {
    try {
      const companies = await this.companies.find(query).toArray();
      return companies;
    } catch (err) {
      console.error('Error fetching companies: ', err.message);
      throw err;
    }
  }

  async getCompany(query) {
    try {
      const company = await this.companies.findOne(query);
      return company;
    } catch (err) {
      console.error('Error fetching company: ', err.message);
      throw err;
    }
  }

  async setCompany(query) {
    try {
      const company = await this.companies.insertOne(query);
      return company.insertedId;
    } catch (err) {
      console.error('Error inserting company: ', err.message);
      throw err;
    }
  }

  async updateCompany(filter, update) {
    try {
      const result = await this.companies.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating company: ', err.message);
      throw err;
    }
  }

  // Extension Prices
  async getExtensionPricesArray(query) {
    try {
      const extensionPricesArray = await this.extensionPrices.find(query).toArray();
      return extensionPricesArray;
    } catch (err) {
      console.error('Error fetching extension prices: ', err.message);
      throw err;
    }
  }

  async getExtensionPrices(query) {
    try {
      const extensionPricesObject = await this.extensionPrices.findOne(query);
      return extensionPricesObject;
    } catch (err) {
      console.error('Error fetching extension price: ', err.message);
      throw err;
    }
  }

  async setExtensionPrices(query) {
    try {
      const extensionPricesObject = await this.extensionPrices.insertOne(query);
      return extensionPricesObject.insertedId;
    } catch (err) {
      console.error('Error inserting extension price: ', err.message);
      throw err;
    }
  }

  async updateExtensionPrices(filter, update) {
    try {
      const result = await this.extensionPrices.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating extension price: ', err.message);
      throw err;
    }
  }

  // Hosting Products
  async getHostingProductsArray(query) {
    try {
      const hostingProductsArray = await this.hostingProducts.find(query).toArray();
      return hostingProductsArray;
    } catch (err) {
      console.error('Error fetching hosting products: ', err.message);
      throw err;
    }
  }

  async getHostingProducts(query) {
    try {
      const hostingProductsObject = await this.hostingProducts.findOne(query);
      return hostingProductsObject;
    } catch (err) {
      console.error('Error fetching hosting product: ', err.message);
      throw err;
    }
  }

  async setHostingProducts(query) {
    try {
      const hostingProductsObject = await this.hostingProducts.insertOne(query);
      return hostingProductsObject.insertedId;
    } catch (err) {
      console.error('Error inserting hosting product: ', err.message);
      throw err;
    }
  }

  async updateHostingProducts(filter, update) {
    try {
      const result = await this.hostingProducts.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating hosting product: ', err.message);
      throw err;
    }
  }

  // Security Offers
  async getSecurityOffersArray(query) {
    try {
      const securityOffersArray = await this.securityOffers.find(query).toArray();
      return securityOffersArray;
    } catch (err) {
      console.error('Error fetching security offers: ', err.message);
      throw err;
    }
  }

  async getSecurityOffers(query) {
    try {
      const securityOffersObject = await this.securityOffers.findOne(query);
      return securityOffersObject;
    } catch (err) {
      console.error('Error fetching security offer: ', err.message);
      throw err;
    }
  }

  async setSecurityOffers(query) {
    try {
      const securityOffersObject = await this.securityOffers.insertOne(query);
      return securityOffersObject.insertedId;
    } catch (err) {
      console.error('Error inserting security offer: ', err.message);
      throw err;
    }
  }

  async updateSecurityOffers(filter, update) {
    try {
      const result = await this.securityOffers.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating security offer: ', err.message);
      throw err;
    }
  }

  // Google Ads
  async getGoogleAdsArray(query) {
    try {
      const googleAdsArray = await this.googleAds.find(query).toArray();
      return googleAdsArray;
    } catch (err) {
      console.error('Error fetching Google Ads: ', err.message);
      throw err;
    }
  }

  async getGoogleAds(query) {
    try {
      const googleAdsObject = await this.googleAds.findOne(query);
      return googleAdsObject;
    } catch (err) {
      console.error('Error fetching Google Ad: ', err.message);
      throw err;
    }
  }

  async setGoogleAds(query) {
    try {
      const googleAdsObject = await this.googleAds.insertOne(query);
      return googleAdsObject.insertedId;
    } catch (err) {
      console.error('Error inserting Google Ad: ', err.message);
      throw err;
    }
  }

  async updateGoogleAds(filter, update) {
    try {
      const result = await this.googleAds.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating Google Ad: ', err.message);
      throw err;
    }
  }

  // Facebook Ads
  async getFacebookAdsArray(query) {
    try {
      const facebookAdsArray = await this.facebookAds.find(query).toArray();
      return facebookAdsArray;
    } catch (err) {
      console.error('Error fetching Facebook Ads: ', err.message);
      throw err;
    }
  }

  async getFacebookAds(query) {
    try {
      const facebookAdsObject = await this.facebookAds.findOne(query);
      return facebookAdsObject;
    } catch (err) {
      console.error('Error fetching Facebook Ad: ', err.message);
      throw err;
    }
  }

  async setFacebookAds(query) {
    try {
      const facebookAdsObject = await this.facebookAds.insertOne(query);
      return facebookAdsObject.insertedId;
    } catch (err) {
      console.error('Error inserting Facebook Ad: ', err.message);
      throw err;
    }
  }

  async updateFacebookAds(filter, update) {
    try {
      const result = await this.facebookAds.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating Facebook Ad: ', err.message);
      throw err;
    }
  }

  // Social Media Reach
  async getSocialMediaReachArray(query) {
    try {
      const socialMediaReachArray = await this.socialMediaReach.find(query).toArray();
      return socialMediaReachArray;
    } catch (err) {
      console.error('Error fetching social media reach: ', err.message);
      throw err;
    }
  }

  async getSocialMediaReach(query) {
    try {
      const socialMediaReachObject = await this.socialMediaReach.findOne(query);
      return socialMediaReachObject;
    } catch (err) {
      console.error('Error fetching social media reach: ', err.message);
      throw err;
    }
  }

  async setSocialMediaReach(query) {
    try {
      const socialMediaReachObject = await this.socialMediaReach.insertOne(query);
      return socialMediaReachObject.insertedId;
    } catch (err) {
      console.error('Error inserting social media reach: ', err.message);
      throw err;
    }
  }

  async updateSocialMediaReach(filter, update) {
    try {
      const result = await this.socialMediaReach.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating social media reach: ', err.message);
      throw err;
    }
  }

  // Blogs
  async getBlogsArray(query) {
    try {
      const blogsArray = await this.blogs.find(query).toArray();
      return blogsArray;
    } catch (err) {
      console.error('Error fetching blogs: ', err.message);
      throw err;
    }
  }

  async getBlogs(query) {
    try {
      const blogsObject = await this.blogs.findOne(query);
      return blogsObject;
    } catch (err) {
      console.error('Error fetching blog: ', err.message);
      throw err;
    }
  }

  async setBlogs(query) {
    try {
      const blogsObject = await this.blogs.insertOne(query);
      return blogsObject.insertedId;
    } catch (err) {
      console.error('Error inserting blog: ', err.message);
      throw err;
    }
  }

  async updateBlogs(filter, update) {
    try {
      const result = await this.blogs.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating blog: ', err.message);
      throw err;
    }
  }

  // User
  async getUserArray(query) {
    try {
      const userArray = await this.user.find(query).toArray();
      return userArray;
    } catch (err) {
      console.error('Error fetching users: ', err.message);
      throw err;
    }
  }

  async getUser(query) {
    try {
      const userObject = await this.user.findOne(query);
      return userObject;
    } catch (err) {
      console.error('Error fetching user: ', err.message);
      throw err;
    }
  }

  async setUser(query) {
    try {
      query.last_message_id = null; // Set default value for last_message_id
      const userObject = await this.user.insertOne(query);
      return userObject.insertedId;
    } catch (err) {
      console.error('Error inserting user: ', err.message);
      throw err;
    }
  }

  async updateUser(filter, update) {
    try {
      const result = await this.user.updateOne(filter, { $set: update });
      return result;
    } catch (err) {
      console.error('Error updating user: ', err.message);
      throw err;
    }
  }

  // Notifications
  async createCappedNotificationsCollection() {
    try {
      const collections = await this.db.listCollections({ name: 'notifications' }).toArray();

      // If 'notifications' collection doesn't exist, create a capped collection
      if (collections.length === 0) {
        await this.db.createCollection('notifications', {
          capped: true,
          size: 5242880, // 5MB size, required for capped collections
          max: 20, // Limit to 20 documents
        });
      } else {
        this.notifications = this.db.collection('notifications');
      }
    } catch (err) {
      console.error('Error creating capped notifications collection: ', err.message);
      throw err;
    }
  }

  async getNotificationsArray(query) {
    try {
      const notificationsArray = await this.notifications.find(query).toArray();
      return notificationsArray;
    } catch (err) {
      console.error('Error fetching notifications: ', err.message);
      throw err;
    }
  }

  async getNotifications(query) {
    try {
      const notificationsObject = await this.notifications.findOne(query);
      return notificationsObject;
    } catch (err) {
      console.error('Error fetching notification: ', err.message);
      throw err;
    }
  }

  async setNotifications(query) {
    try {
      const notificationsObject = await this.notifications.insertOne(query);
      return notificationsObject.insertedId;
    } catch (err) {
      console.error('Error inserting notification: ', err.message);
      throw err;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
