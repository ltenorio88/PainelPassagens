import React, { useState } from 'react';

const App = () => {
  const [form, setForm] = useState({ origem: '', destino: '', data_ida: '', data_volta: '', adultos: 1 });
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    const resposta = await fetch('https://painel-passagens.onrender.com/search/skyscanner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const dados = await resposta.json();
    setResultados(dados);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Painel de Pesquisa de Passagens</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="p-2 rounded bg-gray-800 border border-gray-700" placeholder="Origem (ex: GYN)" value={form.origem} onChange={e => setForm({ ...form, origem: e.target.value })} />
        <input className="p-2 rounded bg-gray-800 border border-gray-700" placeholder="Destino (ex: GRU)" value={form.destino} onChange={e => setForm({ ...form, destino: e.target.value })} />
        <input type="date" className="p-2 rounded bg-gray-800 border border-gray-700" value={form.data_ida} onChange={e => setForm({ ...form, data_ida: e.target.value })} />
        <input type="date" className="p-2 rounded bg-gray-800 border border-gray-700" value={form.data_volta} onChange={e => setForm({ ...form, data_volta: e.target.value })} />
        <input type="number" min="1" className="p-2 rounded bg-gray-800 border border-gray-700" value={form.adultos} onChange={e => setForm({ ...form, adultos: Number(e.target.value) })} />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500" onClick={buscar}>Buscar</button>

      <div className="mt-6">
        {resultados.length > 0 && <h2 className="text-xl mb-2">Resultados:</h2>}
        <ul className="space-y-2">
          {resultados.map((item, idx) => (
            <li key={idx} className="bg-gray-800 p-2 rounded border border-gray-700">{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
