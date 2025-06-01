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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel de Passagens</h1>
      <button onClick={buscar} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Buscar</button>
      <ul className="mt-4 space-y-2">
        {Array.isArray(resultado) && resultado.map((r, i) => (
          <li key={i} className="bg-gray-800 p-2 rounded">{r.companhia} - R${r.preco}</li>
        ))}
      </ul>
    </div>
  );
}
