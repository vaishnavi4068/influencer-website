FROM node:18-alpine 
WORKDIR /app
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=${VUE_APP_API_URL}
COPY . .
RUN npm install 
EXPOSE 3000
CMD ["sh", "-c", "npm run dev"]
