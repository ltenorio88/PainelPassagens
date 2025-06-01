from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.post("/search/skyscanner")
async def search_skyscanner(request: Request):
    dados = await request.json()
    return [
        {"companhia": "Skyscanner", "preco": 759.90, "origem": dados["origem"], "destino": dados["destino"]}
    ]

app.mount("/", StaticFiles(directory="backend/static", html=True), name="static")
