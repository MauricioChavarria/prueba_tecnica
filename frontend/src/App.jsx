import React, { useState } from 'react';

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const API_URL = "https://fantastic-trout-qp6q679jvq924v7g-8000.app.github.dev/solicitudes"; 

  const cargarDatos = async () => {
  try {
    const res = await fetch(`${API_URL}/priorizadas`);
    if (!res.ok) throw new Error("Error en servidor");
    const data = await res.json();
    setSolicitudes(data);
  } catch (error) {
    alert("No se pudo conectar al Backend. Verifica que el puerto 8000 sea PÚBLICO.");
  }
};

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Protección: Motor de Priorización</h1>
      <button 
        onClick={cargarDatos} 
        style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Actualizar Orden de Atención
      </button>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Usuario</th>
            <th>Prioridad Calculada</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s.id} style={{ backgroundColor: s.tipo === 'INCIDENTE' ? '#fff1f0' : 'transparent' }}>
              <td style={{ padding: '10px' }}>{s.id}</td>
              <td style={{ padding: '10px', fontWeight: 'bold', color: s.tipo === 'INCIDENTE' ? '#d32f2f' : '#1976d2' }}>
                {s.tipo}
              </td>
              <td style={{ padding: '10px' }}>{s.usuario}</td>
              <td style={{ padding: '10px' }}><strong>{s.prioridadCalculada}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;