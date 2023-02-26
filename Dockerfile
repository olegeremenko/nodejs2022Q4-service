FROM node:18.0-alpine
WORKDIR /usr/app
COPY *.json ./
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
