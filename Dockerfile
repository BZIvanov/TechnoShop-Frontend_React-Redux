FROM node:18.17-alpine as builder

WORKDIR /app

COPY ./package*.json ./

### DEVELOPMENT ENVIRONMENT ###
FROM builder AS devenv
ENV NODE_ENV=development
RUN npm install --frozen-lockfile
COPY . .
CMD ["npm", "run", "start:dev"]

### PRODUCTION ENVIRONMENT ###
FROM builder AS prodenv
ENV NODE_ENV=production
RUN npm install --frozen-lockfile --production
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]

### TESTING ENVIRONMENTS ###
FROM devenv as testenv
ENV NODE_ENV=test
CMD ["npm", "run", "test"]

FROM devenv as teste2eenv
ENV NODE_ENV=test
CMD ["npm", "run", "test:e2e"]
