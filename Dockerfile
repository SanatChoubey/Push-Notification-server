FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN npm ci
CMD [ "npm", "run", "dev" ]
