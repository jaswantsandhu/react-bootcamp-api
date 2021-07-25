FROM node:16.4.0

WORKDIR /apps/food-ordering-api

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

EXPOSE 8080

COPY . .

CMD ["npm", "run", "start:prod" ]

