FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

COPY ./node_modules ./node_modules

COPY . .

EXPOSE 3001

RUN npx tsc

CMD ["npm", "start"]