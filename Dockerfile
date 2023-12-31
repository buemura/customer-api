FROM node:18-alpine as builder
USER node
WORKDIR /home/app
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

# ---
FROM node:18-alpine
ENV NODE_ENV prod
USER node
WORKDIR /home/app
COPY --from=builder --chown=node:node /home/app/.env.prod ./.env.prod
COPY --from=builder --chown=node:node /home/app/package*.json ./package*.json
COPY --from=builder --chown=node:node /home/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/app/dist/ ./dist/
CMD ["node", "dist/src/main"]