from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class TipoSolicitud(str, Enum):
    INCIDENTE = "INCIDENTE"
    REQUERIMIENTO = "REQUERIMIENTO"
    CONSULTA = "CONSULTA"

class Solicitud(BaseModel):
    id: int
    tipo: TipoSolicitud
    prioridadManual: int  # 1 a 5
    fechaCreacion: datetime
    usuario: str