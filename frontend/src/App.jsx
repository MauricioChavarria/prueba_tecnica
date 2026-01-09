import React, { useState, useEffect } from 'react';

const BASE_URL = "https://fantastic-trout-qp6q679jvq924v7g-8000.app.github.dev";
const API_URL = `${BASE_URL}/solicitudes`;

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/priorizadas`);
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setSolicitudes(data);
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar al Backend");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

const eliminarSolicitud = async (id) => {
  if (!window.confirm(`¿Seguro que quieres borrar la solicitud #${id}?`)) return;
  
  try {
    const response = await fetch(`${BASE_URL}/solicitudes/${id}`, { 
      method: 'DELETE' 
    });

    if (response.ok) {
      await cargarDatos();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || "No se pudo eliminar"}`);
    }
  } catch (err) {
    console.error("Error de conexion:", err);
  }
};

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Motor de Priorización - Protección</h1>
        <div>
          <button 
            onClick={cargarDatos} 
            style={{ padding: '10px 20px', backgroundColor: '#0033a0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
          >
            {cargando ? "Actualizando..." : "Actualizar Orden"}
          </button>
          
        </div>
      </header>

      <hr style={{ margin: '20px 0' }} />

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Usuario</th>
            <th style={{ padding: '12px' }}>Tipo</th>
            <th style={{ padding: '12px' }}>Prioridad Manual</th>
            <th style={{ padding: '12px', color: '#0033a0' }}>Score Prioridad</th>
            <th style={{ padding: '12px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length > 0 ? (
            solicitudes.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: '12px' }}>{s.id}</td>
                <td style={{ padding: '12px' }}>{s.usuario}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8em',
                    backgroundColor: s.tipo === 'INCIDENTE' ? '#ffdce0' : s.tipo === 'REQUERIMIENTO' ? '#d1ecf1' : '#e2e3e5'
                  }}>
                    {s.tipo}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{s.prioridadManual}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{s.prioridadCalculada}</td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => eliminarSolicitud(s.id)}
                    style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No hay solicitudes. Usa CURL para agregar registros o presiona Actualizar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <footer style={{ marginTop: '40px', color: '#666', fontSize: '0.9em' }}>
        <p><strong>Arquitectura:</strong> Frontend (Vite + React) | Backend (FastAPI) | Persistencia en Memoria</p>
      </footer>
    </div>
  );
}

export default App;