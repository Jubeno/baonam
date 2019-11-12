FROM node:10-alpine AS builder

WORKDIR /app

RUN apk --no-cache add \
    g++ make automake autoconf \
    && rm -rf /var/cache/apk/*

ADD package.json /app/
RUN yarn --pure-lockfile

# Runtime image from here
FROM node:10-alpine

EXPOSE 11000

WORKDIR /app

# Copy node_modules from builder image
COPY --from=builder /app .
ADD . /app
RUN yarn build

CMD ["yarn", "start"]