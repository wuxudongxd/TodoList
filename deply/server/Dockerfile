FROM node:16
RUN mkdir -p /backend
WORKDIR /backend
COPY ./server /backend
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 3001