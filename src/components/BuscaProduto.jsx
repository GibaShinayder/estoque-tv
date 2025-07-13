import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function BuscaProduto({ busca, setBusca }) {
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const buscar = async () => {
    if (!busca) {
      setMensagem('🔍 Digite algo para buscar');
      setResultados([]);
      return;
    }

    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .ilike('nome', `%${busca}%`);

    if (error) {
      setMensagem('❌ Erro na busca: ' + error.message);
      setResultados([]);
    } else if (data.length === 0) {
      setMensagem('🔎 Nenhum produto encontrado');
      setResultados([]);
    } else {
      setMensagem('');
      setResultados(data);
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-title">Buscar Produtos</h2>
      <input
        className="input-field"
        placeholder="Digite o nome do produto"
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <button onClick={buscar} className="login-button">Buscar</button>
      {mensagem && <p style={{ marginTop: '1rem', color: '#f1c40f' }}>{mensagem}</p>}

      {/* Resultados */}
      {resultados.map(produto => (
        <div key={produto.id} className="resultado-card">
          <p><strong>📦 Nome:</strong> {produto.nome || '—'}</p>
          <p><strong>🏷️ Categoria:</strong> {produto.categoria || '—'}</p>
          <p><strong>🚚 Fornecedor:</strong> {produto.fornecedor || '—'}</p>
          <p><strong>💰 Compra:</strong> R$ {produto.custo?.toFixed(2) || '—'}</p>
          <p><strong>💸 Venda:</strong> R$ {produto.preco?.toFixed(2) || '—'}</p>
          <p>
            <strong>📈 Lucro:</strong>{' '}
            {produto.margem_lucro
              ? `R$ ${produto.margem_lucro} (${produto.margem_percentual}%)`
              : '—'}
          </p>
          <p><strong>🔢 Quantidade:</strong> {produto.quantidade ?? '—'}</p>
          <p><strong>⏳ Validade:</strong> {produto.validade || '—'}</p>
          <p><strong>👤 Funcionário:</strong> {produto.usuario || '—'}</p>
        </div>
      ))}
    </div>
  );
}