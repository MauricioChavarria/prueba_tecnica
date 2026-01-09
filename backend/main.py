from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from domain import Solicitud
from logic import calcular_prioridad_total
from fastapi import HTTPException

app = FastAPI(
    title="Motor de Reglas de Priorizacion - Proteccion",
    description="API para la gestion y ordenamiento inteligente de solicitudes de servicio.",
    version="1.0.0"
)

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
    ordenadas = sorted(db_memoria, key=lambda x: calcular_prioridad_total(x), reverse=True)
    
    return [
        {**s.dict(), "prioridadCalculada": calcular_prioridad_total(s)} 
        for s in ordenadas
    ]

@app.delete("/solicitudes/{solicitud_id}")
async def eliminar_solicitud(solicitud_id: int):
    global solicitudes_db
    inicial = len(solicitudes_db)
    solicitudes_db = [s for s in solicitudes_db if s.id != solicitud_id]
    
    if len(solicitudes_db) == inicial:
        raise HTTPException(status_code=404, detail="ID no encontrado")
        
    return {"status": "success", "message": f"Solicitud {solicitud_id} eliminada"}
