# Motor de Reglas de Priorización - Prueba Técnica Protección

Este proyecto implementa un sistema inteligente de gestion de solicitudes que utiliza un algoritmo de pesaje dinamico para determinar el orden de atencion, cumpliendo con los criterios de no "hardcodear" reglas fijas y permitir escalabilidad futura.

##  Criterio de Priorizacion

Para evitar que las solicitudes se atiendan unicamente por orden de llegada o por un solo campo, se implementa una **formula de score compuesto**:

$$score = (PesoTipo) + (PrioridadManual \times 10) + (FactorTiempo)$$

### Factores de Pesaje:
1. **Peso Base con por tipo de solicitud:**
   - `INCIDENTE`: 50 puntos.
   - `REQUERIMIENTO`: 30 puntos.
   - `CONSULTA`: 10 puntos.
2. **Prioridad Manual (1 a 5):** Multiplicada por un factor de 10.
3. **Factor Tiempo:** Se suman **2 puntos por cada hora** transcurrida desde la creacion. 
   * *Proposito:* Evitar el "estancamiento" de consultas o requerimientos bajos. Una consulta de hace 3 dias puede llegar a tener mas prioridad que un incidente recien creado.

##  Arquitectura

**separación de capas** para facilitar el mantenimiento:

### Backend (Python + FastAPI)
- **`domain.py`**: Definicion de modelos de datos y tipos.
- **`logic.py`**: Contiene la logica del algoritmo de priorizacion separada de los controladores.
- **`main.py`**: Endpoints de la API REST.

### Frontend (React + Vite)
- UI minimalista centrada en el **Consumo de API**.
- mostrar la lista ordenada en tiempo real.

##  Cómo ejecutar el proyecto

### 1. Backend
- cd backend
- pip install -r requirements.txt
- uvicorn main:app --reload --port 8000


### 2. FrondEnd
- cd frontend
- npm install
- npm run dev
