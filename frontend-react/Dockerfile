# Frontend React App
FROM node:18-alpine AS BUIlD_IMAGE
WORKDIR /app/frontend-react

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS PRODUCTION_IMAGE
WORKDIR /app/frontend-react

COPY --from=BUIlD_IMAGE /app/frontend-react/dist /app/frontend-react/dist
EXPOSE 8080
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 8080
CMD ["npm", "run", "preview"]
