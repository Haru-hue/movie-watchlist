FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
ARG PORT
ENV PORT ${PORT:-8000}
ENV POSTGRE_PRISMA_URL binary
CMD npm run dev