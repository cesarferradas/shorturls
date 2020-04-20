FROM node:12

WORKDIR /shorturls

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]
