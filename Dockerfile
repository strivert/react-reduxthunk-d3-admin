# Dockerfile (tag: v3)
FROM node:9.6.0-alpine
RUN npm install babel-loader babel-core babel-preset-env webpack -g
#WORKDIR /tmp
#COPY package.json /tmp/
WORKDIR /usr/src/app
#COPY . /usr/src/app/


#VOLUME ["/usr/src/app/"]
#RUN npm config set registry http://registry.npmjs.org/ && npm install
#RUN cp -a /tmp/node_modules /usr/src/app/
#RUN npm run buildprod
#ENV NODE_ENV=production
#ENV PORT=4000
#CMD [ "/usr/local/bin/node", "./index.js"
#EXPOSE 4000
