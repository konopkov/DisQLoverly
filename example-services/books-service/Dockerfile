# Install dependencies and Build project
FROM node:18-alpine AS builder

WORKDIR /usr/app
COPY package.json package-lock.json tsconfig.json ./
COPY ./src ./src
RUN npm ci
RUN npm run build

# Run the app
FROM node:18-alpine

WORKDIR /usr/app
COPY  --from=builder /usr/app/build ./
COPY  --from=builder /usr/app/node_modules ./node_modules

EXPOSE 4000
CMD ["node", "app.js"]
