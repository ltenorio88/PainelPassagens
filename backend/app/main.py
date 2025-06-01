from fastapi import FastAPI
from app.routes import search
from app.auth import routes as auth_routes
app = FastAPI()
app.include_router(auth_routes.router)
app.include_router(search.router)