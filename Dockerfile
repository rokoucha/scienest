FROM node:13-alpine as base

WORKDIR /app


FROM base as install-packages

COPY package.json yarn.lock ./
RUN yarn install


FROM install-packages as build

COPY tsconfig.json ./
COPY src ./src
RUN yarn run build


FROM base

COPY LICENSE ormconfig.js package.json tsconfig.json yarn.lock ./
COPY src ./src
COPY --from=build /app/dist ./dist
COPY --from=install-packages /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]
