FROM node:18 AS base

FROM base as development
WORKDIR /app
COPY . /app

ENV NODE_ENV development

RUN yarn install
RUN yarn run build