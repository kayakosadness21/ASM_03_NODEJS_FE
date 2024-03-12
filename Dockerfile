FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY server.js ./
COPY ["build", "/app/build"]
RUN npm install --force --production
CMD [ "node", "server.js" ]
EXPOSE 3000