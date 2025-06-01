import React, { useState } from 'react';

function App() {
  const [resultados, setResultados] = useState([]);

 const buscar = async () => {
  try {
    const resposta = await fetch('https://painel-passagens.onrender.com/search/skyscanner', {
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

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status}`);
    }

    const dados = await resposta.json();
    console.log("Resultados:", dados);
    // Aqui você pode atualizar o estado do React: setResultados(dados)
  } catch (erro) {
    console.error("Erro ao buscar passagens:", erro);
    alert("Falha ao buscar passagens. Tente novamente.");
  }
};

    const dados = await resposta.json();
    setResultados(dados);
  };

  return (
    <div className="min-h-screen p-4 bg-indigo-900 text-white">
      <div className="bg-white text-black text-center p-6 font-bold text-2xl mb-6 shadow rounded">
        Banner da empresa que usará o painel
      </div>
      <div className="flex justify-center mb-4">
        <input className="p-2 w-1/2 text-black" placeholder="input de pesquisa" />
        <button onClick={buscar} className="ml-2 bg-white text-indigo-900 font-bold px-4 py-2 rounded">Botao de pesq.</button>
      </div>
      <div className="bg-white p-4 rounded shadow text-black">
        <div className="mb-2">barra para seleção de filtros e demais funcionalidades ou botões de ação</div>
        <div>
          {resultados.length === 0 ? (
            <p className="italic">campo com resultado da pesquisa e checkbox para seleção para gerar gráficos e relatórios que houverem no projeto</p>
          ) : (
            <ul className="space-y-2">
              {resultados.map((r, idx) => (
                <li key={idx} className="border p-2 rounded flex justify-between items-center">
                  <span>{r.companhia} - R${r.preco}</span>
                  <input type="checkbox" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
