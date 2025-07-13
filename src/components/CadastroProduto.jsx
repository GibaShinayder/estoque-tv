import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CadastroProduto({ usuarioLogado, onProdutoCriado }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [custo, setCusto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!nome || !preco || !custo) {
      setMensagem('Preencha ao menos nome, preço e custo.');
      return;
    }

    const { error } = await supabase.from('produtos').insert({
      nome,
      preco: parseFloat(preco),
      custo: parseFloat(custo),
      quantidade: parseInt(quantidade || '0'),
      categoria,
      descricao,
      usuario: usuarioLogado
    });

    if (error) {
      setMensagem('❌ Erro ao cadastrar produto: ' + error.message);
    } else {
      setMensagem('✅ Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
      setCusto('');
      setQuantidade('');
      setCategoria('');
      setDescricao('');
      onProdutoCriado();
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-title">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          placeholder="Nome do produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={e => setPreco(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Custo (R$)"
          value={custo}
          onChange={e => setCusto(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />
        <textarea
          className="input-field"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <button type="submit" className="login-button">Salvar Produto</button>
      </form>
      {mensagem && <p style={{ marginTop: '1rem', color: '#f1c40f' }}>{mensagem}</p>}
    </div>
  );
}