# Stage 1
FROM node:16.13.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/angular-app /usr/share/nginx/html
