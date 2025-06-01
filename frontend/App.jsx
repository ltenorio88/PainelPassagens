import React, { useState } from 'react';

export default function App() {
  const [resultado, setResultado] = useState([]);

  const buscar = async () => {
    const res = await fetch('/search/skyscanner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origem: 'GYN',
        destino: 'GRU',
        data_ida: '2025-07-01',
        data_volta: '2025-07-10',
        adultos: 1
      })
    });
    const dados = await res.json();
    setResultado(dados);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Painel de Passagens</h1>
      <button onClick={buscar}>Buscar</button>
      <ul>
        {Array.isArray(resultado) && resultado.map((r, i) => (
          <li key={i}>{r.companhia} - R${r.preco}</li>
        ))}
      </ul>
    </div>
  );
}
