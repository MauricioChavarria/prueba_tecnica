from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from domain import Solicitud
from logic import calcular_prioridad_total

app = FastAPI()

# Habilitar CORS para que React pueda conectarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

db_memoria = []

@app.post("/solicitudes")
def registrar(s: Solicitud):
    db_memoria.append(s)
    return {"status": "ok", "id": s.id}

@app.get("/solicitudes/priorizadas")
def listar():
    # Ordenamos usando la lógica de logic.py
    ordenadas = sorted(db_memoria, key=lambda x: calcular_prioridad_total(x), reverse=True)
    
    # Devolvemos la lista con el cálculo incluido
    return [
        {**s.dict(), "prioridadCalculada": calcular_prioridad_total(s)} 
        for s in ordenadas
    ]