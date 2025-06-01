
# Etapa do frontend
FROM node:20 as frontend
WORKDIR /frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Etapa do backend
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend ./backend
COPY --from=frontend /frontend/dist /app/backend/static
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
