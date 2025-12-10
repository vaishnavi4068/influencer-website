FROM node:18-alpine 
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 3000
CMD ["sh", "-c", "npm run dev"]
