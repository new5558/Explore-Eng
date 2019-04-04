FROM node:10-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR .

# Copying source files
COPY . .

# Building app
RUN rm -rf node_modules/grpc
RUN yarn add grpc && yarn build
# ARG GOOGLEMAP_API_KEY
#ENV TESTING $GOOGLEMAP_API_KEY
# RUN echo GOOGLEMAP_API_KEY=$GOOGLEMAP_API_KEY > .env
# RUN echo NODE_ENV=production >> .env
#RUN cat .env

# Running the app
CMD ["yarn", "start"]
