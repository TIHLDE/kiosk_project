FROM node:current-alpine

WORKDIR /app

COPY ./dist ./dist

RUN npm install -g pnpm

RUN pnpm i --no-frozen-lockfile

ARG SKIP_ENV_VALIDATION=1

EXPOSE 8001

CMD ["node", "dist/index.js"]