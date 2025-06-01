import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    origem: 'GYN',
    destino: 'GRU',
    data_ida: '',
    data_volta: '',
    adultos: 1
  });
  const [resultados, setResultados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  const buscar = async () => {
    const res = await fetch('/search/skyscanner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const dados = await res.json();
    setResultados(Array.isArray(dados) ? dados : []);
    setSelecionados([]);
  };

  const toggleSelecionado = (index) => {
    setSelecionados(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel de Passagens</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input className="p-2 rounded text-black" placeholder="Origem" value={form.origem} onChange={e => setForm({ ...form, origem: e.target.value })} />
        <input className="p-2 rounded text-black" placeholder="Destino" value={form.destino} onChange={e => setForm({ ...form, destino: e.target.value })} />
        <input type="date" className="p-2 rounded text-black" value={form.data_ida} onChange={e => setForm({ ...form, data_ida: e.target.value })} />
        <input type="date" className="p-2 rounded text-black" value={form.data_volta} onChange={e => setForm({ ...form, data_volta: e.target.value })} />
        <input type="number" className="p-2 rounded text-black" min="1" value={form.adultos} onChange={e => setForm({ ...form, adultos: parseInt(e.target.value) })} />
      </div>
      <button onClick={buscar} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Buscar</button>

      <ul className="mt-6 space-y-2">
        {resultados.map((r, i) => (
          <li key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <div>
              <strong>{r.companhia}</strong> – R${r.preco} ({r.origem} → {r.destino})
            </div>
            <input type="checkbox" checked={selecionados.includes(i)} onChange={() => toggleSelecionado(i)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
