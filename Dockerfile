FROM node:16.13.1 as base

WORKDIR /app

RUN npm install -g ts-node typescript nodemon

RUN npm install -D tslib @types/node

COPY package*.json ./

RUN npm install --unsafe-perm

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]

# FROM base as production

# ENV NODE_PATH=./dist

# RUN npm run build