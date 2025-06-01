from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory="backend/static", html=True), name="static")

@app.post("/search/skyscanner")
async def search_skyscanner():
    return {"msg": "Busca Skyscanner simulada"}
