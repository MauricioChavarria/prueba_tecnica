from datetime import datetime
from domain import Solicitud, TipoSolicitud

def calcular_prioridad_total(s: Solicitud):
    # 1. Peso por Tipo (Priorizamos fallos técnicos)
    pesos_tipo = {
        TipoSolicitud.INCIDENTE: 50,
        TipoSolicitud.REQUERIMIENTO: 30,
        TipoSolicitud.CONSULTA: 10
    }
    score = pesos_tipo.get(s.tipo, 0)

    # 2. Peso por Prioridad Manual (Multiplicamos por un factor de importancia)
    score += (s.prioridadManual * 10)

    # 3. Factor Antigüedad (Puntos extra por cada hora que ha pasado)
    # Esto evita que una CONSULTA vieja quede olvidada por siempre
    segundos_transcurridos = (datetime.now() - s.fechaCreacion).total_seconds()
    horas = segundos_transcurridos / 3600
    score += horas * 2 # 2 puntos por cada hora de espera

    return round(score, 2)