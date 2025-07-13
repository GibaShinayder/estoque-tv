import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import CadastroProduto from './components/CadastroProduto';
import CadastroFuncionario from './components/CadastroFuncionario';
import BuscaProduto from './components/BuscaProduto';
import ListaProdutos from './components/ListaProdutos';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  useEffect(() => {
    if (usuarioLogado) {
      buscarProdutos();
    }
  }, [usuarioLogado]);

  const buscarProdutos = async () => {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('id', { ascending: false });

    if (!error) {
      setProdutos(data);
    }
  };

  const excluirProduto = async id => {
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (!error) {
      buscarProdutos();
    }
  };

  const handleLogin = (nome, tipo) => {
    setUsuarioLogado(nome);
    setIsAdmin(tipo === 'admin');
  };

  const handleLogout = () => {
    setUsuarioLogado('');
    setIsAdmin(false);
    setProdutos([]);
    setBusca('');
    setMostrarCadastro(false);
  };

  return (
    <div className={usuarioLogado ? 'painel-page' : 'login-page'}>
      {!usuarioLogado ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* Topo com perfil e botão logout */}
          <div className="top-bar">
            <span className="user-info">👤 {usuarioLogado}</span>
            <button onClick={handleLogout} className="logout-button">🔒 Logout</button>
          </div>

          {/* Busca de produtos no topo */}
          <BuscaProduto busca={busca} setBusca={setBusca} />

          {/* Botão para abrir cadastro */}
          <div className="cadastro-container">
            <button
              onClick={() => setMostrarCadastro(!mostrarCadastro)}
              className="cadastro-toggle"
            >
              {mostrarCadastro ? '❌ Fechar Cadastro' : '➕ Cadastrar Produto'}
            </button>

            {mostrarCadastro && (
              <CadastroProduto usuarioLogado={usuarioLogado} onProdutoCriado={buscarProdutos} />
            )}
          </div>

          {/* Cadastro de funcionário apenas para admin */}
          {isAdmin && <CadastroFuncionario />}

          {/* Lista de produtos */}
          <ListaProdutos
            produtos={produtos}
            busca={busca}
            excluirProduto={excluirProduto}
          />
        </>
      )}
    </div>
  );
}

export default App;