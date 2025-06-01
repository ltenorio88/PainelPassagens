import React, { useState } from 'react';

export default function App() {
  const [resultado, setResultado] = useState(null);

  const buscar = async () => {
    const resposta = await fetch('/search/skyscanner', {
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
    const dados = await resposta.json();
    setResultado(dados);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Painel Passagens</h1>
      <button onClick={buscar} className="bg-blue-600 px-4 py-2 rounded">
        Buscar
      </button>
      {resultado && <pre className="mt-4 bg-black p-2 rounded">{JSON.stringify(resultado, null, 2)}</pre>}
    </div>
  );
}
