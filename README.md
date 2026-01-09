# Motor de Reglas de Priorización - Prueba Técnica Protección 🚀

Este proyecto implementa un sistema inteligente de gestión de solicitudes (tickets) que utiliza un algoritmo de pesaje dinámico para determinar el orden de atención, cumpliendo con los criterios de no "hardcodear" reglas fijas y permitir escalabilidad futura.

## 🧠 Criterio de Priorización (El Motor)

Para evitar que las solicitudes se atiendan únicamente por orden de llegada o por un solo campo, se implementó una **fórmula de score compuesto**:

$$PrioridadFinal = (PesoTipo) + (PrioridadManual \times 10) + (FactorTiempo)$$

### Factores de Pesaje:
1. **Tipo de Solicitud (Peso Base):**
   - `INCIDENTE`: 50 puntos (Prioridad crítica por fallo de servicio).
   - `REQUERIMIENTO`: 30 puntos (Nuevas funcionalidades o cambios).
   - `CONSULTA`: 10 puntos (Dudas o información).
2. **Prioridad Manual (1 a 5):** Multiplicada por un factor de 10 para dar peso a la urgencia percibida por el usuario.
3. **Factor de Antigüedad (Factor Tiempo):** Se suman **2 puntos por cada hora** transcurrida desde la creación. 
   * *Propósito:* Evitar el "estancamiento" de consultas o requerimientos bajos. Una consulta de hace 3 días puede llegar a tener más prioridad que un incidente recién creado.

## 🏗️ Arquitectura del Sistema

El proyecto sigue una **separación clara de capas** para facilitar el mantenimiento:

### Backend (Python + FastAPI)
- **`domain.py`**: Definición de modelos de datos y tipos (Enums).
- **`logic.py`**: El "Cerebro". Contiene la lógica del algoritmo de priorización separada de los controladores.
- **`main.py`**: Endpoints de la API REST y orquestación.

### Frontend (React + Vite)
- UI minimalista centrada en el **Consumo de API**.
- Componentización básica para mostrar la lista ordenada en tiempo real.

## 🚀 Cómo ejecutar el proyecto

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000