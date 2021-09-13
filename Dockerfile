FROM node:lts-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN adduser -D forumapi && chown -R forumapi /app
USER forumapi
CMD ["npm","start"]