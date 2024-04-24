FROM node:18

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

#CMD ["npm", "start"]
CMD npm run dev