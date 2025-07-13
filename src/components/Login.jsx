import { useState } from 'react';
import { supabase } from '../supabaseClient';

function Login({ onLogin }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');

    const { data, error } = await supabase
      .from('funcionarios')
      .select('*')
      .eq('nome', nome)
      .eq('senha', senha)
      .single();

    if (error || !data) {
      setErro('Usuário ou senha inválidos');
    } else {
      onLogin(data.nome, data.tipo);
    }
  };

  return (
    <div className="login-box">
      <h1 className="login-title">Login Conserto Sua TV</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">Entrar</button>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </form>
    </div>
  );
}

export default Login;