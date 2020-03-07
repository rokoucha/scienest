FROM node:13-alpine as base

WORKDIR /app


FROM base as install-packages

COPY package.json yarn.lock ./
RUN yarn install


FROM install-packages as build

COPY src ./src
RUN yarn run build


FROM base

COPY --from=install-packages /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]
