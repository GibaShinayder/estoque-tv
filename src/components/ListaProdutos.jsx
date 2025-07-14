import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ListaProdutos from './components/ListaProdutos';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function buscarProdutos() {
      const { data, error } = await supabase.from('produtos').select('*');
      if (error) {
        setMensagem('❌ Erro ao buscar produtos: ' + error.message);
      } else if (data.length === 0) {
        setMensagem('🔎 Nenhum produto cadastrado');
      } else {
        setProdutos(data);
        setMensagem('');
      }
    }

    buscarProdutos();
  }, []);

  return (
    <div className="login-box">
      <h2 className="login-title">Lista Completa de Produtos</h2>

      {mensagem && <p style={{ marginTop: '1rem', color: '#f1c40f' }}>{mensagem}</p>}

      {produtos.map(produto => (
        <div key={produto.id} className="card">
          <p><strong>📦 Nome:</strong> {produto.nome || '—'}</p>
          <p><strong>📝 Descrição:</strong> {produto.descricao || '—'}</p>
          <p><strong>🏷️ Categoria:</strong> {produto.categoria || '—'}</p>
          <p><strong>🚚 Fornecedor:</strong> {produto.fornecedor || '—'}</p>
          <p><strong>💰 Compra:</strong> R$ {produto.custo?.toFixed(2) || '—'}</p>
          <p><strong>💸 Venda:</strong> R$ {produto.preco?.toFixed(2) || '—'}</p>
          <p><strong>📈 Lucro:</strong> {produto.margem_lucro ? `R$ ${produto.margem_lucro} (${produto.margem_percentual}%)` : '—'}</p>
          <p><strong>🔢 Quantidade:</strong> {produto.quantidade ?? '—'}</p>
          <p><strong>⏳ Validade:</strong> {produto.validade || '—'}</p>
          <p><strong>👤 Funcionário:</strong> {produto.usuario || '—'}</p>
        </div>
      ))}
    </div>
  );
}
