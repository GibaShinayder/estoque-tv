function ListaProdutos({ produtos, busca, excluirProduto }) {
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (!busca) return null;

  return (
    <div className="login-box">
      {produtosFiltrados.length > 0 ? (
        <>
          <h2 className="login-title">Resultado da Busca</h2>
          {produtosFiltrados.map(p => (
            <div key={p.id} className="produto-item">
              <p><strong>📦 Nome:</strong> {p.nome}</p>
              <p><strong>🏷️ Categoria:</strong> {p.categoria}</p>
              <p><strong>🚚 Fornecedor:</strong> {p.fornecedor}</p>
              <p><strong>💰 Compra:</strong> R$ {p.preco_compra}</p>
              <p><strong>💸 Venda:</strong> R$ {p.preco_venda}</p>
              <p><strong>📈 Lucro:</strong> R$ {p.margem_lucro} ({p.margem_percentual}%)</p>
              <p><strong>🔢 Quantidade:</strong> {p.quantidade}</p>
              <p><strong>⏳ Validade:</strong> {p.data_validade}</p>
              <p><strong>👤 Funcionário:</strong> {p.usuario}</p>
              <button onClick={() => excluirProduto(p.id)} className="login-button">Excluir</button>
            </div>
          ))}
        </>
      ) : (
        <h2 className="login-title">Nenhum produto encontrado</h2>
      )}
    </div>
  );
}

export default ListaProdutos;
