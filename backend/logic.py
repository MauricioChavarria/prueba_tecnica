from datetime import datetime
from domain import Solicitud, TipoSolicitud

def calcular_prioridad_total(s: Solicitud):
    # Peso por Tipo
    pesos_tipo = {
        TipoSolicitud.INCIDENTE: 50,
        TipoSolicitud.REQUERIMIENTO: 30,
        TipoSolicitud.CONSULTA: 10
    }
    score = pesos_tipo.get(s.tipo, 0)

    # Peso Prioridad Manual
    score += (s.prioridadManual * 10)

    # Antigüedad, puntos por cada hora que ha pasado
    segundos_transcurridos = (datetime.now() - s.fechaCreacion).total_seconds()
    horas = segundos_transcurridos / 3600
    score += horas * 2 # 2 puntos

    return round(score, 2)