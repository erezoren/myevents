FROM  node:16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
EXPOSE 8080
CMD ["yarn", "run", "start"]