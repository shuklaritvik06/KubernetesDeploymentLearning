FROM node
LABEL authors="Ritvik Shukla <ritvikshukla261@gmail.com>"
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
CMD [ "npm", "start" ]