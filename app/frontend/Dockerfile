FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

# COPY /node_modules ./node_modules

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "start" ]
