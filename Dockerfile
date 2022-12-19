ARG NODE_VERSION="16.18.1"
ARG ALPINE_VERSION="3.16"



#
## Base Stage
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base-stage
WORKDIR /app


# 
## Dependencies Stage
FROM base-stage AS dependencies-stage
COPY package.json yarn.lock ./
# 只安裝 production 相關模組，並複製出來，準備給 Release Stage 使用
RUN yarn install --frozen-lockfile --production
RUN cp -R node_modules /production_node_modules
# prod & dev 模組全部安裝
RUN yarn install --frozen-lockfile


# 
## Build Stage
FROM dependencies-stage AS build-stage
ENV NODE_ENV=production
COPY package.json yarn.lock ./
COPY tsconfig.json tsconfig.build.json ./
COPY src src
RUN npm run build


# 
## Release Stage
FROM base-stage AS release-stage
ENV NODE_ENV=production
ENV TZ Asia/Taipei

COPY package.json nest-cli.json ./

# COPY public .

COPY --from=dependencies-stage /production_node_modules node_modules
COPY --from=build-stage /app/dist dist

# COPY .env .

# EXPOSE 3001

ENTRYPOINT ["npm", "run", "start:prod"]
