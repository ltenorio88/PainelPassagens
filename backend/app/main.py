from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes import search
from app.auth import routes as auth_routes
import os

app = FastAPI()
app.include_router(auth_routes.router)
app.include_router(search.router)

# Serve arquivos estáticos do React
app.mount("/", StaticFiles(directory="app/static", html=True), name="static")

# Força index.html para qualquer rota desconhecida (SPA)
@app.get("/{full_path:path}")
async def serve_vue(full_path: str):
    return FileResponse(os.path.join("app", "static", "index.html"))
