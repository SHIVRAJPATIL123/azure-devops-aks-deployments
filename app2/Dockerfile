FROM node:18-alpine
WORKDIR /app
COPY ./k8s/src/ ./
RUN npm install express
CMD ["node", "index.js"]