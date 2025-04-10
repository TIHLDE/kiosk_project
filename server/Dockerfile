FROM node:current-alpine

WORKDIR /app

COPY ./dist ./dist

EXPOSE 8001

CMD ["node", "dist/index.js"]