const express = require('express');
const cors = require('cors');
const companyRouter = require('./routes/company');
const extensionPricesRouter = require('./routes/extension-prices');
const hostingProductsRouter = require('./routes/hosting-products');
const securityOffersRouter = require('./routes/security-offers');
const googleAdsRouter = require('./routes/google-ads');
const facebookAdsRouter = require('./routes/facebook-ads');
const socialMediaReachRouter = require('./routes/social-media-reach');
const blogsRouter = require('./routes/blogs');
const userRouter = require('./routes/user');
const notificationsRouter = require('./routes/notifications');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/api', companyRouter);
app.use('/api', extensionPricesRouter);
app.use('/api', hostingProductsRouter);
app.use('/api', securityOffersRouter);
app.use('/api', googleAdsRouter);
app.use('/api', facebookAdsRouter);
app.use('/api', socialMediaReachRouter);
app.use('/api', blogsRouter);
app.use('/api', userRouter);
app.use('/api', notificationsRouter);

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
