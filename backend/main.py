from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.post("/search/skyscanner")
async def search_skyscanner(request: Request):
    dados = await request.json()
    print("Requisição recebida:", dados)
    return [{'companhia': 'Skyscanner', 'preco': 759.9, 'origem': 'GYN', 'destino': 'GRU', 'data': '2025-06-01'}, {'companhia': 'Latam', 'preco': 820.75, 'origem': 'GYN', 'destino': 'GRU', 'data': '2025-06-01'}, {'companhia': 'Azul', 'preco': 780.0, 'origem': 'GYN', 'destino': 'GRU', 'data': '2025-06-01'}]

app.mount("/", StaticFiles(directory="backend/static", html=True), name="static")
