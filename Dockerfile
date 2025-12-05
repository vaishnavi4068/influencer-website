FROM node:18-alpine 
WORKDIR /app
COPY . .
RUN npm install 
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port $PORT"]
