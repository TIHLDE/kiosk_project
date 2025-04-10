FROM node:current-alpine

WORKDIR /app

COPY . .

RUN npm install

ARG SKIP_ENV_VALIDATION=1

EXPOSE 8001

CMD ["node", "dist/index.js"]