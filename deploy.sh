#!/bin/bash
# Export the GIT_ASKPASS environment variable if needed
# export GIT_ASKPASS="~/home/ubuntu/.netrc"

# Pull the latest code from the repository
# git pull

# Install dependencies
npm install

# Build the React app for production
npm run build

mkdir /var/www/html/impactshaala-frontend
sudo cp -r ./build/* /var/www/html/impactshaala-frontend/
sudo chown -R www-data:www-data /var/www/html/impactshaala-frontend/
sudo chmod -R 755 /var/www/html/impactshaala-frontend/
sudo service nginx restart
