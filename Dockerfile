FROM node:12.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

# Build and Run Command:
# docker build -t ahmadelmalah/Node.js-lib-for-online-payment:latest .  
# docker run -p 8000:3000 ahmadelmalah/Node.js-lib-for-online-payment:latest
