![HOSTOWEB PULSE](frontend/assets/imgs/logo-b.png)

# HOSTOWEB PULSE

## Project Overview

HOSTOWEB PULSE is a web app dashboard designed to provide real-time insights into web hosting companies. The dashboard aggregates data on ads, domain extension pricing, blog updates, product offerings, social media follower counts, and security offers. The objective is to enable HOSTOWEB's staff members to gain individual insights into each company and compare market trends visually.

## Features

- **Data Aggregation and Integration**: Retrieve data from multiple sources, including APIs (e.g., social media APIs, domain pricing APIs, Facebook Ad Library) and web scraping.
- **Company Insights**: Display detailed insights for each web hosting company, including metrics such as ads visibility, domain extension prices (.com, .net, .org, .ma), blog update frequency, and product offerings (shared hosting, cloud VPS, reseller WHM, dedicated servers).
- **Market Overview**: Provide visual comparisons of key metrics across multiple companies using charts and graphs.

## Technologies

- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: Node.js, Express.js
- **Data Aggregation**: Puppeteer for web scraping, various public APIs
- **Database**: MongoDB (assumed based on a typical stack)

## Deployment Guide (Ubuntu)

### 1. Clone the Repository
```sh
git clone "web app github url"
cd HOSTOWEB-PULSE
```

### 2. Install Node.js and npm
```sh
sudo apt update
sudo apt install -y nodejs npm
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Install MongoDB and Configure It
```sh
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 5. Create MongoDB Database and Collections
```sh
mongo
use hostoweb-pulse
db.createCollection("companies")
db.createCollection("extension-prices")
db.createCollection("hosting-products")
db.createCollection("security-offers")
db.createCollection("google-ads")
db.createCollection("facebook-ads")
db.createCollection("social-media-reach")
db.createCollection("blogs")
db.createCollection("user")
exit
```

### 6. Install and Configure PM2 for Process Management
```sh
sudo npm install -g pm2
npm install
pm2 start backend/server.js --name hostoweb-pulse-backend
pm2 start backend/controller.js --name hostoweb-pulse-controller
pm2 startup
pm2 save
pm2 resurrect
pm2 restart all --watch
```

### 7. Enable Firewall and Allow Necessary Ports
```sh
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw enable
```

### 8. (Optional) Set Up Nginx as a Reverse Proxy
```sh
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/hostoweb-pulse
```
Add the following content:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Save and exit, then enable the site and restart Nginx:
```sh
sudo ln -s /etc/nginx/sites-available/hostoweb-pulse /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

Your HOSTOWEB PULSE application should now be running and accessible through your configured domain or IP address.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
