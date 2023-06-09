ARG NODE_VERSION=16
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn install
RUN yarn lerna bootstrap
RUN yarn build


FROM node:$NODE_VERSION-buster-slim as production
RUN apt update && apt install -y netcat
WORKDIR /app

COPY --from=builder /app/wait-for ./wait-for
COPY --from=builder /app/packages/server/dist/ /app/
COPY --from=builder /app/packages/client/dist/ /app/client/dist/
COPY --from=builder /app/packages/client/dist-ssr/ /app/client/dist-ssr/
COPY --from=builder /app/packages/server/package.json /app/package.json
COPY --from=builder /app/packages/client/package.json /app/client/package.json

RUN chmod +x ./wait-for
RUN yarn install && cd client && yarn install

EXPOSE $SERVER_PORT
